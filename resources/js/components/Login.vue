<template>
<!-- /.login-logo -->
<div class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
       <b>Admin</b> Panel
  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Sign in to start your session</p>
      <p class="login-box-msg" v-if="msg!=''"><code>{{msg}}</code></p>


      <form @submit.prevent="validateBeforeSubmit" v-if="!formSubmited">
        <div class="input-group mb-3">
          <input type="email" v-model="email" name="email" id="email" v-validate="'required|email'" :class="{ 'is-invalid': submitted && errors.has('email') }" class="form-control" placeholder="Email">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
          <p v-if="submitted && errors.has('email')" class="invalid-feedback">
                  {{ errors.first("email") }}
          </p>
        </div>
        <div class="input-group mb-3">
          <input type="password" v-model="password" name="password" id="password" v-validate="{ required: true, min: 6 }" class="form-control" placeholder="Password" :class="{ 'is-invalid': submitted && errors.has('password') }">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
          <p class="invalid-feedback" v-if="submitted && errors.has('password')">{{ errors.first('password') }}</p>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember">
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>

          <!-- /.col -->
          <div class="col-4">
            <button class="btn btn-primary btn-block btn-flat">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
      <div v-else>
      <h1 class="submitted">Form submitted successfully!</h1>
      </div>
      <p class="mb-1">
        <router-link to="/register">Register a new membership</router-link>
      </p>
      <p class="mb-0">
        <router-link to="/forgot-password">I forgot my password</router-link>
      </p>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
</div>
<!-- /.login-box -->
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                email: '',
                password: '',
                submitted: false,
                formSubmited: false,

            }
        },
        computed: {
            msg: function () {
               return this.$store.state.errorMessage;
            }
        },
        methods: {
            validateBeforeSubmit(e) {
                this.submitted = true;
                 this.$validator.validate().then(valid => {
                    if (valid) {
                        this.$store.dispatch('retrieveToken', {
                            email: this.email,
                            password: this.password
                        }).then(response => {
                            this.$router.push({ name: 'dashboard' })
                        });
                    }
                });
            }
        }
    }
</script>
