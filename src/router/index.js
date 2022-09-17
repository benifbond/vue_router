import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import sourceData from "@/data.json";

const routes = [
  { path: "/", name: "Home", component: Home },

  {
path:"/invoices",
name:"invoices",
components:{
default:()=>import("@/views/Invoices.vue"),
LeftSidebar:()=>import("@/components/LeftSidebar.vue"),

},
meta:{
 requiresAuth:true 
}
  },
  {
    path: "/protected",
    name: "protected",
    components: {
     default: () => import("@/views/Protected.vue"),
     LeftSidebar: () => import("@/components/LeftSidebar.vue"),

    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  // USE LAZY Loading TO SPEED LOADING.ie: the clicked page is loaded
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () => import("@/views/Destination.vue"),
    props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
    // Not found page rendering
    beforeEnter(to, from) {
      const exists = sourceData.destinations.find(
        (destination) => destination.id === parseInt(to.params.id)
      );
      if (!exists)
        return {
          name: "NotFound",
          //  Allows keeping the URL while rendering a different page
          params: { pathMatch: to.path.split("/").slice(1) },
          query: to.query,
          hash: to.hash,
        };
    },
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () => import("@/views/ExperienceShow.vue"),
        props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }, 300));
      })
    );
  },
  linkActiveClass: "vue_active_link",
});
router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !window.user) {
    // need the user to login if not logged in
    return { name: "login", query:{redirect:to.fullPath} };
  }
});
export default router;
