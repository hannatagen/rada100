<template>
    <div class="card">
        <div class="card-header">
            <h5 class="list-group-item card-title" v-for="trail in trailsList" :key="trail.trail_id">
            {{ trail.name }}
            </h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"> {{ trail.description }}</li>
        </ul>
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
            // this.initTrailsPoints(); // for localhost frontend testing only
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
    .trailName {
        cursor: pointer;
    }
</style>
