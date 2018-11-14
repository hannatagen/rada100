<template>
    <div class="list-group">
        <div class="list-group-item text-dark trailName" v-for="trail in trailsData" :key="trail.trail_id">
            {{ trail.name }}
            <div class="list-group">
                <div class="list-group-item"> {{trail.description}}</div>
                <div class="playButton">Mängima <i class="fas fa-play"></i></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'

    export default {
        name: 'TrailsList',
        computed: {
            trailsData() {
                let trailsList;

                AXIOS.get('/api/trails/')
                    .then(response => {
                        // JSON responses are automatically parsed.
                        console.log(response.data);
                        trailsList = response.data;
                    })
                    .catch(error => {
                        console.log(error)
                    });

                console.log(trailsList);

                for (let trail in trailsList) {
                    console.log(trail.trail_id);
                    console.log(trail.name);
                    console.log(trail.description);
                }

                return trailsList;
            },
        },
    };
</script>

<style scoped>
    .trailName {
        cursor: pointer;
    }
</style>
