import Vue from 'vue'
import Router from 'vue-router'
import Category from './views/Category.vue'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [ 
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Category',
      name: 'Category',
      component: Category
    },
  ]
})
