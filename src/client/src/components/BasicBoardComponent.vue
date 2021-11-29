<template>
  <div>
    <h1>Basic</h1>
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
  </div>
</template>

<script>
export default {
  props: {
    sensorData: Object,
  },
  data() {
    return {
      currentExecution: [
        {
          executing: "Left",
          next: "FFFLRFF",
        },
      ],
      currentSensorData: [],
      //Canvas stuff
      c: null,
      ctx: null,
      vueCanvas: null,
      canvasStore: null,
      rectWidth: 100,
      colorReadyToRender: false,
      canvasOriginX: 100,
      canvasOriginY: 300,
      canvasTileSize: 30,
      smallCar: null,
    };
  },
  watch: {
    $props: {
      handler() {
        this.parseSensorData();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    parseSensorData() {
      const tmpStore = [];
      const latestSensorData = this.sensorData;
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
      let dangerTrue = "";
      if (latestSensorData.ObstacleDistance < 20) {
        dangerTrue = "danger";
      }
      tmpStore.push(
        {
          type: "Speed",
          data: `${latestSensorData.SpeedLeft} rpm ⚡ ${latestSensorData.SpeedRight} rpm`,
        },
        {
          type: "Obstacle",
          data: `${latestSensorData.ObstacleDistance} cm`,
          _rowVariant: dangerTrue,
        },
        {
          type: "Color",
          data: color[latestSensorData.Color],
          _rowVariant: rowColor[latestSensorData.Color],
        }
      );
      this.currentSensorData = tmpStore;
    },
  },
};
</script>
