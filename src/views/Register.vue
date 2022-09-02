<template>
  <div id="app">
    <Header subtitle="Create new account"/>

    <b-form @submit="onSubmit">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" 
        v-model="$v.form.email.$model" 
        type="email" 
        placeholder="Enter email" 
        :state="validateState('email')"
        aria-describedby="input-email-feedback"
        ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required"
          id="input-email-feedback">Email is required.</b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.email.email"
          id="input-email-feedback">Must be a proper email.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="User Name:" label-for="name">
        <b-form-input 
        id="name" 
        v-model="$v.form.name.$model" 
        placeholder="Enter name"
        :state="validateState('name')"
        aria-describedby="input-name-feedback"
        >
      </b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.name.required"
        id="input-name-feedback">Name is required.</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.name.minLength"
        id="input-name-feedback">Must be at least 3 characters long.</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.name.maxLenght"
        id="input-name-feedback">Must not be longer than 20 characters.</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input 
        id="password" 
        v-model="$v.form.password.$model" 
        type="password"
        :state="validateState('password')"
        aria-describedby="input-password-feedback"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required"
        id="input-password-feedback">Password is required.</b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.password.minLength"
        id="input-password-feedback">Must be at least 8 characters long.</b-form-invalid-feedback>
      </b-form-group>

      <br>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  import { required, email, minLength, maxLength} from "vuelidate/lib/validators";
  import Header from '@/components/Header.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Register',
    
    components: {
      Header
    },

    data() {
      return {
        form: {
          email: '',
          name: '',
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
        name: {
          required,
          minLength: minLength(3),
          maxLenght: maxLength(20)
        },
        password: {
          required,
          minLength: minLength(8)
        }
      }
    },

    methods: {
      ...mapActions([
        'register'
      ]),

      validateState(name) {
        const { $dirty, $error } = this.$v.form[name];
        return $dirty ? !$error : null;
      },

      onSubmit(e) {
        e.preventDefault();

        if (this.$v.form.$anyError) {
          return;
        }else{
          this.register(this.form);
          this.$router.push({ name: 'home' });
        }
      }
    }
  }
</script>

<style scoped>

</style>
