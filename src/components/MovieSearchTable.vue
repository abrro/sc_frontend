<template>
  <div>
    <b-container>
      <h3>Results for : {{ searchTitle }}</h3>

        <b-pagination
          v-model="currentPage"
          :total-rows="searchCount"
          :per-page="perPage"
        ></b-pagination>

        <b-table
          hover
          :items="itemProvider"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="fields"
          :filter="searchTitle"
          >
          <template v-slot:cell(title)="link">
            <b-link @click="viewMovie(link.item.id)">{{ link.item.title }}</b-link>
          </template>
        </b-table>
    </b-container>

  </div>
</template>

<script>
  export default {
    name: 'MovieSearchTable',

    props: {
        searchCount : {
            type : Number
        },

        searchTitle : {
            type : String
        }
    },

    data() {
      return {
        currentPage : 1,
        perPage: 10,
        fields: [ 
          {key : 'title'},
          {key : 'category.label', label : 'Category'},
          {key : 'release_date', label : 'Released'}
          ]
      }
    },

    methods: {
        viewMovie : function(id){
            this.$router.push({name : 'movie', params : {id : id}})
        },
        
        itemProvider : function(ctx, callback) {
            const params = '/api/movies/page/' + ctx.currentPage + '/search?title=' + this.searchTitle;

            fetch('http://127.0.0.1:8000' + params, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${localStorage.token}`
                }
            })
            .then(obj => obj.json())
            .then(res => {
                const items = res;
                callback(items)
            })
            .catch(() => {
                callback([])
            })
            return null;
        }
      }

    }

</script>

<style scoped>
  .pagination {
        justify-content: center;
    }
</style>