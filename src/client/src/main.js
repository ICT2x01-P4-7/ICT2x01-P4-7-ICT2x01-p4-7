import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Routes from "./router/routes";

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

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
