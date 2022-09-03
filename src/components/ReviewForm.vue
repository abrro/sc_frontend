<template>
  <div>
    <b-container fluid>

      <b-form @submit="submitReview">

        <label for="review-rating">Rate out of 10 stars:</label>
        <b-form-rating 
          id="review-rating" 
          v-model="form.rating"
          :stars="starsNum"
          >
        </b-form-rating>

        <b-form-group
            id="review-summary-group"
            label="Review summary:"
            label-for="review-summary"
        >
          <b-form-input
              id="review-summary"
              v-model="$v.form.summary.$model"
              type="text"
              placeholder="Enter summary..."
              :state="validateState('summary')"
              aria-describedby="input-summary-feedback"
          ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.summary.required"
                id="input-summary-feedback">Summary is required.</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.summary.minLength" 
                id="input-summary-feedback">Must be atleast 10 characters long.</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.summary.maxLength" 
                id="input-summary-feedback">Must not be longer than 50 characters.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="review-comment-group"
            label="Review:"
            label-for="collection-comment"
        >
          <b-form-textarea
              id="review-comment"
              v-model="$v.form.comment.$model"
              type="text"
              placeholder="Enter comment..."
              rows="3"
              :state="validateState('comment')"
              aria-describedby="input-comment-feedback"
          ></b-form-textarea>
                <b-form-invalid-feedback v-if="!$v.form.comment.required"
                id="input-comment-feedback">Description is required.</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.comment.minLength" 
                id="input-comment-feedback">Must be at least 40 characters long.</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.comment.maxLength" 
                id="input-comment-feedback">Must not be longer than 200 characters.</b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>

      </b-form>
    </b-container>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';
  import { required, minLength, maxLength } from "vuelidate/lib/validators";

  export default {
    name: 'ReviewForm',

    components: {
    },

    props: {
      movieId: {
        type : Number
      },
      summary: {
        type : String,
        default: ''
      },
      comment: {
        type : String,
        default: ''
      },
      rating: {
        type : Number,
        default: 1
      }
    },

    data() {
      return {
        starsNum : 10,
        form: {
          summary: '',
          comment: '',
          rating: 0,
          userId: -1
        },
      }
    },

    validations: {
      form: {
        summary: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(50)
        },
        comment: {
          required,
          minLength: minLength(50),
          maxLength: maxLength(200)
        }
      }
    },

    computed: {
      ...mapState([
        'user',
        'token'
      ])
    },

    methods: {
      ...mapActions([
        'addReview'
      ]),

      resetForm() {
        this.form = {
          summary: '',
          comment: '',
          rating: 3,
          userId: -1,
          movieId: -1
        };

        this.$nextTick(() => {
          this.$v.$reset();
        });
      },

      validateState(name) {
        const { $dirty, $error } = this.$v.form[name];
        return $dirty ? !$error : null;
      },

      submitReview : function(e) {
        e.preventDefault();
        if (this.$v.form.$anyError) {
          return;
        }else{
          this.form.userId = this.user.userId;
          this.form.movieId = this.movieId;
          this.$socket.emit('review', { review: this.form, token : this.token });
          this.resetForm();
        }
      }

    },
    
    mounted() {
      this.form.summary = this.summary;
      this.form.comment = this.comment;
      this.form.rating = this.rating;
    }
  }

</script>

<style scoped>
  .div rating-error {
    color: red;
  }
</style>