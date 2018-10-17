<template>
    <div class="vault">
        <Navbar></Navbar>
        <!-- <CreateKeepBar></CreateKeepBar> -->
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

            <Keep v-for="keep in keeps" :keepData='keep' :key="keep.id" />

        </div>
        <!-- <span>{{vaultData.name}}</span> -->


    </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue'
    import Keep from '@/components/Keep.vue'
    import CreateKeepBar from '@/components/CreateKeepBar.vue'

    export default {
        name: "all-keeps",
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
            if(this.$store.state.keeps.length == 0){
                this.$store.dispatch('getKeeps');
            }
            this.$store.dispatch("authenticateInVault");
            window.addEventListener('click', this.closeDropdown);
            if (this.$store.state.myVaults.length == 0 && this.$store.state.user.id) {
                let userId = this.$store.state.user.id;
                this.$store.dispatch('getMyVaultsForAdd', userId)
            }
            
            // this.$store.dispatch('getVault', this.$route.params.vaultId);
            // this.$store.dispatch('getVaultKeeps', this.$route.params.vaultId)
        },
        computed: {
            keeps() {
                return this.$store.state.keeps
            },
            // vault() {
            //     return this.$store.state.activeVault
            // },
            // vaultKeeps() {
            //     return this.$store.state.vaultKeeps
            // },
        },
        methods: {
            closeDropdown() {

                let id1 = this.$store.state.dropdownId1;
                let id2 = this.$store.state.dropdownId2;
                if (id1 == 1) {
                    let x = document.getElementById(id2);
                    x.style.display = "none";
                    this.$store.state.dropdownId1 = 1;

                    // document.getElementById(id2).classList.toggle("show");
                    // this.$store.state.dropdownId = {}
                } else if (id2 != 0) {
                    let x = document.getElementById(id2);
                    x.style.display = "none";

                }
                this.$store.state.dropdownId2 = this.$store.state.dropdownId1;
                this.$store.state.dropdownId1 = 1;

            },
            //             var x = document.getElementById(this.keepData.id);
            //     if (id1.style.display === "block") {
            //         x.style.display = "none";
            //     } else {
            //         x.style.display = "none";
            //     }
            // }
        },

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