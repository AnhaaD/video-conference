import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'meeting',
      component: require('@/components/Meeting').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
