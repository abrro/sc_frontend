<template>
  <div>
    <Header v-if="movie" :subtitle="this.movie.title"></Header>

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

    <div v-if="movie && user" class="row justify-content-center">
      <div class="col-6">
        <h3>Leave a review:</h3>
        <ReviewForm :movieId="this.$route.params.id"></ReviewForm>
      </div>
    </div>


    <div v-if="movie && movie.reviews.length > 0">
      <h2>Reviews: </h2>
      <div class="row justify-content-center" v-for="review in movie.reviews" :key="review.id">
        <div class="col-6">
            <b-card class="mt-3">
              <b-card-title>
                Summary : {{review.summary}}
              </b-card-title>
              <b-card-title>
                <b-form-rating
                  :stars="numStars"
                  :value="review.rating"
                  inline
                  readonly
                  show-value
                ></b-form-rating>
              </b-card-title>
              <b-card>
                <b-card-text>
                Full review: {{review.comment}}
                </b-card-text>
                <b-card-footer>
                  By : {{review.user.name}} ({{review.user.email}})
                </b-card-footer>
              </b-card>
            </b-card>
        </div>
      </div>
    </div>
    <h2 v-else>No reviews yet.</h2>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import ReviewForm from "@/components/ReviewForm.vue";
import Header from '@/components/Header.vue';

export default {
  name: "Home",

  components: {
    ReviewForm,
    Header
},

  data() {
    return {
      movie: null,
      numStars : 10
    };
  },

  filters: {
    nameAndLastname(value) {
        return value.name + ' ' + value.lastname;
    }
  },

  computed: {
      ...mapState([
        'user'
      ])
    },

  methods: {
    ...mapActions([
      'getMovie',
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