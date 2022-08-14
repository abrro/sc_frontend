<template>
  <div>
    <h1>Movie application</h1>
    <h3 v-if="subtitle">{{ subtitle }}</h3>
  </div>
</template>

<script>

  export default {
    name: 'Header',
    props: {
      subtitle: String
    }
  }

</script>

<style scoped>
  
</style>