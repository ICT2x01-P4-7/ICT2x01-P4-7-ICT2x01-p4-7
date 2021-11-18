<template>
  <div>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        v-on:click="modalToggle"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="showModal">
        <h1 id="historyTitle">History</h1>
        <button class="button close" v-on:click="modalToggle">Close</button>
        <div class="history-container">
          <div
            class="history-item"
            v-for="item in History"
            v-bind:key="item.index"
          >
            <h2>Attempt {{ item.index }}</h2>
            <p v-for="steps in item.steps" v-bind:key="steps">{{$index}} {{steps}}</p>
          </div>
        </div>
      </div>
    </transition>

    <button class="button" v-on:click="modalToggle()" ref="history">
      HistoryHistoryHistoryHistory
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      History: [
        {
          index: 1,
          steps: ["Forward", "Backward", "Left", "Right"],
        },
        {
          index: 2,
          steps: ["Right", "Backward", "Left", "Forward"],
        },
      ],
    };
  },
  methods: {
    modalToggle() {
      this.showModal = !this.showModal;
      this.populateToggle();
    },
    populateToggle() {},
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "montserrat", sans-serif;
}

#app {
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
  background-image: linear-gradient(to right, #cc2e5d, #ff5858);
  border-radius: 8px;

  color: #fff;
  font-size: 18px;
  font-weight: 700;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
}
.button :hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 10px;
  margin-right: 10px;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 90%;
  height: 90vh;
  background-color: #fff;
  border-radius: 16px;
  padding: 25px;
}
.modal h1 {
  color: #222;
  font-size: 50px;
  font-weight: 900;
  text-align: left;
  margin-left: 50px;
  margin-bottom: 30px;
  margin-top: 10px;
  overflow: auto;
}

.modal p {
  color: #666;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 6px;
}

.history-container {
  overflow: auto;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 70vh;
}

.history-item {
  background-color: rgb(124, 124, 124);
  position: relative;
  left: 5%;
  width: 90%;
  height: 90%;
  border-radius: 8px;
  margin-bottom: 10px;
}

.history-item h2 {
  color: white;
  font-size: 30px;
  text-align: left;
  margin-left: 30px;
  margin-top: 10px;
  padding-top: 20px;
}

.history-item p {
  color: white;
  margin-top: 1%;
  padding-bottom: 3%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
</style>
