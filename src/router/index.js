import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchMovies from '../views/SearchMovies.vue'
import TrendingMovies from '../views/TrendingMovies'
import TopRatedMovies from '../views/TopRatedMovies'
import Login from '../views/Login'
import Register from '../views/Register'
import UserCollections from '../views/UserCollections'
import Movie from '../views/Movie'
import SingleCollection from '../views/SingleCollection'
import EditCollection from '../views/EditCollection'
import Celebrity from '../views/Celebrity'
import CreateOrEditCollection from '../views/CreateOrEditCollection'

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
    path: '/toprated',
    name: 'topRatedMovies',
    component: TopRatedMovies
  },
  {
    path: '/collections',
    name: 'userCollections',
    meta: {
      authRequired: true,
    },
    component: UserCollections
  },
  {
    path: '/collection/:id',
    name: 'collection',
    meta: {
      authRequired: true,
    },
    component: SingleCollection
  },
  {
    path: '/collection-form/:id?',
    name: 'collectionForm',
    meta: {
      authRequired: true,
    },
    component: CreateOrEditCollection
  },
  {
    path: '/collection/:id/edit',
    name: 'editCollection',
    meta: {
      authRequired: true,
    },
    component: EditCollection
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: Movie
  },
  {
    path: '/celebrity/:id',
    name: 'celebrity',
    component: Celebrity
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const token = localStorage.getItem('token');

    if (!token) {
      next({name: 'login'});
      return;
    }
  }
  next();
});

export default router
