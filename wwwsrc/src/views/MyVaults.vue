<template>
    <div id="my-vaults flex col-12">
        <navbar></navbar>
        <div class="container">
            <div class="row justify-content-center" v-for="vault in myVaults" :key="vault._id">
                <div class="col-3">
                    <router-link class="row justify-content-center" :to="{name: 'vault', params: {vaultId: vault.id}}">{{vault.name}}             {{vault.id}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from '../components/Navbar.vue'

    export default {
        name: 'vaults',
        data () {
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
        mounted(){
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
 .my-vaults {
     font-size: 2rem;
 }
</style>