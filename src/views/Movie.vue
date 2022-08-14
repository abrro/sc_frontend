<template>
  <div>
    <Header subtitle="Movie"/>
    <div>{{this.$route.params.id}}</div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';

  export default {
    name: 'Home',

    components: {
      Header
    }
    
  }

</script>

<style scoped>
  
</style>