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

  .bm-menu {
    background-image: url('./assets/sbg6.jpg') !important;
    background-position: bottom;
    background-size: cover;
    /*background-color: #ffc107;*/
    z-index: 2000 !important;
  }

  .bm-item-list {
    font-size: unset !important;
    margin-left: unset !important;
  }

  .bm-burger-button {
    z-index: 1100;
    left: 0 !important;
    top: 0 !important;
    margin-left: 2em;
    margin-top: 1.2em;
  }
  .bm-cross {
    width: 6px !important;
    height: 24px !important;
    background: black !important;
  }
  .bm-cross-button {
    margin-right: 1.5em;
    margin-top: 0.5em;
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
</style>