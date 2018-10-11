<template>
    <div class="vault">
        <Navbar></Navbar>
        <h1>{{vault.name}}</h1>
        <h5>{{vault.description}}</h5>
        <hr>
        <form @submit.prevent="addKeep">
            <input class="newKeep1" type="text" placeholder="New Keep Name" v-model="newKeep.name" required>
            <input class="newKeep2" type="text" placeholder="Description" v-model="newKeep.description">
            <input class="newKeep3" type="text" placeholder="Img Url" v-model="newKeep.img">
            <button class="submit" type="submit">Create New Keep</button>
        </form>
        <div class="container">
            <div class="row justify-content-center" v-for="keep in vaultKeeps" :keepData='keep' :key="vault._id">
                <div class="col-3">
                    <Keep class="col-3" :to="{name: 'vault', params: {vaultId: vault.id}}"/>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue'
    import Keep from '@/components/Keep.vue'

    export default {
        name: "vault",
        data() {
            return {
                newKeep: {
                    name: "",
                    description: "",
                    img: "",
                    userId: this.$store.state.user.id,
                    vaultId: this.$route.params.vaultId
                }
            }
        },
        components: {
            Navbar,
            Keep,
        },
        computed: {
            vault() {
                return this.$store.state.activeVault
            },
            vaultKeeps() {
                return this.$store.state.vaultKeeps
            },
        },
        mounted() {
            this.$store.dispatch('getVault', this.$route.params.vaultId);
            this.$store.dispatch('getVaultKeeps', this.$route.params.vaultId)
        },
        methods: {
            addKeep() {
                this.$store.dispatch('addKeep', this.newKeep);
                // this.$store.dispatch('addKeeptoVault', this.$route.params.vaultId)
            }
        },
    }
</script>

<style scoped>
    .newKeep1,
    .newKeep2 {
        margin-right: 5px
    }
</style>