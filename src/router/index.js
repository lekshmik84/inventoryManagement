import { createRouter, createWebHistory } from "vue-router";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Product from "../views/ProductMngmt.vue";
import Stock from "../views/StockManagement.vue"
import StockReport from "../views/components/StockReport.vue"

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/Product",
    name: "Product",
    component: Product,
  },
  {
    path: "/Stock",
    name: "Stock",
    component: Stock
  },
  {
    path: "/StockReport",
    name: "StockReport",
    component: StockReport
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
