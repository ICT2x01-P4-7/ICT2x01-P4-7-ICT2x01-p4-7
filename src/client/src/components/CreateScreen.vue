<template>
  <div id="app">
    <div>
      <h2>Choose PIN</h2>
      <PincodeInput v-model="choosePIN" :length="4" :secure="true" />
      <h2>Comfirm PIN</h2>
      <PincodeInput v-model="confirmPIN" :length="4" :secure="true" />

      <button class="reset-button" @click="create">Create</button>
      <div class="monitor">
        <span class="monitor-label">Parent value:</span>
        <span v-text="choosePIN" />
      </div>
      <div class="monitor">
        <span class="monitor-label">Parent value:</span>
        <span v-text="confirmPIN" />
      </div>

      <button class="reset-button" @click="reset">Reset</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PincodeInput from "vue-pincode-input";
import localhost from "../config/config.js";

export default {
  name: "CreateScreen",
  component: {
    PincodeInput,
  },
  data: () => ({
    choosePIN: "",
    confirmPIN: "",
  }),
  methods: {
    reset() {
      this.choosePIN = "";
      this.confirmPIN = "";
    },
    create() {
      if (this.confirmPIN === "" || this.choosePIN === "") {
        console.log("Field is empty");
        return;
      }
      const newUser = {
        choosePIN: this.choosePIN,
        confirmPIN: this.confirmPIN,
      };
      axios.post(`${localhost}/user/create`, newUser);
    },
  },
};
</script>

<style lang="scss">
#app {
  margin-top: 100px;
  text-align: center;
}
.monitor {
  margin: 30px auto;
  font-size: 18px;
  font-family: Arial, sans-serif;
  opacity: 0.6;
  &-label {
    margin-right: 4px;
  }
}
.reset-button {
  display: block;
  margin: 0 auto;
  border: none;
  border-radius: 3px;
  padding: 10px 30px;
  font-size: 18px;
  color: rgba(black, 0.8);
  transition: color 0.1s ease-in;
  &:hover,
  &:focus {
    cursor: pointer;
    color: rgba(black, 0.5);
  }
}
</style>
