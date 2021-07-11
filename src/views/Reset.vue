<template>
  <div>
    <h1 class="mb-4 h3 fw-bold">Reset password</h1>

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

      <div class="pt-2">
        <button
          class="btn btn-success w-100"
          type="submit">
          Reset
        </button>
      </div>
    </form>

    <div class="text-center">
      <span class="me-2">Back to</span>
      <strong><router-link to="/login">Login</router-link></strong>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import { mapActions } from 'vuex'

export default {
  name: 'Reset',
  setup: () => ({ v$: useVuelidate() }),
  data () {
    return {
      email: ''
    }
  },
  validations () {
    return {
      email: {
        required,
        email
      }
    }
  },
  methods: {
    ...mapActions(['userResetPassword']),
    async submitHandler () {
      this.userResetPassword({
        email: this.email
      })
    }
  }
}
</script>
