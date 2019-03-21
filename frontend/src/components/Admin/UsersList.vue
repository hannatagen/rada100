<template>
    <div>
        <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light">
            <span class="navbar-brand">Mängijate nimekiri</span>
        </nav>
        {{users}}
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'

    export default {
        name: "UsersList",
        data() {
            return {
                // modifyModeActive: false,
                users: [],
            };
        },
        methods: {
            usersData(users) {
                this.users = users;
            },
        },
        mounted() {
            AXIOS.get('/api/users/')
                .then(response => {
                    // JSON responses are automatically parsed.
                    const users = response.data;
                    this.usersData(users);
                    console.log(users);
                })
                .catch(error => {
                    //eslint-disable-next-line
                    console.log(error)
                });
        }
    }
</script>

<style scoped>

</style>
