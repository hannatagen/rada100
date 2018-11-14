<template>
    <div class="list-group">
        <div class="list-group-item text-dark trailName" v-for="trail in trailsList" :key="trail.id">
            {{ trail.name }}
            <div class="list-group">
                <div class="list-group-item"> {{trail.description}}</div>
                <div v-if="$store.state.loggedInToken" class="playButton">Mängima <i class="fas fa-play"></i></div>
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
                console.log('tratestils',trails);
                this.trailsList = trails;
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
