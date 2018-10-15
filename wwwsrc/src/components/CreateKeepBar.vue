<template>
    <div>
        <div class="row" id="create-keep-bar">

            <div class="col-3 name-head">
                KEEPR
            </div>
            <div class="col-2"></div>
            <div class="col-2 nav-buttons" @click.prevent="viewAllKeeps">
                ALL KEEPS
            </div>
            <div class="col-2 nav-buttons" @click.prevent="keepModal">
                CREATE KEEP
            </div>
            <div class="col-2 nav-buttons" @click.prevent="getMyVaults">
                MY VAULTS
            </div>
            <div class="col-1 nav-buttons" @click.prevent="logout">
                LOGOUT
            </div>
        </div>

        <!-- <div class="row keep-form">
            <div class="col-12">
                <form @submit.prevent="addKeep">
                    <input class="newKeep1" type="text" placeholder="New Keep Name" v-model="newKeep.name" required>
                    <input class="newKeep2" type="text" placeholder="Description" v-model="newKeep.description">
                    <input class="newKeep3" type="text" placeholder="Img Url" v-model="newKeep.img">
                    <button class="submit" type="submit">Create New Keep</button>
                </form>
            </div>
        </div> -->
        <div id="keepModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>Create New Keep Here</p>
                <form id="form" @submit.prevent="addKeep">
                    <input type="text" placeholder="Name of Keep" v-model="newKeep.name" required>
                    <input type="text" placeholder="Description" v-model="newKeep.description">
                    <input type="text" placeholder="Image address" v-model="newKeep.img" required>
                    <button id="create-button" type="submit">Create New Keep!</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CreateKeepBar',
        data() {
            return {
                newKeep: {
                    name: "",
                    description: "",
                    img: "",
                    vaultId: this.$route.params.vaultId
                },
            };
        },

        mounted() {
            this.scroll();
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
            },
            viewAllKeeps(){
                this.$store.dispatch('viewAllKeeps');
            },
            getMyVaults() {
                let userId = this.$store.state.user.id;
                this.$store.dispatch('getMyVaults', userId);
            },
            keepModal() {
                var modal = document.getElementById('keepModal');
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
                button.onclick = function () {
                    modal.style.display = "none";
                }
            },
            addKeep() {
                this.$store.dispatch('addKeep', this.newKeep);
                this.newKeep = {
                    name: '',
                    description: '',
                    img: '',
                }
            },
            scroll() {
                var prevScrollpos = window.pageYOffset;
                window.onscroll = function () {
                    var currentScrollPos = window.pageYOffset;
                    if (prevScrollpos > currentScrollPos) {
                        document.getElementById("create-keep-bar").style.top = "0";
                    } else {
                        document.getElementById("create-keep-bar").style.top = "-56px";
                    }
                    prevScrollpos = currentScrollPos;
                }
            },
        }
    }
</script>

<style scoped>
    #create-keep-bar {
        background-color: rgb(78, 79, 156);
        color: white;
        text-shadow: 2px 2px black;
        z-index: 5;
        position: fixed;
        top: 0;
        min-height: 56px;
        max-height: 100px;
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

    .keep-form {
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