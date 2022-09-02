<template>
  <div id="app">
    <Header subtitle="Log In"/>

    <b-form @submit="onSubmit">
      <b-form-group label="Email:" label-for="email">
        <b-form-input 
        id="email" 
        v-model="$v.form.email.$model" 
        placeholder="Enter email"
        :state="validateState('email')"
        aria-describedby="input-email-feedback"
        >
        </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.email.required"
          id="input-email-feedback"
        >Email is required.</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.email.email"
          id="input-email-feedback"
        >Must be a proper email.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" 
        v-model="$v.form.password.$model" 
        type="password"  
        placeholder="Enter password"
        :state="validateState('password')"
        aria-describedby="input-password-feedback"
        >
      </b-form-input>
      <b-form-invalid-feedback v-if="!$v.form.password.required"
          id="input-password-feedback"
        >Password is required.</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    </div>
  </template>

<script>
  import Header from '@/components/Header.vue';
  import { required, email} from "vuelidate/lib/validators";
  import {
    mapActions
  } from 'vuex';

  export default {
    name: 'Login',

    components: {
      Header
    },

    data() {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },

    validations: {
      form: {
        email: {
          required,
          email
        },
        password: {
          required,
        }
      }
    },

    methods: {
      ...mapActions([
        'login'
      ]),

      validateState(name) {
        const { $dirty, $error } = this.$v.form[name];
        return $dirty ? !$error : null;
      },

      onSubmit(e) {
        e.preventDefault();
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }else{
          this.login(this.form);
          this.$router.push({name: 'home'});
        }
      }
    }
  }
</script>

<style scoped>

</style>
