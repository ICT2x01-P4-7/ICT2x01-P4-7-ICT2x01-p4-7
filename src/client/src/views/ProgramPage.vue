<template>
  <b-container>
    <b-row>
      <b-col class="pt-4"
        ><b-button pill variant="warning" size="lg" v-on:click="logout()"
          >Log Out</b-button
        ></b-col
      >
      <b-col class="pt-4"
        ><b-button pill variant="primary" size="lg">Dashboard</b-button></b-col
      >
      <b-col class="pt-4"
        ><b-button pill variant="dark" size="lg">Tutorial</b-button></b-col
      >
      <b-col class="pt-4"
        ><b-button pill variant="secondary" size="lg">History</b-button></b-col
      >
      <b-col class="pt-4"
        ><b-button pill variant="info" size="lg">Select Map</b-button></b-col
      >
      <b-col class="pt-4"
        ><b-button
          pill
          variant="danger"
          size="lg"
          v-on:click="openResetScreen()"
          >Reset PIN</b-button
        ></b-col
      >
      <b-col class="pt-4">
        <b-button pill variant="success" size="lg" v-on:click="sendCode()"
          >Send to car</b-button
        >
      </b-col>
    </b-row>
    <BlocklyComponent
      id="blockly1"
      :options="options"
      ref="program"
    ></BlocklyComponent>

    <!-- The modal -->
    <b-container>
      <b-modal ref="invalid-seq-model" hide-footer :title.sync="alertTitle">
        <div class="d-block text-center">
          <p>
            {{ alertMessage }}
          </p>
          <b-button
            class="mt-3"
            variant="outline-danger"
            block
            @click="hideModal"
            >Close Me</b-button
          >
        </div>
      </b-modal>
    </b-container>
    <ResetScreen ref="reset-screen"></ResetScreen>
  </b-container>
</template>

<script>
import BlocklyComponent from "../components/BlocklyComponent.vue";
import "../blocks/movement";
import BlocklyJS from "blockly/javascript";
import { localhost } from "../config/config.js";
import axios from "axios";
import ResetScreen from "./ResetScreen.vue";

export default {
  name: "app",
  components: {
    BlocklyComponent,
    ResetScreen,
  },
  data() {
    return {
      code: "",
      options: {
        media: "media/",
        grid: {
          spacing: 25,
          length: 3,
          colour: "#ccc",
          snap: true,
        },
        toolbox: `<xml>
            <category name="Movement" colour="%{BKY_VARIABLES_HUE}">
              <block type="forward"></block>
              <block type="backward"></block>
              <block type="left"></block>
              <block type="right"></block>
              <block type="repeat_direction"></block>
            </category>
        </xml>`,
      },
      alertMessage: "Something went wrong",
      alertTitle: "Watch out!",
    };
  },

  methods: {
    hasWhiteSpace(s) {
      return s.indexOf("\n") >= 0;
    },
    sendCode() {
      const code = BlocklyJS.workspaceToCode(this.$refs["program"].workspace);
      if (!code) {
        this.alertTitle = "No sequence in workspace";
        this.alertMessage = "Please put some blocks into the workspace.";
        this.showModal();
      } else if (this.hasWhiteSpace(code)) {
        this.alertTitle = "Invalid Sequence";
        this.alertMessage = "Please ensure all blocks are connected.";
        this.showModal();
        return;
      } else {
        const sequence = {
          sequence: code,
        };
        const token = sessionStorage.getItem("token");
        axios.defaults.headers.common["x-access-token"] = token;
        axios
          .post(`${localhost}/program/sendSequence`, sequence)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            this.alertTitle = "Error";
            this.alertMessage = error.response.data.message;
            if (this.alertMessage === "Failed to verify token") {
              this.alertMessage += " You will be redirected to login again.";
              this.goToLogin();
            }
            this.showModal();
          });
      }
    },
    showModal() {
      this.$refs["invalid-seq-model"].show();
    },
    hideModal() {
      this.$refs["invalid-seq-model"].hide();
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
    goToLogin() {
      sessionStorage.clear();
      setTimeout(() => {
        this.$router.push("/login");
      }, 3000);
    },
    openResetScreen() {
      this.$refs["reset-screen"].showModal();
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body {
  margin: 0;
}

#code {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
  margin: 0;
  background-color: beige;
}

#blockly1 {
  position: absolute;
  right: 0;
  top: 10rem;
  width: 100%;
  height: 80%;
}
</style>
