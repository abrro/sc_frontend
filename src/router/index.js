import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchMovies from '../views/SearchMovies.vue'
import TrendingMovies from '../views/TrendingMovies'
import Login from '../views/Login'
import Register from '../views/Register'
import Profile from '../views/Profile'
import UserCollections from '../views/UserCollections'
import Movie from '../views/Movie'
import SingleCollection from '../views/SingleCollection'
import EditCollection from '../views/EditCollection'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/search',
    name: 'searchMovies',
    component: SearchMovies
  },
  {
    path: '/trending',
    name: 'trendingMovies',
    component: TrendingMovies
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/collections',
    name: 'userCollections',
    component: UserCollections
  },
  {
    path: '/collection/:id?',
    name: 'collection',
    component: SingleCollection
  },
  {
    path: '/collection/:id?/edit',
    name: 'editCollection',
    component: EditCollection
  },
  {
    path: '/movie/:id?',
    name: 'movie',
    component: Movie
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
