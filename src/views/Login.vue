<template>
  <div class="auth">
    <h1>Login</h1>

    <form
      class="form mb-4"
      v-on:submit.prevent="submitHandler">
      <div class="mb-3">
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
          v-model="email">
      </div>

      <div class="mb-3">
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
          v-model="password">
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
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['userLogin', 'userLoginGoogle']),
    submitHandler () {
      this.userLogin(this.email, this.password)
    }
  }
}
</script>
