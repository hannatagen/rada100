<template>
    <div>
       <form id="loginform"> <!--@submit.prevent="login">-->
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
                <input required v-model="passwordRepeat"  type="password" class="form-control" id="exampleInputPassword2"
                       placeholder="Sisesta parool...">
                <button class="btn btn-primary" @click="registerUser">Registreeri</button>
            </div>
        </form>
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
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            },
            loginUser() {
                console.log('login');
                AXIOS.post('/login', {username: this.email, password: this.password}) // TODO username : email
                    .then(request => {
                        console.log('login user: ');
                        console.log(request);
                        this.loginSuccessful(request)
                        //const token = request.headers.authorization;
                        //console.log('login bearer token', token);
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            loginSuccessful(req) {
                console.log('loginsuccessful', req);
                if (!req.data.token) {
                    this.loginFailed();
                    return
                }
                console.log('store commit');
                this.$store.commit('setUserTokenID', req.data.token);
            },
            loginFailed () {
                console.log('Login failed!')
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
        /*color: royalblue;*/
    }
    #registerContainer {
        margin-top: -3em;
    }
</style>
