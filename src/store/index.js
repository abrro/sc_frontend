import Vue from 'vue'
import Vuex from 'vuex'
import {Buffer} from 'buffer'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    token : '',
    user : null,

    trendingMovies : [],
    
    //searchTitle : '',
    //searchCount : 0,
    moviesSearchResult : [],

    userCollections: [],
    collection: null,
    editCollection: null
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
      state.user = JSON.parse(Buffer.from(token.split('.')[1],"base64"));
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
      state.userCollections = [];
      state.collection = null;
    },

    setTrendingMovies(state, movies){
      state.trendingMovies = movies;
    },

    // setSearchTitle(state, title){
    //   state.searchTitle = title;
    // },

    // setMoviesSearchResult(state, obj) {
    //   state.searchCount = obj.count;
    //   state.moviesSearchResult = [...obj.rows];
    //   console.log(state.moviesSearchResult);
    // },

    // resetMovieSearchResults(state) {
    //   state.moviesSearchResult = [];
    // },

    addCollection(state, collection) {
      state.userCollections.push(collection);
    },

    removeCollection(state, colId) {
      state.userCollections = state.userCollections.filter(col => col.id != colId);
    },

    setUserCollections(state, collections) {
      state.userCollections = collections;
    },

    setCollectionById(state, collection) {
      state.collection = collection;
    },

    copyToEditCollection(state) {
      state.editCollection = state.collection;
    },

    addEditCollection(state, movie) {
      state.editCollection.movies.push(movie);
    },

    removeEditCollection(state, movId) {
      state.editCollection.movies = state.editCollection.movies.filter(movie => movie.id != movId);
    }
  },

  actions: {

    register({ commit }, obj) {
      fetch('http://127.0.0.1:9000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => commit('setToken', tkn.token) );
    },

    login({ commit }, obj) {
      fetch('http://127.0.0.1:9000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( tkn => {
        if (tkn.msg) {
          alert(tkn.msg);
        } else {
          commit('setToken', tkn.token)
        }
      });
    },

    // searchMovies({ commit }, obj) {
    //   fetch(`http://127.0.0.1:8000/api/movies/page/${obj.page}/search?title=${obj.title}`, {
    //     method: 'GET',
    //     headers : {'Authorization' : `Bearer ${localStorage.token}`}
    //   })
    //     .then( obj => obj.json() )
    //     .then( res => commit('setMoviesSearchResult', res));
    // },

    getTrendingMovies({ commit }) {
      fetch(`http://127.0.0.1:8000/api/movies/trending`, {
        method: 'GET',
        headers : {'Authorization' : `Bearer ${localStorage.token}`}
      })
        .then( obj => obj.json() )
        .then( res => commit('setTrendingMovies', res));
    },

    getUserCollections({ commit }) {
      fetch('http://127.0.0.1:8000/api/movielists', {
        method: 'GET',
        headers : {'Authorization' : `Bearer ${localStorage.token}`}
      })
        .then( obj => obj.json() )
        .then( res => commit('setUserCollections', res));
    },

    createCollection({ commit }, obj) {
      fetch('http://127.0.0.1:8000/api/movielists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${localStorage.token}`},
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( res => commit('addCollection', res) );
    },

    deleteCollection({ commit }, id) {
      fetch(`http://127.0.0.1:8000/api/movielists/${id}`, {
        method: 'DELETE',
        headers: {'Authorization' : `Bearer ${localStorage.token}` },
      }).then( res => res.json() )
        .then( res => commit('removeCollection', id) );
    },

    getCollectionById({ commit }, id) {
      fetch(`http://127.0.0.1:8000/api/movielists/${id}`, {
        method: 'GET',
        headers : {'Authorization' : `Bearer ${localStorage.token}`}
      })
        .then( obj => obj.json() )
        .then( res => commit('setCollectionById', res));
    },

    collectionSave({commit, state}, obj) {
      fetch(`http://127.0.0.1:8000/api/movielists/${obj.movielistsId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${localStorage.token}`},
        body: JSON.stringify(obj.payload)
      }).then( res => res.json() )
        .then(res => {
          commit('setCollectionById', state.editCollection);
          alert(res.message);
      });
    },

  },

  modules: {
  }
})
