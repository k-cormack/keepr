import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:5000/account/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:5000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    vaults: [],
    myVaults: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setVaults(state, vaults) {
      state.vaults = vaults
    },
    setMyVaults(state, vaults){
      state.myVaults = vaults
    }
  },
  actions: {
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
        .catch(e => {
          console.log('[registration failed] :', e)
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
        .catch(e => {
          console.log('not authenticated')
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'home' })
        })
        .catch(e => {
          console.log('Login Failed')
        })
    },
    logout({commit, dispatch}) {
      auth.delete('logout')
      .then(res=> [
        router.push({ name: 'login'})
      ])
    },
    getVaults({ commit, dispatch}) {
      api.get('vaults')
      .then(res=> {
        commit('setVaults', res.data)
        router.push({ name: 'browseVaults'})
      })
    },
    getMyVaults({commit, dispatch}, userId) {
      api.get('vaults/'+ userId)
      .then(res=> {
        commit('setMyVaults', res.data)
      })
    },
    addVault({ commit, dispatch}, newVault) {
      api.post('vaults', newVault)
      .then(res=> {
        dispatch('getVaultsByUserId')
      })
    },

  }
})