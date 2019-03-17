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

  .btn {
    color: white;
    background-color: darkgreen;
  }

  #sidebar {
    background-image: url('./assets/sbg6.jpg') !important;
    background-position: bottom;
    background-size: cover;
    min-width: 300px !important;
    max-width: 300px !important;
    /*background-color: #ffc107;*/
    z-index: 2000 !important;
    overflow: scroll;
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
    padding-left: 0.5em;
    margin-bottom: 0.4em;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    border-left: rgba(0, 100, 0, 0) 4px solid;
    margin-left: 4px;
    cursor: pointer;
  }
  .routerLink:hover {
    color: darkgreen;
    border-left: darkgreen 4px solid;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(41, 41, 41, 0.2);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: darkgreen;
  }

  .adminSubHeader {
    background-color: lightgray;
    height: 3em;
    width: 90vw;
  }

  .adminSubHeaderTitle {
    font-size: 1.5em;
    padding-top: 0.1em;
  }
</style>
