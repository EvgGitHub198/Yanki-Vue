import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    token: '',

  },
  getters: {
  },
  mutations: {
    initializeStore(state) {

      if (localStorage.getItem('token')) {
          state.token = localStorage.getItem('token')
          state.isAuthenticated = true
      } else {
          state.token = ''
          state.isAuthenticated = false
      } 
    },

    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
  },  
  removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
  },

  },
  actions: {
    login({ commit }, token) {
        localStorage.setItem('token', token)
        commit('setToken', token)
    }
},
  modules: {
  }
})