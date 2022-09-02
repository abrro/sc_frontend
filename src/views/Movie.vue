<template>
  <div>
    <Header v-if="movie" :subtitle="this.movie.title" />

    <div v-if="movie" class="row">
      <div class="col-6">
        <b-card title="About">
        <b-card-sub-title>
          Category : {{this.movie.category.label}}
        </b-card-sub-title>
        <b-card-text>
          Synopsis : {{this.movie.synopsis}}
        </b-card-text>
        <b-card-sub-title>
          Release date : {{this.movie.release_date}}
        </b-card-sub-title>

      </b-card>

      </div>
        <div class="col-6">
          <b-card>
            <b-card-title>
              Cast and crew:
            </b-card-title>

            <div v-if="movie.roles[2]">
                Directed by:
                <b-badge v-for="director in movie.roles[2].celebrities" :key="director.id">
                  <b-link :to="{name : 'celebrity', params : {id : director.id} }">{{director | nameAndLastname}}</b-link>
                </b-badge>
            </div>

            <div v-if="movie.roles[1]">
                Written by:
                <b-badge v-for="writer in movie.roles[1].celebrities" :key="writer.id">
                  <b-link :to="{name : 'celebrity', params : {id : writer.id} }">{{writer | nameAndLastname}}</b-link>
                </b-badge>
            </div>

            <div v-if="movie.roles[0]">
              Starring:
              <b-badge v-for="star in movie.roles[0].celebrities" :key="star.id" :to="{}">
                <b-link :to="{name : 'celebrity', params : {id : star.id} }">{{star | nameAndLastname}}</b-link>
              </b-badge>
            </div>
          </b-card>
        </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import {mapActions} from 'vuex';

export default {
  name: "Home",

  components: {
    Header,
  },

  data() {
    return {
      movie: null,
    };
  },

  filters: {
    nameAndLastname(value) {
        return value.name + ' ' + value.lastname;
    }
  },

  methods: {
    ...mapActions([
      'getMovie'
    ])
  },

  mounted() {
    this.getMovie(this.$route.params.id).then(obj => {
      this.movie = obj;
    })
  }
}
</script>

<style scoped>
</style>