<template>
  <div>
    <Header :subtitle="headerTitle"/>

    <b-container fluid>

      <b-form @submit="submitCollection">

        <b-form-group
            id="collection-label-group"
            label="Collection label:"
            label-for="collection-label"
        >
          <b-form-input
              id="collection-label"
              v-model="$v.form.label.$model"
              type="text"
              placeholder="Enter label..."
              :state="validateState('label')"
              aria-describedby="input-label-feedback"
          ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.label.required"
                id="input-label-feedback">Label is required.</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.label.minLength" 
                id="input-label-feedback">Must be atleast 5 characters long.</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.label.maxLength" 
                id="input-label-feedback">Must not be longer than 20 characters.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            id="collection-description-group"
            label="Collection description:"
            label-for="collection-description"
        >
          <b-form-textarea
              id="collection-description"
              v-model="$v.form.description.$model"
              type="text"
              placeholder="Enter description..."
              rows="3"
              :state="validateState('description')"
              aria-describedby="input-description-feedback"
          ></b-form-textarea>
                <b-form-invalid-feedback v-if="!$v.form.description.required"
                id="input-description-feedback">Description is required.</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.description.minLength" 
                id="input-description-feedback">Must be at least 10 characters long.</b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.description.maxLength" 
                id="input-description-feedback">Must not be longer than 60 characters.</b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>

      </b-form>
    </b-container>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import {mapState, mapActions} from 'vuex';
  import { required, minLength, maxLength} from "vuelidate/lib/validators";

  export default {
    name: 'CollectionForm',

    components: {
      Header
    },

    props: {
      collectionId: {
        type : Number
      },
      headerTitle: {
        type : String
        },
      label: {
        type : String,
        default: ''
      },
      description: {
        type : String,
        default: ''
      }
    },

    data() {
      return {
        form: {
          label: '',
          description: '',
          userId: -1
        },
      }
    },

    validations: {
      form: {
        label: {
          required,
          minLength: minLength(5),
          maxLength: maxLength(20)
        },
        description: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(60)
        }
      }
    },

    computed: {
      ...mapState([
        'user'
      ])
    },

    methods: {
      ...mapActions([
        'createCollection',
        'editCollection'
      ]),

      resetForm() {
        this.form = {
          name: '',
          food: ''
        };

        this.$nextTick(() => {
          this.$v.$reset();
        });
      },

      validateState(name) {
        const { $dirty, $error } = this.$v.form[name];
        return $dirty ? !$error : null;
      },

      submitCollection : function(e) {
        e.preventDefault();
        if (this.$v.form.$anyError) {
          return;
        }else{
          if(this.$route.params.id !== undefined){
            this.form.userId = this.user.userId;
            this.editCollection( {body : this.form, id: this.$route.params.id });
            this.$router.push({name : 'userCollections'})
          }else{
            this.form.userId = this.user.userId;
            this.createCollection(this.form);

            this.form.label = '';
            this.form.description = '';
          }
          this.resetForm();
        }
      }

    },
    
    mounted() {
      this.form.label = this.label;
      this.form.description = this.description;
    }
  }

</script>

<style scoped>
  
</style>