import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Routes from "./router/routes";
import PincodeInput from "vue-pincode-input";



Vue.config.productionTip = false;
Vue.config.ignoredElements = [
  "field",
  "block",
  "category",
  "xml",
  "mutation",
  "value",
  "sep",
];

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: Routes,
});

Vue.component("PincodeInput", PincodeInput);

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");

setInterval(updateCountdown, 1000);

//Each 0.1 refers to 6 seconds.
//Barred Login shall increment from 30 seconds -> 60 seconds -> 90 seconds
//Respective startingMinutes values are 0.5, 1, 1.5
const startingMinutes = 0.5;
let time = startingMinutes * 60;

const countDownElement = document.getElementById('countdown');

function updateCountdown() {
  const minutes = Math.floor(time/60);
  let seconds = time % 60;
  if (minutes == 0 && seconds == 0)
  {
    countDownElement.innerHTML = `${0}: ${0}`;
    return;
  }
  seconds = seconds < 10 ? '0' + seconds : seconds;
  countDownElement.innerHTML = `${minutes}: ${seconds}`;
  time --;
}