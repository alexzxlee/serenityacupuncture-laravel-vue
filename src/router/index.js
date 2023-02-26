import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import Therapist from "@/components/Therapist.vue";
import Blog from "@/components/Blog.vue";
import Contact from "@/components/Contact.vue";
import Book from "@/components/Book.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../views/AboutView.vue"),
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/therapist",
      name: "therapist",
      component: Therapist,
    },
    {
      path: "/blog",
      name: "blog",
      component: Blog,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
    {
      path: "/book",
      name: "book",
      component: Book,
    },
  ],
});

export default router;
