import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Home from './views/Home.vue'
// @ts-ignore
import Login from './views/Login.vue'
// @ts-ignore
import Vault from './components/Vault.vue'
// @ts-ignore
import CreateVault from './components/CreateVault.vue'
// @ts-ignore
import BrowseVaults from './views/MyVaults.vue'
//@ts-ignore
import CreateKeep from './components/CreateKeep.vue'
// @ts-ignore
import SelectKeep from './components/SelectKeep.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/vaults/:id',
    //   name: 'vault',
    //   component: Vault
    // },
    // {
    //   path: '/vaults',
    //   name: 'createVault',
    //   component: CreateVault
    // },
    {
      path: '/browse',
      name: 'browseVaults',
      component: BrowseVaults
    },
    // {
    //   path: '/keeps',
    //   name: 'createKeep',
    //   component: CreateKeep
    // },
    // {
    //   path: '/keeps/:id',
    //   name: 'selectKeep',
    //   component: SelectKeep
    // }
  ]
})