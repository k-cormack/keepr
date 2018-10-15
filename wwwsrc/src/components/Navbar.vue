<template>
    <div>
        <div class="row" id="navbar">
            <div class="col-4 name-head">
                KEEPR
            </div>
            <div class="col-2"></div>
            <div class="col-2 nav-buttons" @click.prevent="createVault">
                CREATE VAULT
            </div>
            <div class="col-2 nav-buttons" @click.prevent="getVaults">
                MY VAULTS
            </div>
            <div class="col-2 nav-buttons" @click.prevent="logout">
                LOGOUT
            </div>
        </div>
        <!-- <div class="row">
            <form @submit.prevent="addKeep">
                <input class="newKeep1" type="text" placeholder="New Keep Name" v-model="newKeep.name" required>
                <input class="newKeep2" type="text" placeholder="Description" v-model="newKeep.description">
                <input class="newKeep3" type="text" placeholder="Img Url" v-model="newKeep.img">
                <button class="submit" type="submit">Create New Keep</button>
            </form>
        </div> -->
        <div id="createModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>Create new Vault here</p>
                <form id="form" @submit.prevent="addVault">
                    <input type="text" placeholder="Name of Vault" v-model="newVault.name" required>
                    <input type="text" placeholder="Description" v-model="newVault.description">
                    <button id="create-button" type="submit">Create New Vault</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {
                newVault: {
                    name: "",
                    description: "",
                    userId: this.$store.state.user.id,
                }
            };
        },
        // components: {
        //     Navbar,
        // },
        mounted() {
            this.scroll();
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            getVaults() {
                this.$store.dispatch('getMyVaults')
            },
            createVault() {
                var modal = document.getElementById('createModal');
                var span = document.getElementsByClassName("close")[0];
                var button = document.getElementById('create-button');
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
            addVault() {
                this.$store.dispatch("addVault", this.newVault);
                var form = document.getElementById("form");
                var button = document.getElementById("create-button");
                form.reset();
                var modal = document.getElementById('createModal').style.display = "none";
                this.addVault = {
                    name: "",
                    description: ""
                };
            },
            scroll() {
                var prevScrollpos = window.pageYOffset;
                window.onscroll = function () {
                    var currentScrollPos = window.pageYOffset;
                    if (prevScrollpos > currentScrollPos) {
                        document.getElementById("navbar").style.top = "0";
                    } else {
                        document.getElementById("navbar").style.top = "-56px";
                    }
                    prevScrollpos = currentScrollPos;
                }
            },
        }
    }
</script>

<style scoped>
    #navbar {
        background-color: rgb(78, 79, 156);
        color: white;
        text-shadow: 2px 2px black;
        z-index: 5;
        position: fixed;
        top: 0;
        min-height: 56px;
        max-height: 63px;
        width: 100%;
        transition: top 0.3s;
    }

    .name-head {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3vw !important;
        letter-spacing: 10px;
    }

    .name-head:hover {
        background-color: #333;
        color: white;
    }

    .nav-buttons {
        display: flex;
        /* align-content: flex-end; */
        text-align: center;
        text-decoration: none;
        font-size: 1.8vw;
        justify-content: center;
        /* text-align: center; */
        align-items: center;
    }

    .nav-buttons:hover {
        background-color: #333;
        color: white;
    }


    /* The Modal (background) */
    .modal {
        display: none;
        /* Hidden by default */
        position: fixed;
        /* Stay in place */
        z-index: 1;
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
        background-color: rgba(0, 0, 0, 0.4);
        /* Black w/ opacity */
    }

    /* Modal Content */
    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }

    /* The Close Button */
    .close {
        color: #aaaaaa;
        /* float: right; */
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
</style>