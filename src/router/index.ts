import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainContent from '../components/MainContent.vue'
import XCart from '../components/XCart.vue'
import XOrders from '@/components/XOrders.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainContent
  },
  {
    path: '/sneakers',
    name: 'sneakers',
    component: MainContent
  },
  {
    path: '/accessories',
    name: 'accessories',
    component: MainContent
  },
  {
    path: '/sales',
    name: 'sales',
    component: MainContent
  },
  {
    path: '/info',
    name: 'info',
    component: MainContent
  },
  {
    path: '/cart',
    name: 'cart',
    component: XCart
  },
  {
    path: '/orders',
    name: 'orders',
    component: XOrders,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
