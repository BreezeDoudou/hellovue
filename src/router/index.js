import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/account/login.vue'
import HelloWorld from '../components/HelloWorld.vue'
import register from '../components/account/register.vue'
import phone from '../components/account/loginbyphone.vue'
import index from '../views/index.vue'
import test from '../components/appcomonents/test.vue'
import selfaccount from '../components/account/selfaccount.vue'
import editForm from '../components/account/editForm.vue'
import main from '../components/appcomonents/main.vue'
import productForm from '../components/appcomonents/productForm.vue'
import itemForm from '../components/appcomonents/itemForm.vue'
import test1 from '../components/account/test1.vue'
import cart from '../components/appcomonents/cart.vue'
import order from '../components/appcomonents/order.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {

      path: '/hello',
      component: HelloWorld
    },
    {
      path: '/',
      component: login,
    },
    {
      path: '/phone',
      component: phone,
    },
    {
      path: '/register',
      component: register
    },
    {
      path:'/test',
      component:test
    },
    {
      path:'/test1',
      component:test1
    },
    {
      path:'/index',
      component:index,
      children:[
        {
          path:'/',
          component:main
        },
        {
          path:'/selfaccount',
          component:selfaccount
        },
        {
          path:'/edit',
          component:editForm
        },
        {
          path:'/productForm',
          component:productForm, 
        },
        {
          path:'/itemForm',
          component:itemForm
        },
         {
          path:'/cart',
          component:cart
         },
         {
          path:'/order',
          component:order
         }
      ]
    }

  ]

})
