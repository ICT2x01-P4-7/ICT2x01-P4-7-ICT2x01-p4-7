<template>
  <div>
    <b-modal
      id="dashboardModal"
      size="xl"
      ref="dashboard-modal"
      :hide-header-close="true"
      hide-footer
    >
      <div class="d-block text-center">
        <h1 class="display-1">Dashboard</h1>
      </div>
      <b-container class="">
        <b-row align-v="stretch">
          <b-col>
            <b-row align-v="baseline">
              <b-col style="font-size: 2rem">
                <b-table stacked hover :items="currentExecution"></b-table>
              </b-col>
              <div class="w-100"></div>
              <b-col style="font-size: 2rem">
                <b-table hover :items="currentSensorData"></b-table>
              </b-col> </b-row
          ></b-col>
          <b-col>
            <div id="canvasParent" class="w-100 h-100">
              <div id="canvasChild">
                <canvas id="map"></canvas>
              </div>
              <b-button @click="moveForward">F</b-button>
              <b-button @click="moveBack">B</b-button>
              <b-button @click="moveLeft">L</b-button>
              <b-button @click="moveRight">R</b-button>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <div class="text-center">
        <b-container>
          <b-row>
            <b-col>
              <b-button
                class="mt-3"
                variant="success"
                block
                @click="showStatsModal"
                >View Stats</b-button
              ></b-col
            >
            <b-col>
              <b-button class="mt-3" variant="danger" block @click="hideModal"
                >Close Me</b-button
              ></b-col
            >
          </b-row>
        </b-container>
      </div>
    </b-modal>
    <b-modal
      id="statsModal"
      size="xl"
      ref="raw-stats-modal"
      hide-footer
      :hide-header-close="true"
    >
      <div class="d-block text-center">
        <!-- Panel div start -->
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Obstacle Distance</h3>
          </div>
          <div class="panel-body">
            <!-- Chart container -->
            <div id="chart_container">
              <div id="oy_axis"></div>
              <div id="demo_chart" ref="obstaclepanel"></div>
            </div>
            <!-- End of chart container -->
          </div>
          <div class="panel-footer">
            <p v-if="displayedObstacleValues.length > 0">
              <small>
                <span v-bind:style="{ color: dvColors.Obstacle }"
                  >Distance: {{ displayedObstacleValues[0].ObstacleDistance }}
                </span>
              </small>
            </p>
          </div>
        </div>
        <!-- Panel div end -->
        <!-- Panel div start -->
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title">Color Intensity</h3>
          </div>
          <div class="panel-body">
            <!-- Chart container -->
            <div id="chart_container">
              <div id="cy_axis"></div>
              <div id="demo_chart" ref="colorpanel"></div>
            </div>
            <!-- End of chart container -->
          </div>
          <div class="panel-footer">
            <p v-if="displayedColorValues.length > 0">
              <small>
                <span v-bind:style="{ color: dvColors.Red }"
                  >Red:{{ displayedColorValues[0].Red }}
                </span>
                |
                <span v-bind:style="{ color: dvColors.Green }"
                  >Green:{{ displayedColorValues[0].Green }}
                </span>
                |
                <span v-bind:style="{ color: dvColors.Blue }"
                  >Blue: {{ displayedColorValues[0].Blue }}
                </span>
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
    <b-modal ref="error-modal" hide-footer :title.sync="alertTitle">
      <div class="d-block text-center">
        <p>
          {{ alertMessage }}
        </p>
        <b-button
          class="mt-3"
          variant="outline-danger"
          block
          @click="hideErrorModal"
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

