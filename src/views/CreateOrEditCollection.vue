<template>
    <CollectionForm v-if="mode > 0"
    :collectionID="collectionId"
    :headerTitle="headerTitle" 
    :label="label" 
    :description="description"/>

</template>

<script>
import CollectionForm from '@/components/CollectionForm.vue';
import {mapActions} from 'vuex';

export default {    
    name: 'CreateOrEditCollection',

    components: {
        CollectionForm
    },

    data() {
      return {
        collection : null,
        collectionId: -1,
        headerTitle: '',
        label : '',
        description : '',
        mode : 0
      }
    },

    methods: {
      ...mapActions([
        'getCollectionById'
      ]),

    },

    mounted() {
        if(this.$route.params.id !== undefined){
            this.getCollectionById(this.$route.params.id).then(obj => {
              this.collection = obj;
              this.collectionId = this.collection.id;
              this.headerTitle = "Edit collection";
              this.label = this.collection.label;
              this.description = this.collection.description;
              this.mode = 2;
            });
        }else{
            this.headerTitle = "Create collection";
            this.mode = 1;
        }
    }
  }

</script>

<style scoped>
  
</style>