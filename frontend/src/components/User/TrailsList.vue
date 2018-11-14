<template>
    <div class="list-group">
        <div class="list-group-item text-dark trailName" v-for="trail in trailsData" :key="trail[0]">
            {{ trail[1] }}
            <div class="list-group">
                <div class="list-group-item"> {{trail[2]}}</div>
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
                let trailsList = [];

                AXIOS.get('/api/trails/')
                    .then(response => {
                        // JSON responses are automatically parsed.
                        console.log(response.data);
                        trailsList = response.data;

                        for (var i = 0; response.data.length; i++) {
                            trailsList.push([response.data[i].trail_id,response.data[i].name,response.data[i].description]);
                        }

                        return trailsList;
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
        },
    };
</script>

<style scoped>
    .trailName {
        cursor: pointer;
    }
</style>
