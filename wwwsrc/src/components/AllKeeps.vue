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

            }
        },
        mounted() {
            this.$store.dispatch("authenticateForVault");
            if (this.$store.state.keeps.length == 0) {
                this.$store.dispatch('getKeeps');
            }
            window.addEventListener('click', this.closeDropdown);
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
                if (id1 == 0 && id1 != id2) {                
                    let x = document.getElementById(id2);
                    x.style.display = "none";
                    this.$store.state.dropdownId1 = 0;
                } else if (id2 != 0) {
                    let x = document.getElementById(id2);
                    x.style.display = "none";
                    if (id2 == id1) {
                        this.$store.state.dropdownId2 = 0;
                    } else {
                        this.$store.state.dropdownId2 = id1;
                    }
                    return
                }
                this.$store.state.dropdownId2 = this.$store.state.dropdownId1;
                this.$store.state.dropdownId1 = 0;
            },
        },
        beforeDestroy(){
            window.removeEventListener('click', this.closeDropdown);
            this.$store.state.dropdownId1 = 0;
            this.$store.state.dropdownId2 = 0;
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