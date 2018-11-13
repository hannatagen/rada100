<template>
    <div id="registerContainer">
        <div class="form-group">
            <label for="exampleInputPassword1">Korda parooli</label>
            <input type="password" class="form-control" id="exampleInputPassword1"
                   placeholder="Sisesta parool...">
        </div>
        <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input type="email" class="form-control" id="exampleInputEmail1"
                   placeholder="Sisesta email...">
        </div>
        <button type="submit" class="btn btn-primary" @click="addToAPI">Registreeri</button>
    </div>
</template>

<script>
    import axios from 'axios';
    // import * as MongoClient from 'mongodb/lib/mongo_client';


    export default {
        name: 'Register',
        data() {
            return {
                User: {
                    name: '',
                    username: '',
                    age: '',
                },
            };
        },
        methods: {
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
    #registerContainer {
        margin-top: -3em;
    }
</style>
