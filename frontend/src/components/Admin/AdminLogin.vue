<template>
    <div id="adminLoginContainer">
        <br>
        <br>
        <h3 id="adminLoginTitle">SadaRada halduskeskkond</h3>
        <div class="container subAdminLoginContainer">
            <div class="form-group">
                <label for="inputAdminName">Email</label>
                <input type="text" class="form-control" id="inputAdminName"
                       placeholder="Sisesta email..."
                       v-model="email">
            </div>
            <div class="form-group">
                <label for="inputAdminPassword">Parool</label>
                <input type="password" class="form-control" id="inputAdminPassword"
                       placeholder="Sisesta parool..."
                       v-model="password">
            </div>
            <button @click="loginUser()" class="btn btnGreen loginAdminButton">Logi sisse</button>
        </div>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'

    export default {
        name: 'AdminLogin',
        data() {
            return {
                email: '',
                password: '',
            };
        },
        methods: {
            loginUser() {
                AXIOS.post('/login', {username: this.email, password: this.password}) // TODO username : email
                    .then(request => {
                        this.loginSuccessful(request);
                    })
                    .catch(error => {
                        //eslint-disable-next-line
                        console.log(error);
                        document.getElementById('inputAdminName').style.border = 'red 2px solid';
                        document.getElementById('inputAdminPassword').style.border = 'red 2px solid'
                    })
            },
            loginSuccessful(req) {
                if (!req.headers.authorization) {
                    this.loginFailed();
                    return
                }
                console.log('login success');
                this.$store.commit('setUserTokenID', req.headers.authorization);
                this.$router.push('/admin/main')
            },
            loginFailed () {
                //eslint-disable-next-line
                console.log('Login failed!')
            },
        }
    };
</script>

<style scoped>
    #adminLoginContainer {
        /*top: 10em !important;*/
        height: 100% !important;
        width: 100vw !important;
        /*position: fixed;*/
    }

    .subAdminLoginContainer {
        width: 20em !important;
        margin-top: 10vh !important;
        text-align: left;
    }

    .loginAdminButton {
        margin-left: 35%;
    }
</style>
