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
                    <img id="vault-image" :src="setImage(vault.id)" alt="">
                    <h3>{{vault.name}}</h3>
                    <h5>{{vault.description}}</h5>
                    <button id="delete-vault-button" type="submit" class="dropbtn" @click.prevent="deleteVault(vault.id)">DELETE
                        VAULT</button>
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
            deleteVault(vaultId) {
                let userId = this.$store.state.user.id;
                this.$store.dispatch('deleteVault', {
                    vaultId,
                    userId
                });
            },
            setImage(vaultId) {
                let keeps = this.$store.state.vaultKeepsDict[vaultId] || []
                if (keeps.length > 0) {
                    return keeps[Math.floor(Math.random() * keeps.length)].img
                }
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

    #vault-image {

        width: 20rem;
    }

    a:hover {
        text-decoration: none;
        color: red;
    }

    img:hover {
        z-index: 2;
        transform: scale(1.05);
    }
</style>