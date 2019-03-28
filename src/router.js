import Vue from 'vue'
import Router from 'vue-router'
import EventList from './views/EventList.vue'
import EventCreate from './views/EventCreate.vue'
import EventShow from './views/EventShow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      meta: {
        title: 'VueMastery - Home | Event App'
      }
    },
    {
      path: '/create-event',
      name: 'create-event',
      component: EventCreate,
      meta: {
        title: 'VueMastery - Create | Event App'
      }
    },
    {
      path: '/event-show/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      meta: {
        title: 'VueMastery - Event | Event App'
      }
    }
  ]
})
