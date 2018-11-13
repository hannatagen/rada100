<template>
    <div class="trail">
        <h1>Create Trail</h1>

        <h3>Just some database interaction...</h3>

        <input type="text" v-model="trail.name" placeholder="name">
        <input type="text" v-model="trail.description" placeholder="description">

        <button @click="createTrail()">Create Trail</button>

        <div v-if="showResponse"><h6>Trail created with Id: {{ response }}</h6></div>

        <button v-if="showResponse" @click="retrieveTrail()">Retrieve trail {{trail.id}} data from database</button>

        <h4 v-if="showRetrievedTrail">Retrieved Trail {{retrievedTrail.name}} {{retrievedTrail.name}}</h4>

    </div>
</template>

<script>
    import {AXIOS} from './http-common'

    export default {
        name: 'trail',

        data () {
            return {
                response: [],
                errors: [],
                user: {
                    name: '',
                    description: '',
                    id: 0
                },
                showResponse: false,
                retrievedTrail: {},
                showRetrievedTrail: false
            }
        },
        methods: {
            // Fetches posts when the component is created.
            createTrail () {
                var params = new URLSearchParams()
                params.append('name', this.trail.name)
                params.append('description', this.trail.description)

                AXIOS.post('/api/trails/', params)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.response = response.data
                        this.trail.id = response.data
                        console.log(response.data)
                        this.showResponse = true
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
            retrieveTrail () {
                AXIOS.get('/api/trails/' + this.trail.id)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.retrievedTrail = response.data
                        console.log(response.data)
                        this.showRetrievedTrail = true
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        }
    }

</script>
