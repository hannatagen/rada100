<template>
  <div id="app">
    <notifications group="foo"></notifications>
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

  .btnGreen {
    color: white;
    background-color: darkgreen;
  }

  .btnGreen:hover {
    background-color: #005600;
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
    margin-left: 0.5em;
    border-radius: 25px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
    border-radius: 25px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(41, 41, 41, 0.2);
    border-radius: 25px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: darkgreen;
  }

  .adminNavbar {
    /*height: 3em;*/
    /*left: 0;*/
    width: 91vw;
    display: -webkit-box !important;
  }

  .navbarBtn {
    margin-left: 0.5em;
  }

  /*.routerBtnDisabled {*/
    /*di*/
  /*}*/

  .deleteTrailBtn {
    color: #a40000;
    cursor: pointer;
  }

  .editTrailBtn {
    color: darkgreen;
    cursor: pointer;
  }

  .tableColumnTitle {
    color: black;
  }

  .tableColumnTitle:hover {
    color: darkgreen;
  }

  .btn-danger {
    background-color: #c10000 !important;
    border-color: #c10000 !important;
  }

  .btn-danger:hover {
    background-color: #a90000 !important;
    border-color: #a90000 !important;
  }
</style>
