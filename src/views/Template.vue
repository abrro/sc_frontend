<template>
  <div>
    <Header subtitle="Home"/>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import {mapState, mapActions, mapMutations} from 'vuex';

  export default {
    name: 'Template',

    components: {
      Header
    },

    data() {
      return {

      }
    },

    computed: {
      ...mapState([
      ])
    },


    methods: {
      ...mapActions([
      ]),

      ...mapMutations([
      ]),

    },
    
    mounted() {

    }
  }

</script>

<style scoped>
  
</style>