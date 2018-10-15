<template>
    <div>
        <div class="row">
            <div class="col title">
                <span>MY VAULTS</span>
            </div>
        </div>
        <div id="vaults-row" class="row justify-content-center">
            <div id="my-vaults" v-for="vault in myVaults" :vaultData="vault" :key="vault._id">
                <router-link class="card" :to="{name: 'vault', params: {vaultId: vault.id}}">
                    <img src="https://loremflickr.com/200/250/cars" alt="">
                    <h3>{{vault.name}}</h3>
                    <h5>{{vault.description}}</h5>
                    <h5 id="vault-id">{{vault.id}}</h5>
                    <button id="delete-vault-button" type="submit" @click.prevent="deleteVault">DELETE VAULT</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'

    export default {
        name: 'vaults',
        data() {
            return {
                // newVault : {
                //     title: "",
                //     decription: ""
                // }
            };
        },
        components: {
            Navbar,
        },
        mounted() {
            this.$store.dispatch("authenticate");
            // let userId = this.$store.state.user.id;
            // this.$store.dispatch("getMyVaults", userId);
        },
        computed: {
            myVaults() {
                return this.$store.state.myVaults;
            }
        },
        methods: {
            deleteVault() {
                let x = document.getElementById('vault-id').innerHTML;
                let vaultId = parseInt(x);
                let userId = this.$store.state.user.id;
                this.$store.dispatch('deleteVault', {vaultId, userId});
            }
        },
        


    }
</script>

<style scoped>
    .title {
        font-size: 3vw;
        margin-top: 60px;
        margin-bottom: 10px;
    }
    /* #vaults-row {
        margin-top: 60px;
    } */

    a:hover {
        text-decoration: none;
        color: red;
    }

    img:hover {
        z-index: 2;
        transform: scale(1.05);
    }
</style>