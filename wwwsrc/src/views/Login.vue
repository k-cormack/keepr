<template>
    <div>
        <div class="row" id="navbar">
            <div class="col-4 name-head">
                KEEPR
            </div>
            <div class="col-6"></div>
            <div class="col-2 login" @click.prevent="loginModal">
                LOGIN
            </div>
        </div>
        <div id="keeps" class="row justify-content-center">

            <Keep v-for="keep in keeps" :keepData='keep' :key="keep.id" />

        </div>
        <div id="createModal" class="modal">
            <div class="modal-content">
                <span class="close" style="color: black">&times;</span>
                <form v-if="loginForm" @submit.prevent="loginUser">
                    <p>Please Enter Your Email and Password</p>
                    <input type="email" v-model="creds.email" placeholder="email" autofocus>
                    <input type="password" v-model="creds.password" placeholder="password">
                    <button type="submit">Login</button>
                </form>
                <form v-else @submit.prevent="register">
                    <p>Please Enter Your Name, Email, and select a Password to create an Account</p>
                    <input type="text" v-model="newUser.username" placeholder="name" autofocus>
                    <input type="email" v-model="newUser.email" placeholder="email">
                    <input type="password" v-model="newUser.password" placeholder="password">
                    <button type="submit">Create Account</button>
                </form>
                <div @click="loginForm = !loginForm">
                    <p v-if="loginForm">No account? Click <u style="color: blue">HERE</u> to Register</p>
                    <p v-else>Already have an account? Click <u style="color: blue">HERE</u> to Login</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Keep from '../components/Keep.vue'


    export default {
        name: "login",
        data() {
            return {
                loginForm: true,
                creds: {
                    email: "",
                    password: ""
                },
                newUser: {
                    email: "",
                    password: "",
                    username: ""
                }
            };
        },
        mounted() {
            //checks for valid session
            // this.$store.dispatch("authenticate");
            this.$store.dispatch("getKeeps");
            this.scroll();
        },


        computed: {
            keeps() {
                return this.$store.state.keeps
            },
        },
        methods: {
            register() {
                this.$store.dispatch("register", this.newUser);
            },
            loginUser() {
                this.$store.dispatch("login", this.creds);
            },
            loginModal() {
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
            scroll() {
                var prevScrollpos = window.pageYOffset;
                window.onscroll = function () {
                    var currentScrollPos = window.pageYOffset;
                    if (prevScrollpos > currentScrollPos) {
                        document.getElementById("navbar").style.top = "0";
                    } else {
                        document.getElementById("navbar").style.top = "-62px";
                    }
                    prevScrollpos = currentScrollPos;
                }
            },
        },
        components: {
            Keep,
        }
    };
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

    .login {
        display: flex;
        /* align-content: flex-end; */
        text-align: center;
        text-decoration: none;
        font-size: 1.8vw;
        justify-content: center;
        /* text-align: center; */
        align-items: center;
    }

    .login:hover {
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
        background-color: lightgray;
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

    #keeps {
        margin-top: 120px;
    }
    button {
        background-color: #3498DB;
        color: white;
        margin: 5px;
        padding: 10px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        border-radius: 10px;
    }

    button:hover,
    button:focus {
        background-color: #2980B9;
    }
</style>