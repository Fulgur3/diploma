import { createRouter, createWebHistory } from 'vue-router'
import Authorization from "@/views/Authorization.vue";
import Dashboard from '@/views/Dashboard.vue';
import Quizes from '@/views/Quizes.vue'
import Session from '@/views/Session.vue'

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
      name:'Dashboard',
      component:Dashboard
    },
    {
      path:'/quiz/:id',
      name:'Quiz',
      component:Quizes
    },
    {
      path:'/session/:code',
      name:'Session',
      component: Session
    }
  ]
})

export default router