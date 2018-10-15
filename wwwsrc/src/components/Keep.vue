<template>
    <div>
        <div class="card">
            <img class="card-img-top img-responsive" @click.prevent='imgModal' :src="keepData.img" alt="" />
            <div class="card-body">
                <h3>{{keepData.name}}</h3>
                <p>{{keepData.description}}</p>
                <!-- <button id="remove-button" type="submit" @click.prevent='removeFromVault'>DELETE FROM VAULT</button> -->
            </div>
        </div>
        <div id="img-modal" class="modal">
            <div class="modal-content">
                <span class="modal-close">&times;</span>

                <img id="modal-image" :src="keepData.img" alt="" />
                <div class="modal-body">
                    {{keepData.name}}
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "keep",
        data: function () {
            return {
                
                }
        },
        mounted() {
            // this.checkLogin()
        },
        computed: {

        },
        methods: {
            imgModal() {
                var modal = document.getElementById('img-modal');
                var span = document.getElementsByClassName("modal-close")[0];
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
            checkLogin() {
                // id = this.$store.user.id;
                var showButton = document.getElementById("remove-button");
                    if (this.$store.state.user.id) {
                        showButton.style.display = "block";
                    } else {
                        showButton.style.display = "none";
                    }
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
            }
        },
        props: ["keepData"],

        components: {

        },
    }
</script>

<style>
    /* .keep {
        background-color: #8aae92;
        min-height: 50vh;
        margin: 10px;
        padding-bottom: 10px;
        border-radius: 10px;
    } */

    .card {
        width: 20rem;
        /* border: darkblue; */

    }

    .card:hover {
        color: red;
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
        /* color: #ccc; */
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
</style>