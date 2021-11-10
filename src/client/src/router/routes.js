import Home from "../views/Home.vue";
import ProgramPage from "../views/ProgramPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/program",
    name: "program",
    component: ProgramPage,
  },
];

export default routes;
