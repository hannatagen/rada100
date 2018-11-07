<template>
    <div class="list-group">
        <div class="list-group-item text-dark trailName" v-for="trail in trailsData" :key="trail.id">
            {{ trail.name }}
            <div class="list-group">
                <div class="list-group-item"> {{trail.description}}</div>
                <div class="playButton">Mängima <i class="fas fa-play"></i></div>
            </div>
        </div>
    </div>
</template>

<script>
    import trailsData from '../../data/trailsData';

    export default {
        name: 'TrailsList',

        computed: {
            trailsData() {
                return trailsData;
            },
        },
    };
</script>

<style scoped>
    .trailName {
        cursor: pointer;
    }
</style>
