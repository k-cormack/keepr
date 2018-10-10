<template>
    <div id="my-vaults flex col-12">
        <navbar></navbar>
        <div class="container">
            <div class="row justify-content-center" v-for="vault in vaults" :key="vault._id">
                <div class="col-3">
                    <router-link class="row justify-content-center" :to="{name: 'vault', params: {vaultId: vault._id}}"></router-link>
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
            vaults() {
                return this.$store.state.vaults;
            }
        }

    }
</script>

<style scoped>
 .my-vaults {
     font-size: 1.75rem;
 }
</style>