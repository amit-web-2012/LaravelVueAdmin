/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue');
import VeeValidate from "vee-validate";
import VueRouter from 'vue-router';
import routes from './routes/route';
import store from './stote';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
console.log("NEW");
console.log(store.getters.token);
Vue.use(VueRouter);
Vue.use(VeeValidate)
const router = new VueRouter({
    mode:'history',
    routes
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.loggedIn) {
        next({
          name: 'login',
        })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (store.getters.loggedIn) {
        next({
          name: 'dashboard',
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));
Vue.component('login-component', require('./components/Login.vue').default);
Vue.component('navbar-component', require('./components/NavBar.vue').default);
Vue.component('leftmenu-component', require('./components/LeftMenu.vue').default);
Vue.component('footer-component', require('./components/Footer.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    router,
    store,
    el: '#app',
});
