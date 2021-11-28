<template>
  <div>
    <b-modal
      size="xl"
      ref="dashboard-modal"
      :hide-header-close="true"
      hide-footer
    >
      <div class="d-block text-center">
        <h3>Dashboard</h3>
      </div>
      <b-container class="">
        <b-row align-v="stretch">
          <b-col>
            <b-row align-v="baseline">
              <b-col style="font-size: 0.75rem"
                >USE THIS SPACE FOR CURRENT EXECUTING
              </b-col>
              <div class="w-100"></div>
              <b-col style="font-size: 1.25rem"> {{ newSensorData }}</b-col>
            </b-row></b-col
          >
          <b-col>Map component</b-col>
        </b-row>
      </b-container>
      <div class="text-center">
        <b-container>
          <b-row>
            <b-col>
              <b-button
                class="mt-3"
                variant="outline-danger"
                block
                @click="showStatsModal"
                >View Stats</b-button
              ></b-col
            >
            <b-col>
              <b-button
                class="mt-3"
                variant="outline-danger"
                block
                @click="hideModal"
                >Close Me</b-button
              ></b-col
            >
          </b-row>
        </b-container>
      </div>
    </b-modal>
    <b-modal ref="raw-stats-modal" hide-footer :hide-header-close="true">
      <div class="d-block text-center">
        <!-- Panel div start -->
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Color</h3>
          </div>
          <div class="panel-body">
            <!-- Chart container -->
            <div id="chart_container">
              <div id="y_axis"></div>
              <div id="demo_chart" ref="colorpanel"></div>
            </div>
            <!-- End of chart container -->
          </div>
          <div class="panel-footer">
            <p v-if="displayedValues.length > 0">
              <small>
                <span v-bind:style="{ color: dvColors.Red }"
                  >{{ displayedValues[0].Red }} </span
                >V |
                <span v-bind:style="{ color: dvColors.Green }"
                  >{{ displayedValues[0].Green }} </span
                >V |
                <span v-bind:style="{ color: dvColors.Blue }"
                  >{{ displayedValues[0].Blue }} </span
                >V
              </small>
            </p>
          </div>
        </div>
        <!-- Panel div end -->
        <b-button
          class="mt-3"
          variant="outline-danger"
          block
          @click="hideStatsModal"
          >Close Me</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import { localhost } from "../config/config.js";
import axios from "axios";
import Rickshaw from "rickshaw";
import "rickshaw/rickshaw.min.css";

let magnitudeChart;
export default {
  data() {
    return {
      items: [],
      sensorDataStore: [],
      newSensorData: {},
      interval: null,
      //graph stuff,
      messageSeries: [],
      renderEveryNth: 1,
      updateInterval: 1,
      streamFrequency: 1,
      messageIndex: 0,
      displayedValues: [],
      dvColors: {
        Red: "#cb503a",
        Green: "#72c039",
        Blue: "#65b9ac",
      },
      colorReadyToRender: false,
    };
  },
  mounted() {
    this.$root.$on("bv::modal::shown", (bvEvent, modalId) => {
      console.log("Modal is about to be shown", modalId);
      if (modalId === "__BVID__14") {
        this.initChart();
        this.colorReadyToRender = true;
      }
    });
  },
  methods: {
    showModal() {
      this.getSensorData();
      this.$refs["dashboard-modal"].show();
      this.interval = setInterval(this.getSensorData, 1000);
    },
    hideModal() {
      this.$refs["dashboard-modal"].hide();
      clearInterval(this.interval);
      this.interval = null;
    },
    showStatsModal() {
      this.$refs["raw-stats-modal"].show();
    },
    hideStatsModal() {
      this.$refs["raw-stats-modal"].hide();
    },
    getSensorData() {
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common["x-access-token"] = token;
      axios
        .get(`${localhost}/program/sensorData`)
        .then((response) => {
          const sensorData = response.data.data.sensorData;
          const dataType = {
            O: "ObstacleDistance",
            R: "Red",
            G: "Green",
            B: "Blue",
            C: "Color",
          };
          let tmpData = {};
          for (let k in sensorData) {
            tmpData[dataType[k]] = sensorData[k];
          }
          tmpData.time = Date.now();
          this.newSensorData = tmpData;
          //this.sensorDataStore.push(tmpData);
          // Graph
          this.updateDisplayedValues();
          if (this.messageSeries.length < this.renderEveryNth) {
            this.messageSeries.push({
              Red: tmpData.Red,
              Green: tmpData.Green,
              Blue: tmpData.Blue,
            });
          }
          /* Render-time! */
          if (
            this.messageSeries.length == this.renderEveryNth &&
            this.colorReadyToRender
          ) {
            this.insertDatapoints(this.messageSeries, magnitudeChart);
            this.messageSeries = [];
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
    /* Rickshaw.js initialization */
    initChart() {
      magnitudeChart = new Rickshaw.Graph({
        element: this.$refs.colorpanel,
        width: "1000",
        height: "300",
        renderer: "line",
        min: 0,
        max: 600,
        series: new Rickshaw.Series.FixedDuration(
          [
            {
              name: "Red",
              color: "#EC644B",
            },
          ],
          undefined,
          {
            timeInterval: this.updateInterval,
            maxDataPoints: 100,
            timeBase: new Date().getTime() / 1000,
          }
        ),
      });
      new Rickshaw.Graph.Axis.Y({
        graph: magnitudeChart,
        orientation: "left",
        tickFormat: function (y) {
          return y.toFixed(1);
        },
        ticks: 5,
        element: document.getElementById("y_axis"),
      });
      this.resizeChart(magnitudeChart);
      window.addEventListener("resize", () => {
        this.resizeChart(magnitudeChart);
      });
    },
    resizeChart(chart) {
      chart.configure({
        width: this.$refs.colorpanel.clientWidth,
      });
      chart.render();
    },
    /* Insert received datapoints into the chart */
    insertDatapoints(messages, chart) {
      for (let i = 0; i < messages.length; i++) {
        let voltageData = {
          Magnitude1: messages[i].Red,
          Magnitude2: messages[i].Green,
          Magnitude3: messages[i].Blue,
        };
        chart.series.addData(voltageData);
      }
      chart.render();
    },
    /* Update displayed values every second on average */
    updateDisplayedValues() {
      if (this.messageIndex == this.streamFrequency) {
        this.messageIndex = 0;
        this.displayedValues = this.messageSeries;
      } else if (this.messageIndex == 0) {
        this.displayedValues = this.messageSeries;
        this.messageIndex++;
      } else {
        this.messageIndex++;
      }
    },
  },
};
</script>
<style scoped>
#chart_container {
  padding-right: 40px;
  padding-bottom: 20px;
  margin-top: 20px;
  position: relative;
}

#demo_chart {
  position: relative;
  left: 40px;
}

#y_axis {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
}

.footy {
  position: relative;
  width: 100%;
  margin-top: 50px;
  height: 60px;
  opacity: 0.2;
}

.glyphicon {
  color: #8e44ad;
  font-weight: bold;
}
</style>
