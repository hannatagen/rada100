<template>
    <div>
       <div id="loginform" v-if="!$store.state.loggedInToken">
           <div v-if="registerSuccess" id="registerSuccess">Registreerimine õnnestus!</div>
           <div class="form-group">
               <label for="exampleInputUName1">Kasutajanimi</label>
               <input v-model="username" type="text" class="form-control" id="exampleInputUName1"
                      placeholder="Sisesta kasutajanimi...">
           </div>
           <div class="form-group" v-if="register">
                <label for="exampleInputEmail1">Email</label>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                       placeholder="Sisesta email...">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Parool</label>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                       placeholder="Sisesta parool...">
            </div>
            <button v-if="!register" @click="loginUser()" class="btn btnGreen loginRegButton" type="submit">Logi sisse</button>
            <br><br>
            <a href="#" v-if="!register" id="registerButton" class="card-link"
               @click="register = !register">Pole veel kasutajat? Registreeri kasutajaks.</a>
            <div v-else id="registerContainer">
                <label for="exampleInputPassword2">Korda parooli</label>
                <input v-model="passwordRepeat" type="password"
                       :class="{pwdMatchError: password !== passwordRepeat}"
                       class="form-control" id="exampleInputPassword2"
                       placeholder="Sisesta parool...">
                <div class="form-group input-group mb-3 acceptDiv">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input class="acceptCheckBox" v-model="checkBox" type="checkbox">
                        </div>
                    </div>
                    <div class="acceptText form-control"> Olen teadlik, et registreerudes annan Eesti Kirjandusmuuseumile loa enda andmete ning läbitud mängudest kogutud info
                        kasutamiseks ja arhiveerimiseks. </div>
                </div>
                <button :disabled="password !== passwordRepeat || !checkBox || email.length === 0"
                        class="btn btnGreen loginRegButton" @click="registerUser">Registreeri</button>
            </div>
       </div>
    </div>
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
                checkBox: '',
                registerSuccess: false,
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
                console.log('register');
                AXIOS.post('/api/register', {username: this.username, password: this.password, email: this.email}) // TODO username : email
                    .then(request => {
                        console.log('registered user: ', {
                            username: this.email,
                            password: this.password,
                            email: this.email
                        });
                        console.log(request);
                        this.register = false;
                        this.registerSuccess = true;
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            loginUser() {
                AXIOS.post('/login', {username: this.username, password: this.password}) // TODO username : email
                    .then(request => {
                        console.log('login user: ');
                        this.loginSuccessful(request);
                    })
                    .catch(error => {
                        console.log(error);
                        document.getElementById('exampleInputUName1').style.border = 'red 2px solid';
                        document.getElementById('exampleInputPassword1').style.border = 'red 2px solid'
                    })
            },
            loginSuccessful(req) {
                if (!req.headers.authorization) {
                    this.loginFailed();
                    return
                }
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
        color: darkgreen;
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

    #registerSuccess {
        margin-top: 1em;
        margin-bottom: 1em;
        font-weight: bold;
    }

    .pwdMatchError {
        border: red 2px solid;
    }

</style>
