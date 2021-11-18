<template>

  <div id="app">
           <v-btn to="/dashboard">Dashboard</v-btn>
    <BlocklyComponent id="blockly2" :options="options" ref="program"></BlocklyComponent>
    <p id="code">
      <button v-on:click="showCode()" @click="check" >Show JavaScript</button>
      <pre id="JScode" v-html="code" ref="showcode"></pre>
    </p>
  </div>
</template>

<script>
import BlocklyComponent from "../components/BlocklyComponent.vue";
import "../blocks/movement";
import VueSession from 'vue-session'
import Vue from "vue";

Vue.use(VueSession)

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
    showCode() {
      this.code = BlocklyJS.workspaceToCode(this.$refs["program"].workspace);
    },
    check() {
      this.$nextTick(() => {
        console.log(document.getElementById("JScode").innerHTML);
        this.$session.start()
        this.$session.set('BlocklyCommands', document.getElementById("JScode").innerHTML)
      });
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
  top: 0;
  width: 50%;
  height: 50%;
}

#blockly2 {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
}
</style>
