<template>
  <div>
    <h1>Basic</h1>
    <b-row>
      <b-col>
        <b-row align-v="baseline">
          <b-col style="font-size: 2rem">
            <b-table stacked hover :items="currentExecution"></b-table>
          </b-col>
          <div class="w-100"></div>
          <b-col style="font-size: 2rem">
            <b-table hover :items="currentSensorData"></b-table>
            <b-button @click="moveForward">F</b-button>
            <b-button @click="moveBack">B</b-button>
            <b-button @click="moveLeft">L</b-button>
            <b-button @click="moveRight">R</b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <div id="canvasParent" class="w-100 h-100">
          <canvas id="map"></canvas>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    sensorData: Object,
    canvasOrigin: Object,
  },
  created() {
    window.addEventListener("unload", function () {
      sessionStorage.removeItem("mapData");
      sessionStorage.removeItem("canvasOrigin");
    });
  },
  mounted() {
    this.smallCar = new Image();
    this.smallCar.src = require("@/assets/smallcar.png");
    this.$root.$on("bv::modal::shown", (bvEvent, modalId) => {
      if (modalId === "dashboardModal") {
        this.fetchCanvasOrigin();
        this.initCanvas();
      }
    });
  },
  beforeDestroy() {
    this.saveCanvasOrigin();
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
      colorReadyToRender: false,
      canvasTileSize: 30,
      smallCar: null,
      canvasOriginX: null,
      canvasOriginY: null,
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
    initCanvas() {
      this.c = document.getElementById("map");
      this.ctx = this.c.getContext("2d");
      this.vueCanvas = this.ctx;
      this.c.style.width = "100%";
      this.c.style.height = "100%";
      this.c.width = this.c.offsetWidth;
      this.c.height = this.c.offsetHeight;
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
      }
    },
    saveCanvasOrigin() {
      let idt = this.c.toDataURL();
      sessionStorage.setItem("mapData", idt);
      sessionStorage.setItem(
        "canvasOrigin",
        JSON.stringify({
          X: this.canvasOriginX,
          Y: this.canvasOriginY,
        })
      );
    },
    fetchCanvasOrigin() {
      const canvasOrigin =
        JSON.parse(sessionStorage.getItem("canvasOrigin")) || null;
      if (canvasOrigin) {
        this.canvasOriginX = canvasOrigin.X;
        this.canvasOriginY = canvasOrigin.Y;
      } else {
        this.canvasOriginX = 100;
        this.canvasOriginY = 300;
      }
    },
    moveForward() {
      this.vueCanvas.beginPath();
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
      this.canvasOriginY -= 30;
      this.vueCanvas.drawImage(
        this.smallCar,
        this.canvasOriginX,
        this.canvasOriginY
      );
    },
    moveBack() {
      this.vueCanvas.beginPath();
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
      this.canvasOriginY += 30;
      this.vueCanvas.drawImage(
        this.smallCar,
        this.canvasOriginX,
        this.canvasOriginY
      );
    },
    moveLeft() {
      this.vueCanvas.beginPath();
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
      this.canvasOriginX -= 30;
      this.vueCanvas.drawImage(
        this.smallCar,
        this.canvasOriginX,
        this.canvasOriginY
      );
    },
    moveRight() {
      this.vueCanvas.beginPath();
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
      this.canvasOriginX += 30;
      this.vueCanvas.drawImage(
        this.smallCar,
        this.canvasOriginX,
        this.canvasOriginY
      );
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
canvas {
  border: 1px solid black;
  margin: auto;
}
</style>
