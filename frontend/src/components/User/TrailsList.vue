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
            trailsData() {
                let trailsList = [];

                AXIOS.get('/api/trails/')
                    .then(response => {
                        // JSON responses are automatically parsed.
                        console.log(response.data);
                        trailsList = response.data;

                        for (let i = 0; response.data.length; i++) {
                            trailsList.push({
                                id:     response.data[i].trail_id,
                                name:   response.data[i].name,
                                desc:   response.data[i].description,
                            });
                        }
                        console.log(trailsList);
                        console.log(trailsList.id);
                        console.log(trailsList.name);
                        console.log(trailsList.desc);
                    })
                    .catch(error => {
                        console.log(error)
                    });
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
