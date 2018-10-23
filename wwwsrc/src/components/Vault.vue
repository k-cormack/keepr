<template>
    <div class="vault">
    
        <CreateKeepBar></CreateKeepBar>

        <div id="keeps" class="row justify-content-center">

            <Keep v-for="keep in vaultKeeps" :keepData='keep' :key="keep.id" />

        </div>

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
               
            }
        },
        mounted() {
            this.$store.dispatch("authenticateForVault");
            window.addEventListener('click', this.closeDropdown);            
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
            },
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
        
        props: ["vaultData"],

        components: {
            Navbar,
            Keep,
            CreateKeepBar,
        },
    }
</script>

<style scoped>
    #keeps {
        margin-top: 120px;
    }
    .card {
        width: 20rem;
        height: 360px;
    }
    .card-body {
        background: rgb(76, 209, 209);
    }

    .card:hover {
        color: red;
    }

    .card-image-top {
        max-height: 20rem;
    }

    .card-img-top:hover {
        transform: scale(1.05);
        cursor: pointer;
        z-index: 2;
    }

    .modal {
        display: none;
        /* Hidden by default */
        position: fixed;
        /* Stay in place */
        z-index: 30;
        /* Sit on top */
        padding-top: 100px;
        /* Location of the box */
        left: 0;
        top: 0;
        width: 100%;
        /* Full width */
        height: 100%;
        /* Full height */
        overflow: auto;
        /* Enable scroll if needed */
        background-color: rgb(0, 0, 0);
        /* Fallback color */
        background-color: rgba(0, 0, 0, 0.9);
        /* Black w/ opacity */
    }

    #modal-image {
        width: 100%;
        max-width: 700px;
    }

    .modal-content {
        margin: auto;
        display: block;
        width: 80%;
        max-width: 700px;
    }

    .modal-body {
        margin: auto;
        display: block;
        width: 80%;
        max-width: 700px;
        text-align: center;
        padding: 10px 0;
        height: 50px;
    }

    .modal-content,
    .modal-body {
        animation-name: zoom;
        animation-duration: 0.6s;
    }

    .modal-close {
        position: absolute;
        top: 15px;
        right: 35px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        transition: 0.3s;
    }

    .modal-close:hover,
    .modal-close:focus {
        color: #bbb;
        text-decoration: none;
        cursor: pointer;
    }

    @keyframes zoom {
        from {
            transform: scale(0)
        }

        to {
            transform: scale(1)
        }
    }

    /* 100% Image Width on Smaller Screens */
    @media only screen and (max-width: 700px) {
        .modal-content {
            width: 100%;
        }
    }

    .keep-button {
        background-color: #3498DB;
        color: white;
        margin: 5px;
        padding: 10px;
        font-size: 16px;
        border: none;
        cursor: pointer;
    }

    .keep-button:hover,
    .keep-button:focus {
        background-color: #2980B9;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        /* display: none; */
        position: absolute;
        background-color: #f1f1f1;
        min-width: 160px;
        overflow: auto;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
    }

    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown a:hover {
        background-color: #ddd;
    }

    .show {
        display: block;
    }
</style>