import Vue from 'vue'
import Router from 'vue-router'
import TweetComposer from '@/components/TweetComposer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TweetComposer',
      component: TweetComposer
    }
  ]
})
