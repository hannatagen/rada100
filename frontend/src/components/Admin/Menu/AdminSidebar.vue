<template>
    <nav id="adminSidebar">
        <div id="adminSidebarContent">
            <router-link class="adminHomeBtn routerLink"
                         :to="{ name : 'AdminMain'}"><i class="fas adminIcon fa-home"></i>
            <span class="adminSidebarBtnTitle">Pealeht</span>
            </router-link>
            <router-link class="adminHomeBtn routerLink"
                         :to="{ name : 'AdminProfile'}"><i class="fas adminIcon fa-user-circle"></i>
            <span class="adminSidebarBtnTitle">Minu konto</span>
            </router-link>
            <router-link class="adminHomeBtn routerLink"
                         :to="{ name : 'TrailsManagement'}"><i class="fas adminIcon fa-map-marked-alt"></i>
                <span class="adminSidebarBtnTitle">Rajad</span>
            </router-link>
            <router-link class="adminHomeBtn routerLink"
                         :to="{ name : 'TasksManagement'}"><i class="fas adminIcon fa-tasks"></i>
                <span class="adminSidebarBtnTitle">Ülesanded</span>
            </router-link>
            <router-link class="adminHomeBtn routerLink"
                         :to="{ name : 'ContentManagement'}"><i class="fas adminIcon fa-font"></i>
                <span class="adminSidebarBtnTitle">Sisu haldus</span>
            </router-link>
            <router-link class="adminHomeBtn routerLink"
                         :to="{ name : 'Languages'}"><i class="fas adminIcon fa-flag"></i>
                <span class="adminSidebarBtnTitle">Keeled</span>
            </router-link>
            <router-link class="adminHomeBtn routerLink"
                         :to="{ name : 'AdminManagement'}"><i class="fas adminIcon fa-users-cog"></i>
                <span class="adminSidebarBtnTitle">Administraatorid</span>
            </router-link>
            <router-link class="adminHomeBtn routerLink"
                         :to="{ name : 'UsersList'}"><i class="fas adminIcon fa-users"></i>
                <span class="adminSidebarBtnTitle">Mängijad</span>
            </router-link>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "AdminSidebar",
        methods: {
            closeSidebar() {
                document.getElementById('sidebar').style.visibility = 'hidden';
            },
        },
    };
</script>

<style scoped>

    #adminSidebar {
        background-color: darkgreen;
        overflow: scroll;
        width: 200px;
        height: 100vh;
        position: fixed;
        /*top: 4em;*/
        left: 0;
        /* top layer */
        z-index: 9999;
    }

    #adminSidebarContent {
        margin-top: 0.7em;
        display: grid;
    }

    .adminHomeBtn, .adminHomeBtn:hover {
        font-size: 1.5em;
        border: none !important;
        color: whitesmoke;
    }

    .adminIcon {
        text-align: center;
    }

    .adminHomeBtn:hover {
        background-color: #005600;
    }

    .adminSidebarBtnTitle {
        position: absolute;
        left: 0;
        font-size: 0.7em;
        margin-left: 3.5em;
        margin-top: 0.3em;
    }

    @media only screen and (max-width: 700px) {
        #adminSidebar {
            width: 60px;
            /*top: 0;*/
        }

        .adminSidebarBtnTitle {
            display: none;
        }
    }
</style>
