<template>
  <div id="app">
    <BlocklyComponent id="blockly2" :options="options" ref="program"></BlocklyComponent>
    <p id="code">
      <button v-on:click="showCode()">Show JavaScript</button>
      <pre id="JScode" v-html="code"></pre>
    </p>
    <HistoryComponent />
  </div>
</template>

<script>

import BlocklyComponent from '../components/BlocklyComponent.vue'
import HistoryComponent from '../components/HistoryComponent.vue'
import '../blocks/movement';

import BlocklyJS from 'blockly/javascript';


export default {
  name: 'app',
  components: {
    BlocklyComponent,
    HistoryComponent
  },
  data(){
    return {
      code: '',
      options: {
        media: 'media/',
        grid:
          {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
          },
        toolbox:
        `<xml>
            <category name="Movement" colour="%{BKY_VARIABLES_HUE}">
              <block type="forward"></block>
              <block type="backward"></block>
              <block type="left"></block>
              <block type="right"></block>
              <block type="repeat_direction"></block>
            </category>
        </xml>`
      }
    }
  },
  methods: {
    showCode() {
      this.code = BlocklyJS.workspaceToCode(this.$refs["program"].workspace);
    },
    modalToggle() {
      this.$refs.HistoryComponent.modalToggle();
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html, body {
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

#history {
    position: relative;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
}

.button {
    appearance: none;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;

    display: inline-block;
    padding: 15px 25px;
    background-image: linear-gradient(to right, #CC2E5D, #FF5858);
    border-radius: 8px;

    color: #FFF;
    font-size: 18px;
    font-weight: 700;

    box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
    transition: 0.4s ease-out;
}
.button
:hover {
    box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
 }
</style>
