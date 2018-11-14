<template>
    <div>
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
            <button v-if="!register" @click="loginUser" class="btn btn-primary">Logi sisse</button>
            <br><br>
            <a href="#" v-if="!register" id="registerButton" class="card-link"
               @click="register = !register">Pole veel kasutajat? Registreeri kasutajaks.</a>
            <div v-else id="registerContainer">
                <label for="exampleInputPassword2">Korda parooli</label>
                <input required v-model="passwordRepeat" type="password" class="form-control" id="exampleInputPassword2"
                       placeholder="Sisesta parool...">
                <button class="btn btn-primary" @click="registerUser">Registreeri</button>
            </div>
       </div>
        <div id="logoutForm" v-if="$store.state.loggedInToken">
            <button class="btn btn-primary" @click="logout">Logi välja</button>
        </div>
    </div>
</template>

<script>
    import Register from '../User/Register';
    import { AXIOS } from './.././http-common'

    export default {
        name: 'Login',
        components: {
            Register,
        },
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
            // eslint-disable-next-line
            beforeRouteLeave(to, from, next) {
                this.register = false;
            },
        },
        methods: {
            login: function () {
                const { email, password } = this;
                this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
                    this.$router.push('/')
                });
            },
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
                    document.getElementById('exampleInputPassword1').style.border = 'red 2px solid'
                    document.getElementById('exampleInputPassword2').style.border = 'red 2px solid'
                }
            },
            loginUser() {
                AXIOS.post('/login', {username: this.email, password: this.password}) // TODO username : email
                    .then(request => {
                        console.log('login user: ');
                        this.loginSuccessful(request);
                    })
                    .catch(error => {
                        console.log(error)
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
            logout() {
                this.$store.commit('setUserTokenID', null);
                this.$router.push('/')
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
        /*color: royalblue;*/
    }
    #registerContainer {
        margin-top: -3em;
    }
</style>
