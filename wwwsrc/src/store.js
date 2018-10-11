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
    activeVault: {},
    vaultKeeps: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setVaults(state, data) {
      state.vaults = data
    },
    setMyVaults(state, data){
      state.myVaults = data
    },
    setVault(state, data) {
      state.activeVault = data
    },
    setVaultKeeps(state, keeps) {
      state.vaultKeeps = keeps
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
          // router.push({ name: 'home' })
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
    logout({ commit, dispatch }) {
      auth.delete('logout')
      .then(res=> [
        router.push({ name: 'login'})
      ])
    },
    getVaults({ commit, dispatch }) {
      api.get('vaults')
      .then(res=> {
        commit('setVaults', res.data)
        router.push({ name: 'browseVaults'})
      })
    },
    getMyVaults({ commit, dispatch }) {
      api.get('vaults')
      .then(res=> {
        commit('setMyVaults', res.data)
      })
    },
    getVault({ commit, dispatch }, vaultId) {
      api.get('vaults/' + vaultId)
      .then(res=> {
        commit('setVault', res.data)
      })
    },
    addVault({ commit, dispatch }, newVault) {
      api.post('vaults', newVault)
      .then(res=> {
        dispatch('getMyVaults')
      })
    },
    getVaultKeeps({ commit, dispatch}, vaultId) {
      api.get('keeps/vaultkeeps/' + vaultId)
      .then(res=> {
        commit('setVaultKeeps', res.data)
      })
    },
    addKeep({ commit, dispatch }, newKeep) {
      api.post('keeps', newKeep)
      .then(res=> {
        let vk = {
          userId: newKeep.userId,
          vaultId: newKeep.vaultId,
          keepId: res.data.id,
        }
        dispatch('addKeeptoVaultKeeps', vk)
      })
    },
    addKeeptoVaultKeeps({ commit, dispatch }, vk) {
      api.post('keeps/vaultkeeps/', vk)
      .then(res=> {
        dispatch('getVaultKeeps', vk.vaultId)
      })
    }

  }
})