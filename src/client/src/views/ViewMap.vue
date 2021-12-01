<template>
  <b-container class="mapsContainer">
    <h2>View available maps by pressing the buttons</h2>
    <b-row id="mapRow">
      <b-col>
        <div id="easy">
          <b-button id="show-btn" @click="$bvModal.show('easyMap')"
            >View Easy Map</b-button
          >

          <b-modal id="easyMap" hide-footer>
            <template #modal-title> <h1>Medium Map</h1> </template>
            <div class="d-block text-center">
              <img id="easyDiff" src="../assets/EasyDifficulty.png" />
            </div>
          </b-modal>
        </div>
      </b-col>

      <b-col>
        <div id="Medium">
          <b-button id="show-btn" @click="$bvModal.show('intermediateMap')"
            >View Intermediate Map</b-button
          >

          <b-modal id="intermediateMap" hide-footer>
            <template #modal-title> <h1>Intermediate Map</h1> </template>
            <div class="d-block text-center">
              <img id="mediumDiff" src="../assets/MediumDifficulty.png" />
            </div>
          </b-modal>
        </div>
      </b-col>

      <b-col>
        <div id="Hard">
          <b-button id="show-btn" @click="$bvModal.show('hardMap')"
            >View Hard Map</b-button
          >

          <b-modal id="hardMap" hide-footer>
            <template #modal-title> <h1>Hard Map</h1> </template>
            <div class="d-block text-center">
              <img id="hardDiff" src="../assets/HardDifficulty.png" />
            </div>
          </b-modal>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "App",
  component: {},
};
</script>

<style>
#easyDiff {
  height: 600px;
  width: 400px;
}

#mediumDiff {
  height: 600px;
  width: 400px;
}

#hardDiff {
  height: 600px;
  width: 480px;
}

h2 {
  text-align: center;
  padding-bottom: 2cm;
}

#mapRow {
  padding-left: 150px;
}
</style>
