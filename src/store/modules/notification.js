export default {
  namespaced: true,
  state: {
    nextId: 1,
    notifications: []
  },
  mutations: {
    PUSH(state, notification) {
      state.notifications.push({
        ...notification,
        id: state.nextId++
      })
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationToRemove.id
      )
    }
  },
  actions: {
    add({ commit }, notifcation) {
      commit('PUSH', notifcation)
    },
    remove({ commit }, notificationToRemove) {
      commit('DELETE', notificationToRemove)
    }
  }
}
