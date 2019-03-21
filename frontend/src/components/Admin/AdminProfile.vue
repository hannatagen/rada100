<template>
    <div class="adminProfileContainer">
        <div>
            <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
                <span class="navbar-brand">Minu andmed</span>
            </nav>
            <nav class="adminNavbar navbar navbar-expand-lg navbar-light">
                <button :disabled="modifyDataModeActive"
                        @click="[modifyDataModeActive = true, ]"
                        class="navbarBtn btn btn-dark">Muuda andmeid</button>
                <button v-if="modifyDataModeActive"
                        class="navbarBtn btn btn-danger">Kustuta konto</button>
            </nav>
        </div>
        <div class="card adminCard">
            <div class="card-body">
                <div>
                    <strong class="card-title">Nimi: </strong>
                    {{ username }}
                </div>
                <br>
                <div>
                    <strong class="card-title">Email: </strong>
                    {{ email }}
                </div>
                <br>
                <div>
                    <strong class="card-title">Staatus: </strong>
                    {{ authorizationLevel }}
                </div>
                <br>
                <button v-if="modifyDataModeActive"
                        @click="[modifyDataModeActive = false, ]"
                        class="navbarBtn btn btnGreen">Salvesta</button>
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
                email: 'marike@gmail.com',
                username: 'Mari Sarv',
                password: '',
                authorizationLevel: 'SuperAdmin',
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
        },
        mounted() {
            AXIOS.get('/api/users/information', {
                headers: {
                    Authorization: this.$store.state.loggedInToken,
                    'Content-Type': 'application/json',
                }
            }).then(request => {
                console.log(request.data);
                const email = request.data.email;
                const username = request.data.username;

                this.setEmail(email);
                this.setUsername(username);
            }).catch(error => {
                console.log(error)
            });
        }
    }
</script>

<style scoped>
    .adminCard {
        /*left: 50%;*/
        max-width: 20em !important;
    }

    .adminProfileContainer {
        text-align: left;
    }
</style>
