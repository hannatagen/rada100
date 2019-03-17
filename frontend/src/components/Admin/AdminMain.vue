<template>
    <div>
        <AdminSidebar v-if="$route.name !== 'AdminLogin'"></AdminSidebar>
        <div id="contentContainer">
            <div id="greetingDiv" v-if="$route.name === 'AdminMain'">
                <h1>Tere tulemast!</h1>
                <h4>Alustamiseks vali vasakult menüüst sobiv tegevus.</h4>
            </div>
            <router-view v-else/>
        </div>
    </div>
</template>

<script>
    import AdminSidebar from './Menu/AdminSidebar';

    export default {
        name: "AdminContent",
        components: { AdminSidebar }
    }
</script>

<style scoped>
    #contentContainer {
        position: fixed;
        top: 4em;
        left: 200px;
        margin-right: 0 !important;
        text-align: center;
        /*width: 80%;*/
        /*height: 1S00vh;*/
    }

    @media only screen and (max-width: 600px) {
        #contentContainer {
            top: 0;
            left: 60px;
        }
    }

    #greetingDiv {
        margin-top: 25vh;
    }
</style>
