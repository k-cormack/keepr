<template>
    <div class="vault">
        <!-- <Navbar></Navbar> -->
        <CreateKeepBar></CreateKeepBar>
        <!-- <div id="keeps">
            <h3>{{vault.name}}</h3>
            <h5>{{vault.description}}</h5>
            <hr>
            <form @submit.prevent="addKeep">
                <input class="newKeep1" type="text" placeholder="New Keep Name" v-model="newKeep.name" required>
                <input class="newKeep2" type="text" placeholder="Description" v-model="newKeep.description">
                <input class="newKeep3" type="text" placeholder="Img Url" v-model="newKeep.img">
                <button class="submit" type="submit">Create New Keep</button>
            </form>
        </div> -->

        <div id="keeps" class="row justify-content-center">
            
            <Keep v-for="keep in vaultKeeps" :keepData='keep' :key="keep.id" />
            
        </div>
        <!-- <span>{{vaultData.name}}</span> -->


    </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue'
    import Keep from '@/components/Keep.vue'
    import CreateKeepBar from '@/components/CreateKeepBar.vue'

    export default {
        name: "vault",
        data() {
            return {
                // newKeep: {
                //     name: "",
                //     description: "",
                //     img: "",
                //     vaultId: this.$route.params.vaultId
                // }
            }
        },
        mounted() {
            this.$store.dispatch("authenticateInVault");

            this.$store.dispatch('getVault', this.$route.params.vaultId);
            this.$store.dispatch('getVaultKeeps', this.$route.params.vaultId)
        },
        computed: {
            vault() {
                return this.$store.state.activeVault
            },
            vaultKeeps() {
                return this.$store.state.vaultKeeps
            },
        },
        methods: {
            addKeep() {
                this.$store.dispatch('addKeep', this.newKeep);
                // this.$store.dispatch('addKeeptoVault', this.$route.params.vaultId)
            }
        },
        props: ["vaultData"],

        components: {
            Navbar,
            Keep,
            CreateKeepBar,
        },
    }
</script>

<style scoped>
    /* .newKeep1,
    .newKeep2 {
        margin-right: 5px
    } */
    #keeps {
        margin-top: 120px;
    }
   
</style>