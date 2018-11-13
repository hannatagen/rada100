<template>
    <div>
        <form id="loginform" @submit.prevent="login">
            <div class="form-group">
                <label for="exampleInputEmail1">Kasutajanimi</label>
                <input required v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                       placeholder="Sisesta kasutajanimi...">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Parool</label>
                <input required v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                       placeholder="Sisesta parool...">
            </div>
            <button v-if="!register" type="submit" class="btn btn-primary">Logi sisse</button>
            <br><br>
            <a href="#" v-if="!register" id="registerButton" class="card-link"
               @click="register = !register">Pole veel kasutajat? Registreeri kasutajaks.</a>
            <div v-else id="registerContainer">
                <label for="exampleInputPassword2">Korda parooli</label>
                <input required v-model="password"  type="password" class="form-control" id="exampleInputPassword2"
                       placeholder="Sisesta parool...">
                <button type="submit" class="btn btn-primary" @click="addToAPI">Registreeri</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Login',
        components: {
            Register,
        },
        data() {
            return {
                register: false,
                // User: {
                //     name: '',
                //     username: '',
                //     age: '',
                // },
                email: '',
                username: '',
                password: '',
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
            addToAPI() {
                const newUser = {
                    name: this.User.name,
                    username: this.User.username,
                    age: this.User.age,
                };
                // eslint-disable-next-line no-console
                console.log(newUser);
                // new MongoClient().connect('mongodb://AdminEKM:SadaRadaProjekt2018@sadarada.ml', (err, db) => {
                //   console.log(db);
                //   console.log(err);
                // });
                //
                axios.post('https://sadarada.ml:27017/test', newUser)
                    .then((response) => {
                        // eslint-disable-next-line no-console
                        console.log(response);
                    })
                    .catch((error) => {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    });
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
