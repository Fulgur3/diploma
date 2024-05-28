import { createRouter, createWebHistory } from 'vue-router'
import Authorization from "@/views/Authorization.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'authorization',
      component: Authorization
    },
  ]
})

export default router