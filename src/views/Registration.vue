<template>
  <div class="auth">
    <h1>Registration</h1>

    <form
      class="form mb-4"
      v-on:submit.prevent="submitHandler">
      <div class="mb-3">
        <label
          for="regEmail"
          class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="regEmail"
          placeholder="name@example.com"
          v-model="email"
          :rules="emailRules"
          required>
      </div>

      <div class="mb-3">
        <label
          for="regPass"
          class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="regPass"
          placeholder="****"
          v-model="password"
          :rules="passwordRules"
          required>
      </div>

      <div class="mb-3">
        <label
          for="regRePass"
          class="form-label">
          Repeat Password
        </label>
        <input
          type="password"
          class="form-control"
          id="regRePass"
          placeholder="****"
          v-model="repassword"
          :rules="repasswordRules"
          required>
      </div>

      <button
        class="btn btn-primary"
        type="submit">
        Registration
      </button>
    </form>

    <div class="text-center">
      Already have an account? <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Registration',
  data () {
    return {
      email: '',
      password: '',
      repassword: ''
      // emailRules: [
      //   (v) => !!v || 'E-mail is required',
      //   (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      // ],
      // passwordRules: [
      //   (v) => !!v || 'Password is required',
      //   (v) => v.length >= 6 || 'Password must be greater than 6 characters'
      // ],
      // repasswordRules: [
      //   (v) => !!v || 'Repeat Password is required',
      //   (v) => v === this.password || 'Password must match'
      // ]
    }
  },
  methods: {
    ...mapActions(['userRegistration']),
    submitHandler () {
      this.userRegistration({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
