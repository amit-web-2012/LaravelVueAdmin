<template>
<!-- /.login-logo -->
<div class="hold-transition register-page">
<div class="register-box">
  <div class="register-logo">
    <a href="../../index2.html"><b>Admin</b>LTE</a>
  </div>

  <div class="card">
    <div class="card-body register-card-body">
      <p class="login-box-msg">Register a new membership</p>

      <form @submit.prevent="registrationSubmit" v-if="!formSubmited">
        <div class="input-group mb-3">
          <input type="text" name="full_name" id="full_name" v-model="full_name" v-validate="'required'" class="form-control" placeholder="Full name" :class="{ 'is-invalid': submitted && errors.has('full_name') }">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
          <p v-if="submitted && errors.has('full_name')" class="invalid-feedback">
                  {{ errors.first("full_name") }}
          </p>
        </div>
        <div class="input-group mb-3">
          <input type="email" v-model="email" name="email" id="email" v-validate="'required|email'" class="form-control" placeholder="Email" :class="{ 'is-invalid': submitted && errors.has('email') }">
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
          <input type="password" v-model="password" class="form-control" name="password" id="password" v-validate="{required:true, min:6}" :class="{ 'is-invalid': submitted && errors.has('password') }" placeholder="Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
          <p v-if="submitted && errors.has('password')" class="invalid-feedback">
                  {{ errors.first("password") }}
          </p>
        </div>
        <div class="input-group mb-3">
          <input type="password" name="confirm_password" id="confirm_password" v-model="confirm_password" v-validate="'required|confirmed:password'" :class="{ 'is-invalid': submitted && errors.has('confirm_password') }" class="form-control" placeholder="Retype password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
          <p v-if="submitted && errors.has('confirm_password')" class="invalid-feedback">
                  {{ errors.first("confirm_password") }}
          </p>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" name="terms" v-validate="'required'">
              <label for="agreeTerms">
               I agree to the <a href="#">terms</a>
              </label>
              <p v-show="submitted && errors.has('terms')" class="text-danger">{{ errors.first('terms') }}</p>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button class="btn btn-primary btn-block btn-flat">Register</button>
          </div>
          <!-- /.col -->
        </div>
      </form>
      <div v-else>
      <h1 class="submitted">Form submitted successfully!</h1>
      </div>
      <router-link to="/login"> already have a membership</router-link>
    </div>
    <!-- /.form-box -->
  </div><!-- /.card -->
</div>
</div>
<!-- /.register-box -->
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                full_name: '',
                email: '',
                password: '',
                confirm_password: '',
                terms: false,
                submitted: false,
                formSubmited: false
            }
        },
        methods: {
            registrationSubmit(e) {
                this.submitted = true;
                 this.$validator.validate().then(valid => {
                    if (valid) {
                        this.$store.dispatch('registerUser', {
                            name: this.full_name,
                            email: this.email,
                            password: this.password,
                            confirm_password: this.confirm_password

                        }).then(response => {
                            this.$router.push({ name: 'dashboard' })
                        });
                    }
                });
            }
        }
    }
</script>
