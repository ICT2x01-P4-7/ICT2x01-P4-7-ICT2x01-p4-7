<template>
<main>
  <h1>Log In Screen</h1>
  <h5>PIN NUMBER</h5>
  <input v-model="message" placeholder="" ref="inputRef" />
  <br>
  <h5>Number of Failed Attempts: {{ counter }}</h5>
  <button v-on:click="addFailedAttempts">Log In</button>

  
  <Popup>
    <h2>Barred Screen</h2> <!--Anything we put here will appear in the slot of Popup.vue-->
    <p id="countdown"></p>
    
  </Popup>
</main>

<!--
  <div id="app">
    <p id="countdown">

    </p>
  </div>
-->
</template>

<script>
import Popup from './Popup.vue';
//import Home from './components/Home.vue'



export default {
  name: 'App',
  components: {
    Popup,
  },
  mounted() { //Place to access the DOM
    this.$refs.inputRef.focus();
  },
  data() {
    return {
      counter: 0,
      isModalVisible: false,
    };
  },
  methods: {
    //Add functions here
    addFailedAttempts: function() {
      this.counter++;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
}
</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');


#app {
  background:#fff8ee; 
}

#countdown {
  font-size: 50px;
  height: 70px;
  width: 200px;
  background-color: #fff8ee;
  display: inline-flex;
  align-items: center;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-inner {
  background: #FFF;
  padding: 32px; 
  }



</style>
