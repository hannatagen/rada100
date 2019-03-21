<template>
    <div>
        <div v-if="$store.state.loggedInToken" class="card">
        <!--<div class="card">-->
            <div class="card-body">
                <h5>
                    Profiil:
                    <router-link id="settingsBtn" class="routerLink" :to="{ name : 'Settings'}">
                        <i class="fas fa-cog cogIcon"></i>
                    </router-link>
                </h5>
                <br>
                <strong class="card-title">Kasutajanimi: </strong>
                <div> hannatagen{{ username }}</div>
                <br>
                <strong class="card-title">Email: </strong>
                <div> hanna.tagen@gmail.com{{ email }}</div>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <h6 class="card-title">Pooleliolevad mängud:</h6>
                </li>
                <li class="list-group-item">
                    <h6 class="card-title">Lõpetatud mängud:</h6>
                    <div v-if="completedTrailsList.length > 0">
                        <div v-for="trail in completedTrailsList" :key="trail.trailId">
                            {{ trail.name }}
                        </div>
                    </div>
                    <div v-else>Ühtegi mängu pole lõpetatud.</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'

    export default {
        name: 'Profile',
        data() {
            return {
                username: '',
                trailsList: [],
                completedTrailsList: [],
            };
        },
        methods: {
            setUsername(username) {
                this.username = username;
            },
            trailsData(trails) {
                this.trailsList = trails;
            },
            completedTrails() {
                for (const trail in this.trailsList) {
                    AXIOS.get('/api/games/' + trail.trailId + '/ended')
                        .then(response => {
                            // JSON responses are automatically parsed.
                            const isCompleted = response.data;
                            if(isCompleted) {
                                this.completedTrailsList.push(trail);
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        });
                }
            }
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

            AXIOS.get('/api/trails/')
                .then(response => {
                    // JSON responses are automatically parsed.
                    const trails = response.data;
                    this.trailsData(trails);
                })
                .catch(error => {
                    console.log(error)
                });

            this.completedTrails();
        },
    };
</script>

<style scoped>
    .card-body {
        text-align: left;
    }
    .card {
        color: black;
    }
    .card-title {
        font-weight: bold;
    }
    .cogIcon {
        float: right;
        margin-top: 0.2em;
        cursor: pointer;
    }
    #settingsBtn {
        border: none;
    }
</style>
