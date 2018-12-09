<template>
    <form>
       <div id="loginform" v-if="!$store.state.loggedInToken">
            <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input required v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                       placeholder="Sisesta email...">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Parool</label>
                <input required v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                       placeholder="Sisesta parool...">
            </div>
            <button v-if="!register" @click="loginUser" class="btn btn-primary loginRegButton" type="submit">Logi sisse</button>
            <br><br>
            <a href="#" v-if="!register" id="registerButton" class="card-link"
               @click="register = !register">Pole veel kasutajat? Registreeri kasutajaks.</a>
            <div v-else id="registerContainer">
                <label for="exampleInputPassword2">Korda parooli</label>
                <input required v-model="passwordRepeat" type="password" class="form-control" id="exampleInputPassword2"
                       placeholder="Sisesta parool...">
                <div class="form-group input-group mb-3 acceptDiv">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input class="acceptCheckBox" required type="checkbox">
                        </div>
                    </div>
                    <div class="acceptText form-control"> Olen teadlik, et registreerudes annan Eesti Kirjandusmuuseumile loa enda andmete ning läbitud mängudes kogutud info
                        kasutamiseks ja arhiveerimiseks. </div>
                </div>
                <button class="btn btn-primary loginRegButton" @click="registerUser" type="submit">Registreeri</button>
            </div>
       </div>
    </form>
</template>

<script>
    import { AXIOS } from './.././http-common'

    export default {
        name: 'Login',
        data() {
            return {
                register: false,
                email: '',
                username: '',
                password: '',
                passwordRepeat: '',
            };
        },
        mounted: {
            beforeRouteLeave(to, from, next) {
                this.register = false;
                next()
            },
        },
        methods: {
            registerUser() {
                if (this.password === this.passwordRepeat) {
                    console.log('register');
                    AXIOS.post('/api/register', {username: this.email, password: this.password, email: this.email}) // TODO username : email
                        .then(request => {
                            console.log('registered user: ', {
                                username: this.email,
                                password: this.password,
                                email: this.email
                            });
                            console.log(request);
                            this.register = false;
                            this.$router.push('/login')
                        })
                        .catch(error => {
                            console.log(error)
                        })
                } else {
                    document.getElementById('exampleInputPassword1').style.border = 'red 2px solid';                    document.getElementById('exampleInputPassword1').style.border = 'red 2px solid';
                    document.getElementById('exampleInputPassword2').style.border = 'red 2px solid';
                    document.getElementById('acceptCheckBox').style.border = 'red 2px solid';
                }
            },
            loginUser() {
                AXIOS.post('/login', {username: this.email, password: this.password}) // TODO username : email
                    .then(request => {
                        console.log('login user: ');
                        this.loginSuccessful(request);
                    })
                    .catch(error => {
                        console.log(error);
                        document.getElementById('exampleInputEmail1').style.border = 'red 2px solid';
                        document.getElementById('exampleInputPassword1').style.border = 'red 2px solid'
                    })
            },
            loginSuccessful(req) {
                if (!req.headers.authorization) {
                    this.loginFailed();
                    return
                }
                console.log('store commit');
                this.$store.commit('setUserTokenID', req.headers.authorization);
                this.$router.push('/')
                // this.$router.replace(this.$route.query.redirect || '/authors')
            },
            loginFailed () {
                console.log('Login failed!')
                // this.error = 'Login failed!'
                //delete localStorage.token
            },
        },
    };
</script>

<style scoped>
    #loginform {
        color: black;
    }
    #registerButton {
        cursor: pointer;
    }
    #registerContainer {
        margin-top: -3em;
    }

    .loginRegButton {
        margin-top: 2em;
    }

    .acceptText {
        height: auto !important;
    }

    .acceptDiv {
        margin-top: 1em;
    }
</style>
