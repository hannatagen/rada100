<template>
    <div>
        <form id="loginform">
            <div class="form-group">
                <label for="exampleInputEmail1">Kasutajanimi</label>
                <input type="email" class="form-control" id="exampleInputEmail1"
                       placeholder="Sisesta kasutajanimi...">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Parool</label>
                <input type="password" class="form-control" id="exampleInputPassword1"
                       placeholder="Sisesta parool...">
            </div>
            <button v-if="!register" type="submit" class="btn btn-primary">Logi sisse</button>
            <br><br>
            <a href="#" v-if="!register" id="registerButton" class="card-link"
               @click="register = !register">Pole veel kasutajat? Registreeri kasutajaks.</a>
            <Register v-if="register"></Register>
        </form>
    </div>
</template>

<script>
    import Register from '../User/Register';

    export default {
        name: 'Login',
        components: {
            Register,
        },
        data() {
            return {
                register: false,
            };
        },
        mounted: {
            // eslint-disable-next-line
            beforeRouteLeave(to, from, next) {
                this.register = false;
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
</style>
