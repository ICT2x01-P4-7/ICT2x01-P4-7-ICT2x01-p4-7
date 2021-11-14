//import Home from "../views/Home.vue";
import Signup from "../components/Signup.vue";
import ProgramPage from "../views/ProgramPage.vue";
import DashBoard from "../components/DashBoard.vue";

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
    path: "/dashboard",
    name: "dashboard",
    component: DashBoard,
  },

];

export default routes;
