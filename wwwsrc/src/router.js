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
import CreateKeepBar from './components/CreateKeepBar.vue'
// @ts-ignore
import Keep from './components/Keep.vue'


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
    {
      path: '/browse',
      name: 'browseVaults',
      component: BrowseVaults
    },
    {
      path: '/vaults/:vaultId',
      name: 'vault',
      component: Vault
    },
    {
      path: 'keeps/vaultkeeps/:vaultId',
      name: 'vaultKeeps',
      component: Keep
    },
    // {
    //   path: '/vaults',
    //   name: 'createVault',
    //   component: CreateVault
    // },
    // {
    //   path: '/keeps',
    //   name: 'createKeep',
    //   component: CreateKeep
    // },
  ]
})