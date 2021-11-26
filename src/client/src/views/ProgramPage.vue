<template>
  <b-container>
    <b-row>
      <b-col lg="2" class="pt-4"
        ><b-button pill variant="primary" size="lg">Dashboard</b-button></b-col
      >
      <b-col lg="2" class="pt-4"
        ><b-button pill variant="dark" size="lg">Tutorial</b-button></b-col
      >
      <b-col lg="2" class="pt-4"
        ><b-button pill variant="secondary" size="lg">History</b-button></b-col
      >
      <b-col lg="2" class="pt-4"
        ><b-button pill variant="info" size="lg">Select Map</b-button></b-col
      >
      <b-col lg="2" class="pt-4"
        ><b-button pill variant="danger" size="lg">Reset PIN</b-button></b-col
      >
      <b-col lg="2" class="pt-4">
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

    <!---<p id="code">
      <pre v-html="code"></pre>
    </p> ---->
  </b-container>
</template>

<script>
import BlocklyComponent from "../components/BlocklyComponent.vue";
import "../blocks/movement";

import BlocklyJS from "blockly/javascript";

export default {
  name: "app",
  components: {
    BlocklyComponent,
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
    };
  },
  methods: {
    hasWhiteSpace(s) {
      return s.indexOf("\n") >= 0;
    },
    clearWorkSpace() {
      BlocklyJS.mainWorkspace.clear();
    },
    sendCode() {
      const code = BlocklyJS.workspaceToCode(this.$refs["program"].workspace);
      console.log(this.hasWhiteSpace(code));
      console.log(code);
      if (this.hasWhiteSpace(code)) {
        console.log("Please link all block commands together");
      }
      this.code = BlocklyJS.workspaceToCode(this.$refs["program"].workspace);
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