let colorChart;
let obstacleChart;
export default {
  data() {
    return {
      alertMessage: "Something went wrong",
      alertTitle: "Watch out!",
      currentExecution: [
        {
          executing: "Left",
          next: "FFFLRFF",
        },
      ],
      currentSensorData: [],
      newSensorData: {},
      interval: null,
      //graph stuff,
      colorSeries: [],
      obstacleSeries: [],
      renderEveryNth: 1,
      updateInterval: 1,
      streamFrequency: 1,
      messageIndex: 0,
      displayedColorValues: [],
      displayedObstacleValues: [],
      dvColors: {
        Red: "#cb503a",
        Green: "#72c039",
        Blue: "#0047AB",
        Obstacle: "5C5553",
      },
      c: null,
      ctx: null,
      vueCanvas: null,
      canvasStore: null,
      rectWidth: 100,
      colorReadyToRender: false,
      canvasOriginX: 100,
      canvasOriginY: 300,
      canvasTileSize: 30,
    };
  },
  created() {
    window.addEventListener("unload", function () {
      sessionStorage.removeItem("mapData");
      this.canvasOriginX = 100;
      this.canvasOriginY = 300;
    });
  },
  mounted() {
    this.$root.$on("bv::modal::shown", (bvEvent, modalId) => {
      //console.log("Modal is about to be shown", bvEvent, modalId);
      if (modalId === "statsModal") {
        this.initChart();
        this.colorReadyToRender = true;
      }
      if (modalId === "dashboardModal") {
        this.c = document.getElementById("map");
        this.ctx = this.c.getContext("2d");
        this.vueCanvas = this.ctx;
        this.resizeCanvas();
        let idt = sessionStorage.getItem("mapData") || null;
        if (idt) {
          this.getImage(idt)
            .then((successfulUrl) => {
              this.vueCanvas.drawImage(successfulUrl, 0, 0);
            })
            .catch((errorUrl) => {
              console.log(errorUrl);
            });
        } else {
          this.vueCanvas.transform(1, 0, 0, -1, 0, this.vueCanvas.height);
          this.originX = 100;
          this.originY = 300;
        }
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
      let idt = this.c.toDataURL();
      sessionStorage.setItem("mapData", idt);
    },

    showErrorModal() {
      this.$refs["error-modal"].show();
    },
    hideErrorModal() {
      this.$refs["error-modal"].hide();
    },
    showStatsModal() {
      this.$refs["raw-stats-modal"].show();
    },
    hideStatsModal() {
      this.$refs["raw-stats-modal"].hide();
    },
    parseSensorData() {
      const tmpStore = [];
      const currentSensorData = this.newSensorData;
      const color = {
        r: "Red",
        g: "Green",
        b: "Blue",
      };
      const rowColor = {
        r: "danger",
        g: "success",
        b: "primary",
      };
      const fakeSpeed = 15;
      let dangerTrue = "";
      if (currentSensorData.ObstacleDistance < 20) {
        dangerTrue = "danger";
      }
      tmpStore.push(
        {
          type: "Speed",
          data: `${fakeSpeed} rpm`,
        },
        {
          type: "Obstacle",
          data: `${currentSensorData.ObstacleDistance} cm`,
          _rowVariant: dangerTrue,
        },
        {
          type: "Color",
          data: color[currentSensorData.Color],
          _rowVariant: rowColor[currentSensorData.Color],
        }
      );
      this.currentSensorData = tmpStore;
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
          this.parseSensorData();
          // Graph
          this.updateDisplayedColorValues();
          this.updateDisplayedObstacleValues();
          if (this.colorSeries.length < this.renderEveryNth) {
            this.colorSeries.push({
              Red: tmpData.Red,
              Green: tmpData.Green,
              Blue: tmpData.Blue,
            });
          }
          if (this.obstacleSeries.length < this.renderEveryNth) {
            this.obstacleSeries.push({
              ObstacleDistance: tmpData.ObstacleDistance,
            });
          }
          /* Render-time! */
          if (
            this.colorSeries.length == this.renderEveryNth &&
            this.colorReadyToRender
          ) {
            this.insertColorDatapoints(this.colorSeries, colorChart);
            this.insertObstacleDatapoints(this.obstacleSeries, obstacleChart);
            this.obstacleSeries = [];
            this.colorSeries = [];
          }
        })
        .catch((error) => {
          this.alertTitle = "Error";
          this.alertMessage = error.response.data.message;
          this.hideModal();
          this.hideStatsModal();
          this.showErrorModal();
          console.log(error.response.data.message);
        });
    },
    /* Rickshaw.js initialization */
    initChart() {
      colorChart = new Rickshaw.Graph({
        element: this.$refs.colorpanel,
        width: "500",
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
            {
              name: "Blue",
              color: "#446CB3",
            },
            {
              name: "Green",
              color: "#44B355",
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
        graph: colorChart,
        orientation: "left",
        tickFormat: function (y) {
          return y.toFixed(1);
        },
        ticks: 5,
        element: document.getElementById("cy_axis"),
      });

      obstacleChart = new Rickshaw.Graph({
        element: this.$refs.obstaclepanel,
        width: "500",
        height: "300",
        renderer: "line",
        min: 0,
        max: 200,
        series: new Rickshaw.Series.FixedDuration(
          [
            {
              name: "One",
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
        graph: obstacleChart,
        orientation: "left",
        tickFormat: function (y) {
          return y.toFixed(1);
        },
        ticks: 5,
        element: document.getElementById("oy_axis"),
      });
      this.resizeChart(colorChart);
      this.resizeChart(obstacleChart);
      window.addEventListener("resize", () => {
        this.resizeChart(colorChart);
        this.resizeChart(obstacleChart);
      });
    },
    resizeChart(chart) {
      chart.configure({
        width: this.$refs.colorpanel.clientWidth,
      });
      chart.render();
    },
    /* Insert received datapoints into the chart */
    insertColorDatapoints(messages, chart) {
      for (let i = 0; i < messages.length; i++) {
        let colorData = {
          Red: messages[i].Red,
          Green: messages[i].Green,
          Blue: messages[i].Blue,
        };
        chart.series.addData(colorData);
      }
      chart.render();
    },
    insertObstacleDatapoints(messages, chart) {
      for (let i = 0; i < messages.length; i++) {
        let obstacleDistanceData = {
          ObstacleDistance: messages[i].ObstacleDistance,
        };
        chart.series.addData(obstacleDistanceData);
      }
      chart.render();
    },
    /* Update displayed values every second on average */
    updateDisplayedColorValues() {
      if (this.messageIndex == this.streamFrequency) {
        this.messageIndex = 0;
        this.displayedColorValues = this.colorSeries;
      } else if (this.messageIndex == 0) {
        this.displayedColorValues = this.colorSeries;
        this.messageIndex++;
      } else {
        this.messageIndex++;
      }
    },
    updateDisplayedObstacleValues() {
      if (this.messageIndex == this.streamFrequency) {
        this.messageIndex = 0;
        this.displayedObstacleValues = this.obstacleSeries;
      } else if (this.messageIndex == 0) {
        this.displayedObstacleValues = this.obstacleSeries;
        this.messageIndex++;
      } else {
        this.messageIndex++;
      }
    },
    resizeCanvas() {
      this.c.style.width = "100%";
      this.c.style.height = "100%";
      this.c.width = this.c.offsetWidth;
      this.c.height = this.c.offsetHeight;
    },
    moveForward() {
      this.vueCanvas.beginPath();
      this.canvasOriginY -= 30;
      this.vueCanvas.rect(
        this.canvasOriginX,
        this.canvasOriginY,
        this.canvasTileSize,
        this.canvasTileSize
      );
      this.vueCanvas.fillStyle = "#32CD30";
      this.vueCanvas.fill();
      this.vueCanvas.lineWidth = 3;
      this.vueCanvas.strokeStyle = "black";
      this.vueCanvas.stroke();
    },
    moveBack() {
      this.vueCanvas.beginPath();
      this.canvasOriginY += 30;
      this.vueCanvas.rect(
        this.canvasOriginX,
        this.canvasOriginY,
        this.canvasTileSize,
        this.canvasTileSize
      );
      this.vueCanvas.fillStyle = "#FF0000";
      this.vueCanvas.fill();
      this.vueCanvas.lineWidth = 3;
      this.vueCanvas.strokeStyle = "black";
      this.vueCanvas.stroke();
    },
    moveLeft() {
      this.vueCanvas.beginPath();
      this.canvasOriginX -= 30;
      this.vueCanvas.rect(
        this.canvasOriginX,
        this.canvasOriginY,
        this.canvasTileSize,
        this.canvasTileSize
      );
      this.vueCanvas.fillStyle = "#0047AB";
      this.vueCanvas.fill();
      this.vueCanvas.lineWidth = 3;
      this.vueCanvas.strokeStyle = "black";
      this.vueCanvas.stroke();
    },
    moveRight() {
      this.vueCanvas.beginPath();
      this.canvasOriginX += 30;
      this.vueCanvas.rect(
        this.canvasOriginX,
        this.canvasOriginY,
        this.canvasTileSize,
        this.canvasTileSize
      );
      this.vueCanvas.fillStyle = "#0047AB";
      this.vueCanvas.fill();
      this.vueCanvas.lineWidth = 3;
      this.vueCanvas.strokeStyle = "black";
      this.vueCanvas.stroke();
    },

    getImage(url) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
          resolve(img);
        };
        img.onerror = function () {
          reject(url);
        };
        img.src = url;
      });
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

#cy_axis {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
}

#oy_axis {
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

canvas {
  border: 1px solid black;
  margin: auto;
  flex-grow: 100;
}

#canvasParent {
  display: flex;
}

#canvasChild {
  flex-grow: 1;
}
</style>
