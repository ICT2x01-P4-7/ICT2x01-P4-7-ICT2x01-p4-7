//import Home from "../views/Home.vue";
import Signup from "../components/Signup.vue";
import ProgramPage from "../views/ProgramPage.vue";
import Login from "../components/Login.vue";
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
    path: "/login",
    name: "login",
    component: Login,
    
  },
];

export default routes;
