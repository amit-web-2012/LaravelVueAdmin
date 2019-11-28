import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
        id: localStorage.getItem('id') || null,
        token: localStorage.getItem('token') || null,
        myname: localStorage.getItem('myname') || null,
        email: localStorage.getItem('email') || null,
        profile_image: localStorage.getItem('profile_image') || null,
        errorMessage: ''
  },

  mutations: {
    retrieveToken(state, responseData) {
        console.log(responseData);
        state.id = responseData.id,
        state.token = responseData.token,
        state.myname = responseData.username,
        state.email = responseData.email,
        state.profile_image = responseData.profile_image
    },
    registerUser(state, responseData) {
        state.id = responseData.id,
        state.token = responseData.token,
        state.myname = responseData.username,
        state.email = responseData.email
    },
    errorToken(state, errorMessage) {
        state.errorMessage = errorMessage
    },
    destroyToken(state) {
        state.id = null,
        state.token = null,
        state.myname = null,
        state.email = null,
        state.profile_image = null
    },
    updateProfile(state,responseData) {
        state.myname = responseData.name,
        state.profile_image = responseData.profile_image
    }
  },

  actions: {
    retrieveToken(context, credentials) {
        return new Promise((resolve, reject) => {
          axios.post('/login', {
            email: credentials.email,
            password: credentials.password,
          })
            .then(response => {
              const responseData = response.data.responseData;
              localStorage.setItem('id', responseData.id)
              localStorage.setItem('token', responseData.token)
              localStorage.setItem('myname', responseData.username)
              localStorage.setItem('email', responseData.email)
              localStorage.setItem('profile_image', responseData.profile_image)
              context.commit('retrieveToken', responseData)
              resolve(response);
            })
            .catch(error => {
              const errorMessage = error.response.data
              context.commit('errorToken', errorMessage)
              reject(error);
            })
          })
      },
      registerUser(context, credentials) {
        return new Promise((resolve, reject) => {
            axios.post('/register', {
                name: credentials.name,
                email:credentials.email,
                password: credentials.password,
                password_confirmation: credentials.confirm_password
            }).then(response => {
                const responseData = response.data.responseData;
                    localStorage.setItem('id', responseData.id)
                    localStorage.setItem('token', responseData.token)
                    localStorage.setItem('myname', responseData.username)
                    localStorage.setItem('email', responseData.email)
                    localStorage.setItem('profile_image', '')
                    context.commit('registerUser', responseData)
                    resolve(response)
            }).catch(error => {
              const errorMessage = error.response
              context.commit('errorToken', errorMessage)
              reject(error);
            });
        });
      },
      destroyToken(context) {
        //axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

        if (context.getters.loggedIn) {
          return new Promise((resolve, reject) => {

            axios.post('/logout')
              .then(response => {
                localStorage.removeItem('id')
                localStorage.removeItem('token')
                localStorage.removeItem('myname')
                localStorage.removeItem('email')
                localStorage.removeItem('profile_image')
                context.commit('destroyToken')
                resolve(response)
              })
              .catch(error => {
                localStorage.removeItem('id')
                localStorage.removeItem('token')
                localStorage.removeItem('myname')
                localStorage.removeItem('email')
                localStorage.removeItem('profile_image')
                context.commit('destroyToken')
                reject(error)
              })
          })
        }
      }
  },
  getters: {
    loggedIn(state) {
        return state.token != null;
    },
    loggedUserName(state) {
      return state.myname;
    },
    loggedUserId(state) {
      return state.id;
    },
    token(state) {
        return state.token;
      }
  }
});
