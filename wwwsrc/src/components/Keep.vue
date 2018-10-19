<template>
    <div>
        <div class="card">
            <img class="card-img-top img-responsive" @click='imgModal' :src="keepData.img" alt="" />
            <div class="card-body">
                <h3>{{keepData.name}}</h3>
                <p>{{keepData.description}}</p>
                <button id="remove-button" type="submit" class="keep-button" v-if="user.id" @click.prevent='removeFromVault'>Remove
                    From Vault</button>
                <div class="dropdown" v-if="user.id">
                    <button @click="dropdown" :class="keepData.id+'dropbtn'" class="keep-button">Add to Vault</button>
                    <div :id="keepData.id" class="dropdown-content" style="display: none">
                        <a v-for="vault in myVaults" :vaultData="vault" :key="vault.id" @click='addToVault(vault)'>{{vault.name}}</a>
                        <!-- <a href="#about">About</a>
                        <a href="#contact">Contact</a> -->
                    </div>
                </div>
            </div>

        </div>
        <div :id="keepData.id+'-modal'" class="modal">
            <div class="modal-content">
                <span :id="keepData.id+'-close'" class="modal-close">&times;</span>

                <img id="modal-image" :src="keepData.img" alt="" />
                <div class="modal-body">
                    {{keepData.name}}
                </div>
            </div>
        </div>
    </div>
    </div>

</template>


<script>
    import {
        mixin as clickaway
    } from 'vue-clickaway';

    export default {
        mixins: [clickaway],
        template: '<p v-on-clickaway="away">Click away</p>',
        name: "keep",
        data: function () {
            return {

            }
        },


        mounted() {
            
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            myVaults() {
                return this.$store.state.myVaults;
            },
        },
        methods: {

            imgModal() {
                var modal = document.getElementById(this.keepData.id + "-modal");
                var span = document.getElementById(this.keepData.id + "-close");
                modal.style.display = "block";
                span.onclick = function () {
                    modal.style.display = "none";

                };
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                };
            },
            setVaultKeepData() {
                this.$store.dispatch('setVaultKeepData', vaultKeepData)
            },
            removeFromVault() {
                let vaultKeepData = {
                    vaultId: this.$route.params.vaultId,
                    keepId: this.keepData.id,
                }
                this.$store.dispatch('removeFromVault', vaultKeepData);
            },
            addToVault(vault) {
                let vaultKeepData = {
                    vaultId: vault.id,
                    keepId: this.keepData.id,
                    userId: this.$store.state.user.id,
                }
                this.$store.dispatch('addKeepToVaultKeeps', vaultKeepData);
                document.getElementById(this.keepData.id).classList.toggle("show");
            },
            dropdown() {
                var x = document.getElementById(this.keepData.id);
                if (x.style.display == "none") {
                    x.style.display = "block";
                }
                this.$store.state.dropdownId1 = this.keepData.id;
            },
        },
        props: ["keepData"],

        components: {

        },
    }
</script>

<style>
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