<template>
  <div class="auth">
    <h1>Login</h1>

    <form
      class="form mb-4"
      v-on:submit.prevent="submitHandler">
      <div
        class="mb-3"
        :class="{ error: v$.email.$errors.length }">
        <label
          for="loginEmail"
          class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="loginEmail"
          placeholder="name@example.com"
          v-model="v$.email.$model">
      </div>

      <div
        class="mb-3"
        :class="{ error: v$.password.$errors.length }">
        <label
          for="loginPass"
          class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="loginPass"
          placeholder="****"
          v-model="v$.password.$model">
      </div>

      <button
        class="btn btn-primary"
        type="submit">
        Login
      </button>
    </form>

    <div class="card text-center mb-4">
      <div class="card-body">
        <h6 class="card-title">
          Or Login with
        </h6>

        <ul class="list-unstyled d-flex align-items-center justify-content-center pt-4">
          <li>
            <a
              href="#"
              class="rounded-circle border p-3"
              v-on:click.prevent="userLoginGoogle">
              <i class="fab fa-google-plus-g"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="text-center">
      Don't have an account yet? <router-link to="/registration">Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { helpers, required, minLength, email } from '@vuelidate/validators'

import { mapActions } from 'vuex'

export default {
  name: 'Login',
  setup: () => ({ v$: useVuelidate() }),
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations () {
    return {
      name: {
        required,
        minLength: helpers.withMessage(
          ({ $pending, $invalid, $params, $model }) =>
            `This field has a value of '${$model}' but must have a min length of ${
              $params.min
            } so it is ${$invalid ? 'invalid' : 'valid'}`,
          minLength(7)
        )
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(7)
      }
    }
  },
  methods: {
    ...mapActions(['userLogin', 'userLoginGoogle']),
    async submitHandler () {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      // actually submit form
      console.log('S: >>> LogIn')
      this.userLogin(this.email, this.password)
    }
  }
}
</script>
