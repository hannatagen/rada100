<template>
    <div>
        <h3 class="sidebarHeadline">Radade nimekiri</h3>
        <div>
            <p>
                Klikkides sobival rajal, kuvatakse kaardil ainult
                selle raja punktid.
            </p>
        </div>
        <div class="card">
            <div class="card-header allTrailsCard">
                Kuva kaardil kõik rajad
            </div>
        </div>
        <div class="card" v-for="trail in trailsList" :key="trail.trailId">
            <div class="card-header">
                {{ trail.name }}
            </div>
            <ul class="list-group">
                <li class="list-group-item"> {{ trail.description }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'

    export default {
        name: 'TrailsList',
        data() {
            return {
                trailsList: [],
            };
        },
        methods: {
            trailsData(trails) {
                this.trailsList = trails;
            },
        },
        mounted() {
            AXIOS.get('/api/trails/')
                .then(response => {
                    // JSON responses are automatically parsed.
                    const trails = response.data;
                    this.trailsData(trails);
                })
                .catch(error => {
                    console.log(error)
                });
        },
    };
</script>

<style scoped>
    .card {
        cursor: pointer;
        margin-bottom: 1em;
    }

    .card-header {
        font-weight: bolder;
    }

    .allTrailsCard {
        background-color: darkgreen;
        color: white;
    }
</style>
