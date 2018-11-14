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
    import trailsData2 from '../../data/trailsData';
    import { AXIOS } from './.././http-common'

    export default {
        name: 'TrailsList',
        trailsDataList: [],
        computed: {
            trailsData() {
                console.log('halloo');
                AXIOS.get('/api/trails/')
                    .then(response => {
                        // JSON responses are automatically parsed.
                        console.log(response.data);
                        this.trailsDataList =  response.data;
                    })
                    .catch(error => {
                        console.log(error)
                    });

                return this.trailsDataList;
            },
        },
    };
</script>

<style scoped>
    .trailName {
        cursor: pointer;
    }
</style>
