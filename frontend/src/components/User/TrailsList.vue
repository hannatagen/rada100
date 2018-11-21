<template>
    <div class="list-group">
        <div class="list-group-item text-dark trailName" v-for="trail in trailsList" :key="trail.trail_id">
            {{ trail.name }}
            <div class="list-group">
                <div class="list-group-item"> {{ trail.description }}</div>
            </div>
        </div>
    </div>
    <!--<div class="card" v-for="trail in trailsList" :key="trail.trail_id">-->
        <!--&lt;!&ndash;<div class="card-header">&ndash;&gt;-->
            <!--{{ trail.name }}-->
            <!--&lt;!&ndash;&lt;!&ndash;<h5 class="list-group-item card-title">&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;</h5>&ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<ul class="list-group">&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="list-group-item"> {{ trail.description }}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;</ul>&ndash;&gt;-->
    <!--</div>-->
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
    .card {
        cursor: pointer;
        margin-bottom: 1em;
    }
</style>
