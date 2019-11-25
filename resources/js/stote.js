import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex);

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

export default new Vuex.Store({
  state: {
        token: localStorage.getItem('token') || null,
        myname: localStorage.getItem('myname') || null,
        email: localStorage.getItem('email') || null,
        errorMessage: ''
  },

  mutations: {
    retrieveToken(state, responseData) {
        state.token = responseData.token,
        state.myname = responseData.name,
        state.email = responseData.email
    },
    registerUser(state, responseData) {
        state.token = responseData.token,
        state.name = responseData.name,
        state.email = responseData.email
    },
    errorToken(state, errorMessage) {
        state.errorMessage = errorMessage
    },
    destroyToken(state) {
        state.token = null,
        state.name = null,
        state.email = null
        console.log("STATE", null);
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
              localStorage.setItem('token', responseData.token)
              localStorage.setItem('myname', responseData.name)
              localStorage.setItem('email', responseData.email)
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
                    localStorage.setItem('token', responseData.token)
                    localStorage.setItem('myname', responseData.name)
                    localStorage.setItem('email', responseData.email)
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
                localStorage.removeItem('token')
                localStorage.removeItem('myname')
                localStorage.removeItem('email')
                context.commit('destroyToken')
                resolve(response)
              })
              .catch(error => {
                localStorage.removeItem('token')
                localStorage.removeItem('myname')
                localStorage.removeItem('email')
                context.commit('destroyToken')
                reject(error)
              })
          })
        }
      }
  },
  getters: {
    loggedIn(state) {
        console.log(localStorage.getItem('myname'));
        return state.token != null;
    }
  }
});
