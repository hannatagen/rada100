<template>
    <div>
        <AdminSidebar v-if="$route.name !== 'AdminLogin'"></AdminSidebar>
        <div id="contentContainer">
            <div>
                <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
                    <span class="navbar-brand">SadaRada halduskeskkond</span>
                </nav>
            </div>
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
        background-color: pink;
        /*top: 4em;*/
        left: 200px;
        margin-right: 0 !important;
        text-align: center;
        width: 100vw;
        height: 100vh;
    }

    @media only screen and (min-width: 700px) {
        #contentContainer {
            /*top: 4em;*/
            padding-right: 12em;
            left: 200px;
            width: 100vw;
        }
    }

    @media only screen and (max-width: 700px) {
        #contentContainer {
            /*top: 0;*/
            /*padding-left: 0.5em;*/
            left: 60px;
            display: inline-grid;
            padding-right: 4.5em;
        }
    }

    #greetingDiv {
        margin-top: 25vh;
    }
</style>
