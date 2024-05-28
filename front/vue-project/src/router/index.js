import { createRouter, createWebHistory } from 'vue-router'
import Authorization from "@/views/Authorization.vue";
import Dashboard from '@/views/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'authorization',
      component: Authorization
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component:Dashboard
    }
  ]
})

export default router