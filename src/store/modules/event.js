import EventService from '@/services/EventService.js'

export default {
  namespaced: true,
  state: {
    events: {
      data: []
    },
    event: {}
  },
  mutations: {
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    ADD_EVENT(state, event) {
      state.events.data.unshift(event)
    }
  },
  actions: {
    fetchEvents({ commit, dispatch }, page) {
      EventService.getEvents(page)
        .then(result => {
          commit('SET_EVENTS', result.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message
          }

          dispatch('notification/add', notification, {
            root: true
          })
        })
    },
    fetchEvent({ commit, dispatch, state, getters }, id) {
      if (Object.keys(state.events).length != 1) {
        commit('SET_EVENT', getters.getEventById(id))
      } else {
        EventService.getEvent(id)
          .then(result => {
            commit('SET_EVENT', result.data)
          })
          .catch(error => {
            const notification = {
              type: 'error',
              message: 'There was a problem fetching event: ' + error.message
            }

            dispatch('notification/add', notification, {
              root: true
            })
          })
      }
    },
    createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event)
        .then(result => {
          if (result.data.success) {
            commit('ADD_EVENT', result.data.response)

            const notification = {
              type: 'success',
              message: 'Your event has been created!'
            }

            dispatch('notification/add', notification, {
              root: true
            })
          }

          return result
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem creating your event: ' + error.message
          }

          dispatch('notification/add', notification, {
            root: true
          })

          throw error
        })
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.data.find(event => event.id === parseInt(id))
    }
  }
}
