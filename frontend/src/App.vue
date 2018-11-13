<template>
  <div id="app">
    <Admin v-if="(this.$route.path).includes('admin')"></Admin>
    <div v-else>
      <User></User>
      <Map></Map>
    </div>
  </div>
</template>

<script>

    import User from './components/User';
    import Admin from './components/Admin';
    import Map from './components/User/Map';

    export default {
        name: 'App',
        components: {
            User,
            Admin,
            Map,
        },
    };
</script>

<style>
  * {
    font-family: Lato,serif;
  }

  #app {
    font-family: 'Lato', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .button {
    min-width: unset !important;
  }

  #sidebar {
    background-image: url('./assets/sbg6.jpg') !important;
    background-position: bottom;
    background-size: cover;
    max-width: 300px !important;
    /*background-color: #ffc107;*/
    z-index: 2000 !important;
  }

  .bm-burger-button {
    z-index: 1100;
    left: 0 !important;
    top: 0 !important;
    margin-left: 2em;
    margin-top: 1.2em;
  }

  .ol-zoom {
    top: 5em;
    left: unset !important;
    right: 0.8em !important;
  }

  .ol-control button {
    background-color: rgba(0, 0, 0, 0.5) !important;
    border: none !important;
    outline: none !important;
  }

  .ol-control button:hover {
    background-color: rgba(0, 0, 0, 0.6) !important;
  }

  @media only screen and (max-width: 600px) {
    .ol-zoom {
      visibility: hidden;
    }
  }

  .routerLink {
    text-decoration: none !important;
    font-weight: bolder;
    color: black;
    padding-left: 1.5em;
    margin-bottom: 0.4em;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
  }
  .routerLink:hover {
    color: darkgreen;
  }
</style>
