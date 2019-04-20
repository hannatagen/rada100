<template>
    <div class="adminProfileContainer">
        <div>
            <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
                <span class="navbar-brand">Minu andmed</span>
            </nav>
            <nav class="adminNavbar navbar navbar-expand-lg navbar-light">
                <button v-if="modifyDataModeActive"
                        class="navbarBtn btn btn-danger">Katkesta</button>
                <button v-else
                        @click="[modifyDataModeActive = true, ]"
                        class="navbarBtn btn btn-dark">Muuda andmeid</button>
                <button v-if="modifyDataModeActive"
                        class="navbarBtn btn btn-danger">Kustuta konto</button>
            </nav>
        </div>
        <div id="adminProfileCardContainer">
            <div class="card adminCard container">
                <img class="adminProfileImg card-img-top" src="../../assets/sbg2x-small.jpg" alt="Illustrative picture of a man in the forest.">
                <div class="card-body">
                    <div>
                        <h5 class="card-title">Nimi: </h5>
                        <span v-if="!modifyDataModeActive"> {{ username }} </span>
                        <input v-else v-model="username" type="text" class="form-control" aria-label="Name">
                    </div>
                    <br>
                    <div>
                        <h5 class="card-title">Email: </h5>
                        <span v-if="!modifyDataModeActive"> {{ email }} </span>
                        <input v-else v-model="email" type="email" class="form-control" aria-label="Name">
                    </div>
                    <div v-if="modifyDataModeActive">
                        <br>
                        <h5 class="card-title">Parool: </h5>
                        <input id="adminProfilePasswordInput" v-model="password" type="password" class="form-control" aria-label="Password">
                    </div>
                    <div v-if="modifyDataModeActive">
                        <br>
                        <h5 class="card-title">Korda parooli: </h5>
                        <input id="adminProfilePasswordRepeatInput" v-model="passwordRepeat" type="password" class="form-control" aria-label="Password repeat">
                    </div>
                    <br>
                    <div>
                        <h5 class="card-title">Roll: </h5>
                        {{ role }}
                    </div>
                    <br>
                    <button id="adminProfileSaveBtn"
                            v-if="modifyDataModeActive"
                            @click="[modifyDataModeActive = false, ]"
                            class="navbarBtn btn btnGreen">Salvesta</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'

    export default {
        name: "AdminProfile",
        data() {
            return {
                email: '',
                username: '',
                password: '',
                passwordRepeat: '',
                role: '',
                modifyDataModeActive: false,
            };
        },
        methods: {
            setEmail(username) {
                this.email = username;
            },
            setUsername(username) {
                this.username = username;
            },
            setRole(role) {
                this.role = role;
            },
        },
        mounted() {
            AXIOS.get('/api/users/information', {
                headers: {
                    Authorization: this.$store.state.loggedInToken,
                    'Content-Type': 'application/json',
                }
            }).then(request => {
                const email = request.data.email;
                const username = request.data.username;
                const role = request.data.role;

                this.setEmail(email);
                this.setUsername(username);
                this.setRole(role)
            }).catch(error => {
                console.log(error)
            });
        }
    }
</script>

<style scoped>
    .adminCard {
        /*left: 50%;*/
        width: fit-content;
        max-width: 20em !important;
        display: block;
    }

    .adminProfileContainer {
        text-align: left;
        overflow-x: scroll;
    }

    .adminProfileImg {
        height: 150px;
        width: 111%;
        margin-left: -1em;
        margin-top: -0.1em;
    }

    #adminProfileCardContainer {
        margin-top: 1em;
        padding-bottom: 2em;
        padding-left: 1em;
    }

    #adminProfileSaveBtn {
        margin-left: 35%;
    }
</style>
