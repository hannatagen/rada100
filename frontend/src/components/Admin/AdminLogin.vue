<template>
    <div id="adminLoginContainer">
        <br>
        <h3>SadaRada halduskeskkond</h3>
        <div class="container subAdminLoginContainer">
            <div class="form-group">
                <label for="exampleInputAdminName">Kasutajanimi</label>
                <input type="text" class="form-control" id="exampleInputAdminName"
                       placeholder="Sisesta kasutajanimi...">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Parool</label>
                <input type="password" class="form-control" id="exampleInputPassword1"
                       placeholder="Sisesta parool...">
            </div>
            <button @click="adminLogin()" class="btn loginAdminButton">Logi sisse</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AdminLogin',
        methods: {
            adminLogin() {
                this.$store.commit('setAdminTokenID', true);
                this.$router.replace('/admin/main')
            }
        }
    };
</script>

<style scoped>
    #adminLoginContainer {
        /*top: 10em !important;*/
        /*height: 100% !important;*/
        /*width: 100% !important;*/
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
