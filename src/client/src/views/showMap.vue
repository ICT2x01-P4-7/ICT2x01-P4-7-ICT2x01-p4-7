<template>
  <div>
    <b-modal ref="map-modal" hide-footer :hide-header-close="true">
      <div class="d-block text-center">
        <h3>View Sample Maps</h3>
        <div>
          <img
            id="easyDiff"
            src="../assets/EasyDifficulty.png"
            v-show="difficultyLevel === 'easy'"
            :disabled="difficultyLevel === 'easy'"
          />
          <img
            id="mediumDiff"
            src="../assets/MediumDifficulty.png"
            v-show="difficultyLevel === 'medium'"
            :disabled="difficultyLevel === 'medium'"
          />
          <img
            id="hardDiff"
            src="../assets/HardDifficulty.png"
            v-show="difficultyLevel === 'hard'"
            :disabled="difficultyLevel === 'hard'"
          />
        </div>
        <b-button
          class="mt-2"
          variant="outline-warning"
          block
          @click="selectDifficulty('easy')"
          >Easy</b-button
        >
        <b-button
          class="mt-2"
          variant="outline-warning"
          block
          @click="selectDifficulty('medium')"
          >Medium</b-button
        >
        <b-button
          class="mt-2"
          variant="outline-warning"
          block
          @click="selectDifficulty('hard')"
          >Hard</b-button
        >
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal"
        >Close Me</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    showModal() {
      this.$refs["map-modal"].show();
    },
    hideModal() {
      this.$refs["map-modal"].hide();
    },
    selectDifficulty(level) {
      this.difficultyLevel = level;
      console.log(this.difficultyLevel);
    },
  },
  data() {
    return {
      difficultyLevel: "easy",
    };
  },
};
</script>
