//import Home from "../views/Home.vue";
import Signup from "../components/Signup.vue";
import ProgramPage from "../views/ProgramPage.vue";

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
];

export default routes;
