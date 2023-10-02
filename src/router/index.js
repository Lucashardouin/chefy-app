import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import SignIn from "@/views/SignInView.vue";
import SignUp from "@/views/SignUpView.vue";
import MyProfile from "@/views/MyProfileView.vue";
// import AddCategory from "@/views/CategoryView.vue";
// import AddArticle from "@/views/ArticleView.vue";
// import EditArticle from "@/views/EditArticleView.vue";
import { authGuard } from "@/authGuard";
import MyMenu from "@/views/MyMenuView.vue";
import QrCode from "@/views/QrCodeView.vue"

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
  // {
  //   path: "/category",
  //   name: "category",
  //   component: AddCategory,
  //   beforeEnter: authGuard,
  // },
  // {
  //   path: "/article",
  //   name: "article",
  //   component: AddArticle,
  //   beforeEnter: authGuard,
  // },
  // {
  //   path: "/article/:id_article",
  //   name: "article",
  //   component: EditArticle,
  //   beforeEnter: authGuard,
  // },
  {
    path: "/menu/:id_user",
    name: "menu",
    component: MyMenu,
    // beforeEnter: authGuard,
  },
  {
    path: "/qrcode",
    name: "qrcode",
    component: QrCode,
    beforeEnter: authGuard
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
