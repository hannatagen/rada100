<template>
    <div>
        <!--&lt;!&ndash;<div v-if="$store.state.loggedInToken" class="card">&ndash;&gt;-->
        <div class="card">
            <div class="card-body">
                <h5>
                    Seaded:
                    <router-link id="backBtn" class="routerLink" :to="{ name : 'Profile'}">
                        <i class="fas fa-arrow-left backIcon"></i>
                    </router-link>
                </h5>
                <div v-if="changeSuccess"  id="changeSuccess">Salvestatud!</div>
                <div v-else>
                    <br>
                    <br>
                </div>
                <div class="form-group">
                    <label for="exampleInputUName">Kasutajanimi</label>
                    <input v-model="username" type="text" class="form-control" id="exampleInputUName"
                           placeholder="kasutajanimi">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1"
                           placeholder="email@email.com">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Uus parool</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1"
                           placeholder="parool">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword2">Korda parooli</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword2"
                           placeholder="parool">
                </div>
                <button @click="changeSuccess = !changeSuccess" class="btn btnGreen" type="submit">Salvesta</button>
                <br>
                <button class="btn btn-danger loginRegButton" type="submit">Kustuta konto</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Settings",
        data() {
            return {
                email: '',
                username: '',
                password: '',
                passwordRepeat: '',
                changeSuccess: false,
            };
        },
        methods:    {
            saveBtnAction() {
            }
        }
    }
</script>

<style scoped>
    .backIcon, #backBtn {
        float: right;
        border: none;
    }

    .loginRegButton {
        margin-top: 2em;
    }

    #changeSuccess {
        margin-top: 1em;
        margin-bottom: 1em;
        font-weight: bold;
    }

    .pwdMatchError {
        border: red 2px solid;
    }
</style>
