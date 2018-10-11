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
            <div class="row justify-content-center">
                <div class="col-3">
                    <Keep v-for="keep in vaultKeeps" :keepData='keep' :key="keep.id"/>
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
                    vaultId: this.$route.params.vaultId
                }
            }
        },
        mounted() {
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
        components: {
            Navbar,
            Keep,
        },
    }
</script>

<style scoped>
    .newKeep1,
    .newKeep2 {
        margin-right: 5px
    }
</style>