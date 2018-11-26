<template>
    <div>
        <!--<div v-if="$store.state.loggedInToken" class="card">-->
        <div class="card">
            <div class="card-body">
                <img class="card-img-top" src="../../assets/user_default.png" alt="Profile picture">
                <h5 class="card-title">{{ username }}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <strong>Tase:</strong>
                    <span id="level">3</span>
                </li>
                <li class="list-group-item">
                    <h6 class="card-title">Pooleliolevad mängud:</h6>
                </li>
                <li class="list-group-item">
                    <h6 class="card-title">Lõpetatud mängud:</h6>
                </li>
            </ul>
        </div>
        <!--<div v-else class="container">-->
            <!--See lehekülg on ainult sisselogitud kasutajatele.-->
        <!--</div>-->
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'

    export default {
        name: 'Profile',
        data() {
            return {
                username: '',
            };
        },
        methods: {
            setUsername(username) {
                this.username = username;
            },
        },
        mounted() {
            AXIOS.get('/api/users/information', {
                headers: {
                    Authorization: this.$store.state.loggedInToken,
                    'Content-Type': 'application/json',
                }
            }).then(request => {
                console.log(request.data);
                const username = request.data.username;
                console.log(username);
                this.setUsername(username);
            }).catch(error => {
                console.log(error)
            });
        },
    };
</script>

<style scoped>
    .card-img-top {
        width: 8em !important;
    }

    .card-body {
        text-align: center;
    }

    .card {
        color: black;
    }

    #level {
        float: right;
    }
    .card-title {
        font-weight: bold;
    }
</style>
