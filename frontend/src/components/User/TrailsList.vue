<template>
    <div>
        <h3 class="sidebarHeadline">Radade nimekiri</h3>
        <div>
            <p>
                Klikkides sobival rajal, kuvatakse kaardil ainult
                selle raja punktid.
            </p>
        </div>
        <input v-model="search" class="form-control" placeholder="Otsi...">
        <br>
        <div class="card trailsListCard">
            <div @click="trailClicked(null)" class="card-header allTrailsCard">
                Kuva kaardil kõik rajad
            </div>
            <table class="trailsListTable table table-striped">
                <tbody>
                <tr class="trailsListTableRow"
                    @click="trailClicked(trail.trailId)"
                    v-for="trail in trailsList" :key="trail.trailId">
                    <td>{{ trail.name }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { AXIOS } from './.././http-common'
    import { serverBus } from '../../main';

    export default {
        name: 'TrailsList',
        data() {
            return {
                trailsListOriginal: [],
                trailsList: [],
                sortKey: '',
                reverse: false,
                search: ''
            };
        },
        watch: {
            search: function (val) {
                this.trailsList = this.trailsListOriginal.filter(trail => trail.name.toLowerCase().includes(val.toLowerCase(),0) || trail.description.toLowerCase().includes(val.toLowerCase(),0))
            }
        },
        methods: {
            sortByName() {
                this.reverse = (this.sortKey === 'name') ? ! this.reverse : false;
                this.trailsList.sort(function (a,b) {
                    let trailA = a,
                        trailB = b;
                    if (trailA.name < trailB.name) return -1;
                    if (trailA.name > trailB.name) return 1;
                    return 0;
                });
                if (this.reverse) this.trailsList.reverse();
                this.sortKey = 'name';
            },
            sortByDesc() {
                this.reverse = (this.sortKey === 'description') ? ! this.reverse : false;
                this.trailsList.sort(function (a,b) {
                    let trailA = a,
                        trailB = b;
                    if (trailA.description < trailB.description) return -1;
                    if (trailA.description > trailB.description) return 1;
                    return 0;
                });
                if (this.reverse) this.trailsList.reverse();
                this.sortKey = 'description';
            },
            trailsData(trails) {
                this.trailsList = trails;
                this.trailsListOriginal = trails;
            },
            trailClicked(trailId) {
                // console.log('trailslist',trailId);
                serverBus.$emit('trailSelected', trailId);
            }
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
    };
</script>

<style scoped>
    .card {
        cursor: pointer;
        margin-bottom: 1em;
    }

    .card-header {
        font-weight: bolder;
    }

    .allTrailsCard {
        background-color: darkgreen;
        color: white;
    }

    .trailsListTableRow {
        cursor: pointer;
    }

    .trailsListTableRow:hover {
        background-color: whitesmoke;
    }

    .trailsListTable {
        background-color: rgba(245, 245, 245, 0.55);
    }

    .trailsListCard {
        background-color: transparent !important;
        border: none !important;
    }
</style>
