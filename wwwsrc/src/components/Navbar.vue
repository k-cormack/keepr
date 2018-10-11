<template>
    <div>
        <div id="navbar" style="top: 0" class="container-fluid">
            <div class="row">
                <div class="col-5 name-head">
                    <span class="name-span">KEEPR</span>
                </div>
                <div class="col-2 logos">

                </div>
                <div class="col-5 nav-buttons">
                    <a href="#home" @click.prevent="createVault">CREATE
                    </a>
                    <a href="#news" @click.prevent="getVaults">BROWSE VAULTS</a>
                    <a href="#contact" @click.prevent="logout">LOGOUT</a>
                </div>
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
                }
            };
        },
        // components: {
        //     Navbar,
        // },
        mounted: function () {
            var prevScrollpos = window.pageYOffset;
            window.onscroll = function () {
                var currentScrollPos = window.pageYOffset;
                if (prevScrollpos > currentScrollPos) {
                    document.getElementById("navbar").style.top = "0";
                } else {
                    document.getElementById("navbar").style.top = "-55px";
                }
                prevScrollpos = currentScrollPos;
            }
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
            }
        }
    }
</script>

<style>
    .name-head {
        /* position: absolute; */
        /* margin-top: 3px; */
        /* width: 100%; */
        text-align: center;
        display: flex;
        align-items: center;
    }

    .name-span {
        color: #000;
        font-size: 3vw;
        letter-spacing: 10px;
    }

    .name-span:hover {
        background-color: #333;
        color: white;
    }

    #navbar {
        background-color: ivory;
        z-index: 5;
        position: fixed;
        top: 0;
        width: 100%;
        transition: top 0.3s;
    }

    #navbar a {
        color: black;
        text-align: center;
        padding: 15px;
        text-decoration: none;
        font-size: 17px;
    }

    #navbar a:hover {
        background-color: #333;
        color: white;
    }

    #navbar img {
        max-height: 50px;
        margin-top: 5px;
    }

    .logos {
        display: flex;
        justify-content: space-around;
    }

    .nav-buttons {
        display: flex;
        justify-content: flex-end;
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