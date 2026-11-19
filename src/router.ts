import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import LectureView from "@/views/LectureView.vue"
import LoginView from "@/views/LoginView.vue"
import VerifyView from "@/views/VerifyView.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    {
      path: "/login/:role(student|lecturer)",
      name: "login",
      component: LoginView,
      props: true,
    },
    {
      path: "/verify/:role(student|lecturer)",
      name: "verify",
      component: VerifyView,
      props: true,
    },
    { path: "/lecture", name: "lecture", component: LectureView },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
})
