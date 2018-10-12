<template>
    <div id="vaults-row" class="row justify-content-center">
        
            <!-- <navbar></navbar> -->
            <div id="my-vaults" v-for="vault in myVaults" :key="vault._id">
                <router-link class="card" :to="{name: 'vault', params: {vaultId: vault.id}}">
                    <img src="https://loremflickr.com/200/250/cars" alt="">
                    <h3>{{vault.name}}</h3>
                    <h5>{{vault.description}}</h5>
                </router-link>
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
            this.$store.dispatch("getMyVaults");
        },
        computed: {
            myVaults() {
                return this.$store.state.myVaults;
            }
        }

    }
</script>

<style scoped>
    #vaults-row {
        margin-top: 60px;
    }
    a:hover {
        text-decoration: none;
        color: red;
    }
    img:hover {
        transform: scale(1.05);
    }
    
</style>