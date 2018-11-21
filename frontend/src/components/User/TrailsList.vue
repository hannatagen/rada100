<template>
    <div class="list-group">
        <div class="list-group-item text-dark trailName" v-for="trail in trailsList" :key="trail.trail_id">
            {{ trail.name }}
            <div class="list-group">
                <div class="list-group-item"> {{ trail.description }}</div>
            </div>
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
