//import Home from "../views/Home.vue";
import CreateScreen from "../views/CreateScreen.vue";
import LoginScreen from "../views/LoginScreen.vue";
import ProgramPage from "../views/ProgramPage.vue";
import NotFound from "../views/NotFound.vue";

function guardRoute(to, from, next) {
  let isAuthenticated = false;
  if (sessionStorage.getItem("token")) {
    isAuthenticated = true;
  }

  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

function checkLoginStatus(to, from, next) {
  let isAuthenticated = false;
  if (sessionStorage.getItem("token")) {
    isAuthenticated = true;
  }
  if (isAuthenticated) {
    next("/program");
  } else {
    next();
  }
}

const routes = [
  {
    path: "/",
    redirect: { name: "login" },
  },
  {
    path: "/create",
    name: "create",
    component: CreateScreen,
    meta: { title: "Sign Up" },
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: checkLoginStatus,
    component: LoginScreen,
    meta: { title: "Log In" },
  },
  {
    path: "/program",
    name: "program",
    beforeEnter: guardRoute,
    component: ProgramPage,
    meta: { title: "Program" },
  },
  { path: "*", component: NotFound },
];

export default routes;