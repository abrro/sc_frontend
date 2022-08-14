<template>
  <div id="app">

    <div>
      <b-navbar toggleable="lg" type="dark" variant="secondary">
        <b-navbar-brand to="/">Movies</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>

          <b-navbar-nav>
            <b-nav-item>
              <router-link :to="{name : 'home'}"> Home </router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{name : 'trendingMovies'}"> Trending </router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link :to="{name : 'searchMovies'}"> Search </router-link>
            </b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ms-auto">

            <b-nav-item v-if="token">
              <span> User : {{user.user}} </span>
            </b-nav-item>

            <b-nav-item v-if="!token" to="/register">Register</b-nav-item>
            <b-nav-item v-if="!token" to="/login">Log In</b-nav-item>
            <b-nav-item v-else @click="logout()">Log Out</b-nav-item>

            <b-nav-item-dropdown v-if="token" text="Menu">
              <b-dropdown-item :to="{name : 'profile'}">
                Profile
              </b-dropdown-item>
              <b-dropdown-item :to="{name : 'userCollections'}">
                My collection
              </b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
    
    <router-view/>
  </div>
</template>

<script>
  import { mapState, mapMutations} from 'vuex';

  export default {
    name : 'App',

    computed : {
      ...mapState([
          'token',
          'user'
        ]
      )
    },

    methods : {
      ...mapMutations([
        'removeToken',
        'setToken'
      ]),

      logout() {
        this.removeToken();
        this.$router.push({name : 'home'});
      }
    },

    mounted() {
      if (localStorage.token) {
        this.setToken(localStorage.token);
      }
    },
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
