<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>HelloWorld</p>
  </div>
</template>

<script>
    import {AXIOS} from './http-commons'

    export default {
        name: 'hello',

        data () {
            return {
                posts: [],
                errors: []
            }
        },
        methods: {
            // Fetches posts when the component is created.
            callRestService () {
                AXIOS.get(`hello`)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.posts = response.data
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
