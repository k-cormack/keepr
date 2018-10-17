import Vue from 'vue'
import Vuex, { Store } from 'vuex'
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
    keeps: [],
    myVaults: [],
    activeVault: {},
    vaultKeeps: [],
    vaultKeepsDict:{},
    vaultKeepData: {},
    dropdownId1: 1,
    dropdownId2: 0,
  },
  mutations: {
    logout(state){
      state.myVaults = [],
      state.user = {},
      state.vaults = [],
      state.activeVault = {},
      state.vaultKeeps = [],
      state.vaultKeepData = 1,
      state.dropdownId1 = 0
    },
    setUser(state, user) {
      state.user = user
    },
    setVaults(state, data) {
      state.vaults = data
    },
    setKeeps(state, data) {
      state.keeps = data
    },
    setMyVaults(state, data){
      state.myVaults = data
    },
    setVault(state, data) {
      state.activeVault = data
    },
    setVaultKeeps(state, keeps) {
      state.vaultKeeps = keeps
    },
    setVaultKeepData(state, vaultKeepData) {
      state.vaultKeepData = vaultKeepData
    },
    setKeepsToDict(state, payload){
      if(payload.keeps.length > 0)
      {
        Vue.set(state.vaultKeepsDict, payload.vaultId, payload.keeps)
      }
    },
    // setDropdownId(state, id) {
    //   state.dropdownId = id
    // }
  },
  actions: {
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data),
          router.push({ name: 'home' })
        })
        .catch(e => {
          console.log('[registration failed] :', e)
        })
    },
    authenticate({ commit, dispatch, state }) {
      if(state.user.id){
        return
      }
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          dispatch('getMyVaults', res.data.id)
        })
        .catch(e => {
          console.log('not authenticated')
        })
    },
    authenticateInVault({ commit, dispatch }) {
      auth.get('authenticate')
      .then(res=> {
        commit('setUser', res.data)
      })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          dispatch('getMyVaults', res.data.id)
          router.push({ name: 'home' })
        })
        .catch(e => {
          console.log('Login Failed')
        })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
      .then(res=> {
        commit("logout")
        router.push({ name: 'login'})
      })
    },
    // getVaults({ commit, dispatch }) {
    //   api.get('vaults')
    //   .then(res=> {
    //     commit('setVaults', res.data)
    //     router.push({ name: 'browseVaults'})
    //   })
    // },
    getMyVaults({ commit, dispatch }, userId) {
      api.get('vaults/myvaults/' + userId)
      .then(res=> {
        commit('setMyVaults', res.data)
        res.data.forEach(v => {
          dispatch("addVaultKeepsToDict", v.id)
        });
        router.push({ name: "home" })
      })
    },
    addVaultKeepsToDict({commit, dispatch}, vaultId){
      api.get('keeps/vaultkeeps/' + vaultId)
      .then(res=>{
        commit("setKeepsToDict", {keeps: res.data, vaultId})
      })      
    },
    getVault({ commit, dispatch }, vaultId) {
      api.get('vaults/' + vaultId)
      .then(res=> {
        commit('setVault', res.data)
      })
    },
    getMyVaultsForAdd({ commit, dispatch}, userId){
      api.get('vaults/myvaults/' + userId)
      .then(res=>{
        commit('setMyVaults', res.data)
      })
    },
    addVault({ commit, dispatch }, newVault) {
      api.post('vaults', newVault)
      .then(res=> {
        dispatch('getMyVaults', newVault.userId)
      })
    },
    deleteVault({ commit, dispatch }, {vaultId, userId}) {
      api.delete('vaults/' + vaultId)
      .then(res=> {
        dispatch('getMyVaults', userId)
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
        dispatch('addKeepToVaultKeeps', vk)
      })
    },
    addKeepToVaultKeeps({ commit, dispatch }, vk) {
      api.post('keeps/vaultkeeps/', vk)
      .then(res=> {
        dispatch('getVaultKeeps', vk.vaultId)
      })
    },
    getKeeps({ commit, dispatch }) {
      api.get('keeps')
      .then(res=> {
        commit('setKeeps', res.data)
      })
    },
    viewAllKeeps({ commit, dispatch}){
      api.get('keeps')
      .then(res=>{
        commit('setKeeps', res.data)
        router.push({name: 'AllKeeps'});
      })
    },
    setVaultKeepData({ commit }, vaultKeepData) {
      commit('setVaultKeepData', vaultKeepData)
    },
    removeFromVault({ commit, dispatch}, vaultKeepData) {
      api.put('keeps/vaultkeeps/', vaultKeepData)
      .then(res=> {
        dispatch('getVaultKeeps', vaultKeepData.vaultId)
      })
    },
  //  setDropdownId({ commit }, id){
  //    commit('setDropdownId', id)
  //  }

  }
})