<template>
  <div>
    <h1 class="mb-4 h3 fw-bold">Login</h1>

    <ul class="list-unstyled d-flex align-items-center">
      <li class="me-2">
        <a
          href="#"
          class="btn btn-success"
          v-on:click.prevent="userLoginGoogle">
          <i class="fab fa-google-plus-g"></i>
          <span class="ms-3">Login with Google</span>
        </a>
      </li>
      <li class="mx-2">
        <a href="#" class="btn btn-success disabled">
          <i class="fab fa-github"></i>
        </a>
      </li>
      <li class="mx-2">
        <a href="#" class="btn btn-success disabled">
          <i class="fab fa-facebook-f"></i>
        </a>
      </li>
    </ul>

    <form
      class="form mb-3"
      v-on:submit.prevent="submitHandler">
      <div
        class="mb-3"
        :class="{ error: v$.email.$errors.length }">
        <input
          id="loginEmail"
          placeholder="Email address"
          v-model="v$.email.$model"
          class="form-control" />
        <div
          class="input-errors invalid-feedback d-block"
          v-for="error of v$.email.$errors"
          :key="error.$uid" >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div
        class="mb-3"
        :class="{ error: v$.password.$errors.length }">
        <input
          id="loginPass"
          placeholder="Password"
          type="password"
          v-model="v$.password.$model"
          class="form-control" />
        <div
          class="input-errors invalid-feedback d-block"
          v-for="error of v$.password.$errors"
          :key="error.$uid" >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div class="pt-2">
        <button
          class="btn btn-success w-100"
          type="submit">
          Login
        </button>

        <a href="#" class="d-block text-center text-muted mt-2">
          Forgot password?
        </a>
      </div>
    </form>

    <div class="text-center">
      <span class="me-2">Don't have an account yet?</span>
      <strong><router-link to="/registration">Register</router-link></strong>
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
      // const isFormCorrect = await this.v$.$validate()
      // if (!isFormCorrect) return
      // actually submit form
      this.userLogin({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
