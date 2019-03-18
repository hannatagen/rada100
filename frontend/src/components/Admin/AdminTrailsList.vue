<template>
    <div class="container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nimetus</th>
                    <th>Kirjeldus</th>
                    <th>Punkte</th>
                    <th>Muuda</th>
                    <th>Kustuta</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="trail in trailsList" :key="trail.trailId">
                    <th>{{ trail.trailId }}</th>
                    <th>{{ trail.name }}</th>
                    <th>{{ trail.description }}</th>
                    <th>{{  }}</th>
                    <th><i class="editTrailBtn fas fa-edit"></i></th>
                    <th><i class="deleteTrailBtn fas fa-trash-alt"></i></th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'

    export default {
        name: "AdminTrailsList",
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
    }
</script>

<style scoped>
 .deleteTrailBtn {
     color: #a40000;
 }

.editTrailBtn {
    color: darkgreen;
}
</style>
