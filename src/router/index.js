import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import SignIn from "@/views/SignInView.vue";
import SignUp from "@/views/SignUpView.vue";
import MyProfile from "@/views/MyProfileView.vue";
import AddCategory from "@/views/CategoryView.vue";
import { authGuard } from "@/authGuard";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/connexion",
    name: "sign-in",
    component: SignIn,
  },
  {
    path: "/inscription",
    name: "sign-up",
    component: SignUp,
  },
  {
    path: "/profile",
    name: "profile",
    component: MyProfile,
    beforeEnter: authGuard,
  },
  {
    path: "/category",
    name: "category",
    component: AddCategory,
    // beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
