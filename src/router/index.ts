import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

export const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    icon: "ni ni-tv-2",
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
    icon: "ni ni-calendar-grid-58",
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    icon: "ni ni-credit-card",
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
    icon: "ni ni-app",
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
    icon: "ni ni-world-2",
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    icon: "ni ni-single-02",
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    icon: "ni ni-single-copy-04",
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    icon: "ni ni-collection",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
