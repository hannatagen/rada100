<template>
    <div class="list-group">
        <div class="list-group-item text-dark trailName" v-for="trail in trailsData" :key="trail.id">
            {{ trail.name }}
            <div class="list-group">
                <div class="list-group-item"> {{trail.desc}}</div>
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
            trailsData(trails) {
                console.log('tratestils',trails);
                return trails;
            },
        },
        mounted() {
            // this.initTrailsPoints(); // for localhost frontend testing only
            AXIOS.get('/api/trails/')
                .then(response => {
                    // JSON responses are automatically parsed.
                    const trails = response.data;
                    console.log('trailssin',trails);
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
