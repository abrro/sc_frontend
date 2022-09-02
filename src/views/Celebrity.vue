<template>
  <div>
    <Header v-if="celebrity" :subtitle="celebrity.name + ' ' + celebrity.lastname" />

    <h2>Credits:</h2>
    <div v-if="celebrity" class="row">
      <div class="col-4" v-for="role in celebrity.roles" :key="role.id">
        <h3>As {{role.role}} :</h3>
        <b-list-group v-for="movie in role.movies" :key="movie.id">
          <b-list-group-item>
            <b-link :to="{ name : 'movie', params : {id : movie.id} }">{{movie.title}}</b-link>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import { mapActions} from 'vuex';

  export default {
    name: 'Celebrity',

    components: {
      Header
    },

    data() {
      return {
        celebrity: null
      }
    },

    methods: {
      ...mapActions([
        'getCelebrity'
      ]),
    },

    mounted() {
      this.getCelebrity(this.$route.params.id).then(obj => {
        this.celebrity = obj;
      });
    }
  }

</script>

<style scoped>
  
</style>