import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RehearsalsView from '../views/RehearsalsView.vue'
import CalendarView from '../views/CalendarView.vue'
import GroupView from '../views/GroupView.vue'
import DetailsView from '../views/DetailsView.vue'
import PostsView from '../views/PostsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/posts/:id',
    name: 'details',
    component: DetailsView,
    props: true //we can acces the wrap parameter as a prop inside the details component
  },
  {
    path: '/rehearsals',
    name: 'rehearsals',
    component: RehearsalsView,
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: CalendarView
  },
  {
    path: '/group',
    name: 'group',
    component: GroupView,
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostsView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
