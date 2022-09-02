import Vue from 'vue'
import Vuex from 'vuex'
import {Buffer} from 'buffer'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    token : '',
    user : null,

    trendingMovies : null,
    topRatedMovies : null,
    
    movies: [],
    celebrities: [],
    moviesSearchResult : [],

    userCollections: null,
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
      state.userCollections = null;
      state.collection = null;
      state.editCollection = null;
    },

    setTrendingMovies(state, movies){
      state.trendingMovies = movies;
    },

    setTopRatedMovies(state, movies){
      state.topRatedMovies = movies;
    },

    setMoviesSearchResult(state, res) {
      state.moviesSearchResult = [...res];
    },

    resetMovieSearchResult(state) {
      state.moviesSearchResult = [];
    },

    addCelebrity(state, celebrity){
      state.celebrities.push(celebrity);
    },

    addMovie(state, movie){
      state.movies.push(movie);
    },

    addCollection(state, collection) {
      state.userCollections.push(collection);
    },

    editCollection(state, {body, colId}) {
      const index = state.userCollections.findIndex(col => col.id == colId);
      const col = state.userCollections[index];
      col.label = body.label;
      col.description = body.description;
      state.userCollections.splice(index, 1, col);
    },

    removeCollection(state, colId) {
      state.userCollections = state.userCollections.filter(col => col.id != colId);
    },

    setUserCollections(state, collections) {
      state.userCollections = collections;
    },

    setCollectionMovies(state, { id, movies }){
      const index = state.userCollections.findIndex(col =>  col.id == id);
      if(index > -1){
        state.userCollections[index].movies = movies.map(el => el.movie);
      }
    },

    saveMoviesToCollection(state, { id, movies }){
      const index = state.userCollections.findIndex(col =>  col.id == id);
      if(index > -1){
        state.userCollections[index].movies = movies;
      }
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

    searchMovies({ commit }, obj) {
      fetch(`http://127.0.0.1:8000/api/movies/search?title=${obj.title}`, {
        method: 'GET'
      })
        .then( obj => obj.json() )
        .then( res => commit('setMoviesSearchResult', res));
    },

    getTrendingMovies({ commit, state }) {
      return new Promise( (resolve, reject) => {
        if(state.trendingMovies){
          resolve(state.trendingMovies);
        }else{
          fetch(`http://127.0.0.1:8000/api/movies/trending`, {
          method: 'GET'
        })
          .then( obj => obj.json() )
          .then((res) => {
            commit('setTrendingMovies', res);
            resolve(res);
          });
        }
      });
    },

    getTopRatedMovies({ commit, state }) {
      return new Promise( (resolve, reject) => {
        if(state.topRatedMovies){
          resolve(state.topRatedMovies);
        }else{
          fetch(`http://127.0.0.1:8000/api/movies/toprated`, {
          method: 'GET'
        })
          .then( obj => obj.json() )
          .then((res) => {
            commit('setTopRatedMovies', res);
            resolve(res);
          });
        }
      });
    },

    getCelebrity({commit, state}, id) {
      return new Promise( (resolve, reject) => {
        const celebrity = state.celebrities.filter(celeb => celeb.id == id)[0];
        if(celebrity){
          resolve(celebrity);
        }else{
          fetch(`http://127.0.0.1:8000/api/celebrities/${id}`, {
            method: "GET"
          })
          .then((obj) => obj.json())
          .then((res) => {
            commit('addCelebrity', res);
            resolve(res);
          });
        }
      });
    },

    getMovie({commit, state}, id) {
      return new Promise( (resolve, reject) => {
        const movie = state.movies.filter(movie => movie.id == id)[0];
        if(movie){
          resolve(movie);
        }else{
          fetch(`http://127.0.0.1:8000/api/movies/${id}`, {
            method: "GET"
          })
          .then((obj) => obj.json())
          .then((res) => {
            commit('addMovie', res);
            resolve(res);
          });
        }
      });
    },

    getUserCollections({ commit, state }) {
      return new Promise( (resolve, reject) => {
        if(state.userCollections){
          resolve(state.userCollections);
        }else{
          fetch('http://127.0.0.1:8000/api/movielists', {
            method: 'GET',
            headers : {'Authorization' : `Bearer ${localStorage.token}`}
          })
            .then( obj => obj.json() )
            .then( res => {
              commit('setUserCollections', res);
              resolve(res);
            });
          }
        });
    },

    createCollection({ commit }, obj) {
      fetch('http://127.0.0.1:8000/api/movielists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${localStorage.token}`},
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( res => commit('addCollection', res) );
    },

    editCollection({ commit }, obj) {
      fetch(`http://127.0.0.1:8000/api/movielists/${obj.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${localStorage.token}`},
        body: JSON.stringify(obj.body)
      }).then( res => res.json() )
        .then( res => {
          commit('editCollection', {body: obj.body, colId : obj.id});
          alert(res.msg);
        });
    },

    deleteCollection({ commit }, id) {
      return new Promise((resolve, reject) => {
        fetch(`http://127.0.0.1:8000/api/movielists/${id}`, {
        method: 'DELETE',
        headers: {'Authorization' : `Bearer ${localStorage.token}` },
      }).then( res => res.json() )
        .then( res => {
          commit('removeCollection', id);
          resolve(res);
        });
      });
    },

    getCollectionById({ commit, state }, id) {
      return new Promise( (resolve, reject) => {
        const col = state.userCollections.filter(col=> col.id == id)[0];
        if(col){
          if(!col.movies){
              fetch(`http://127.0.0.1:8000/api/movielists/${id}/movies`, {
              method: 'GET',
              headers : {'Authorization' : `Bearer ${localStorage.token}`}
            })
              .then( obj => obj.json() )
              .then( res => {
                commit('setCollectionMovies', {
                  id : id, 
                  movies : res
                });
                //col.movies = res.map(el => el.movie);
                //resolve(col);
                resolve(state.userCollections.filter(col=> col.id == id)[0]);
              });
          }else{
            resolve(col);
          }
        }else{
          fetch(`http://127.0.0.1:8000/api/movielists/${id}`, {
            method: 'GET',
            headers : {'Authorization' : `Bearer ${localStorage.token}`}
          })
            .then( obj => obj.json() )
            .then( res => {
              resolve(res);
            });
        }
      });
    },

    collectionSave({commit}, {payload, movielistsId, movieList}) {
      return new Promise( (resolve, reject) => {
        fetch(`http://127.0.0.1:8000/api/movielists/${movielistsId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${localStorage.token}`},
          body: JSON.stringify(payload)
        }).then( res => res.json() )
          .then(res => {
            commit('saveMoviesToCollection', {id : movielistsId, movies : movieList});
            resolve(res);
        });
      });
    },

  },

  modules: {
  }
})
