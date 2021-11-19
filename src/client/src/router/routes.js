//import Home from "../views/Home.vue";
import Signup from "../components/Signup.vue";
import ProgramPage from "../views/ProgramPage.vue";
import Home from "../views/Home.vue";
import Barred from "../views/Barred.vue";

const routes = [
  {
    path: "/",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/program",
    name: "program",
    component: ProgramPage,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/barred",
    name: "barred",
    component: Barred,
  }
];

export default routes;
