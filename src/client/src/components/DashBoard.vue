<template>
  <div>
    <div class="ConnectionStatus">
      <p>
        <span style="float: right">
          <img
            src="../assets/connected.png"
            style="width: 25px; height: 13px"
          />
          Connected
        </span>

        <span style="padding-left: 35px">
          <v-btn to="/program">Back</v-btn>
        </span>
      </p>
    </div>
    <br />

    <div>
      <div class="dashboardTopLeft">
        <br />
        <table style="width: 100%; border-collapse: collapse; border: none">
          <tr>
            <td style="width: 20%; text-align: right; border: none">
              Executing Code:
            </td>
            <td style="width: 80%; border: none">
              &nbsp; &nbsp; Forward 3 times
            </td>
          </tr>
          <tr>
            <td style="text-align: right; border: none">Next Code:</td>
            <td style="border: none">&nbsp; &nbsp; Right 1 tiles</td>
          </tr>
          <tr>
            <td style="border: none"></td>
            <td style="border: none">&nbsp; &nbsp; Left 2 tiles</td>
          </tr>
          <tr>
            <td style="border: none"></td>
            <td style="border: none">&nbsp; &nbsp; Reverse 2 tiles</td>
          </tr>
        </table>

        <p></p>
        <p></p>
      </div>
      <br />
      <br />

      <div class="dashboardBottomLeft">
        <br />
        <table style="width: 100%; border-collapse: collapse; border: none">
          <tr>
            <td style="width: 20%; text-align: right; border: none">Speed:</td>
            <td style="width: 80%; border: none">&nbsp; &nbsp; 0.5m/s</td>
          </tr>
          <tr>
            <td style="text-align: right; border: none">Distance:</td>
            <td style="border: none">&nbsp; &nbsp; 0.3m</td>
          </tr>
          <tr></tr>
          <tr>
            <td style="text-align: right; border: none">Titles travelled:</td>
            <td style="border: none">&nbsp; &nbsp; 3</td>
          </tr>
        </table>
        <br />

        <table style="width: 100%; height: 32vh; text-align: center">
          <tr>
            <td rowspan="2">Ultrasonic</td>
            <td colspan="2">IR Line tracking Sensor</td>
            <td colspan="2">IR Motor</td>
            <td colspan="2">Motor</td>
          </tr>

          <tr>
            <td>Left</td>
            <td>Right</td>
            <td>Left</td>
            <td>Right</td>
            <td>Left</td>
            <td>Right</td>
          </tr>

          <!-- first row -->
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>

          <!-- second row -->
          <tr>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
          </tr>

          <!-- third row -->
          <tr>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>

          <tr>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
          </tr>

          <tr>
            <td>&nbsp;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td>&nbsp;</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>

      <div class="grid-container">
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
        <div class="grid-item"></div>
      </div>
    </div>
  </div>
</template>

<!-- top left -->
<style scoped>
.dashboardTopLeft {
  height: 40vh;
  width: 45vw;
  color: #222;
  background-color: whitesmoke;
  margin-left: 5vh;
  border-style: solid;
  border-color: black;
}

.dashboardBottomLeft {
  height: 45vh;
  width: 45vw;
  text-align: left;
  color: #222;
  background-color: whitesmoke;
  margin-left: 5vh;
  margin-top: 45vh;
  position: absolute;
  bottom: 0;
  border-style: solid;
  border-color: black;
}

table,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

.grid-item {
  background-color: whitesmoke;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  font-size: 5px;
}

.grid-container {
  width: 40vw;
  height: 92vh;
  color: #222;
  background-color: whitesmoke;
  right: 0;
  top: 0;
  margin-right: 20vh;
  margin-top: 8vh;
  position: absolute;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  border-style: solid;
  border-color: black;
}

.ConnectionStatus {
  /* text-align: right; */
  margin-top: 3vh;
  top: 0;
  width: 85vw;
}
</style>
