<template>
  <div class="auth">
    <h1>Registration</h1>

    <form
      class="form mb-4"
      v-on:submit.prevent="submitHandler">
      <div
        class="mb-3"
        :class="{ error: v$.name.$errors.length }">
        <label
          for="regName"
          class="form-label">
          Name
        </label>
        <input
          id="regName"
          v-model="v$.name.$model"
          class="form-control" />
        <div
          class="input-errors invalid-feedback d-block"
          v-for="error of v$.name.$errors"
          :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div
        class="mb-3"
        :class="{ error: v$.email.$errors.length }">
        <label
          for="regEmail"
          class="form-label">
          Email adress
        </label>
        <input
          id="regEmail"
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
        <label
          for="regPass"
          class="form-label">
          Password
        </label>
        <input
          id="regPass"
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

      <div
        class="mb-3"
        :class="{ error: v$.repassword.$errors.length }">
        <label
          for="regRePass"
          class="form-label">
          Repeat Password
        </label>
        <input
          id="regRePass"
          type="password"
          v-model="v$.repassword.$model"
          class="form-control" />
        <div
          class="input-errors invalid-feedback d-block"
          v-for="error of v$.repassword.$errors"
          :key="error.$uid" >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div
        class="mb-3"
        :class="{ error: v$.checkbox.$errors.length }">
        <div class="form-check">
          <input
            type="checkbox"
            v-model="v$.checkbox.$model"
            class="form-check-input"
            id="regAgree"
          />
          <label
            class="form-check-label"
            for="regAgree">
            Agree to terms and conditions
          </label>
        </div>
        <div
          class="input-errors invalid-feedback d-block"
          v-for="error of v$.checkbox.$errors"
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <button class="btn btn-primary" type="submit">Registration</button>
    </form>

    <div class="text-center">
      Already have an account? <router-link to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { helpers, required, minLength, email, sameAs } from '@vuelidate/validators'

import { mapActions } from 'vuex'

export default {
  name: 'Registration',
  setup: () => ({ v$: useVuelidate() }),
  data () {
    return {
      name: '',
      email: '',
      password: '',
      repassword: '',
      checkbox: ''
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
      },
      repassword: {
        required,
        sameAsRaw: sameAs(this.password)
      },
      checkbox: {
        required
      }
    }
  },
  methods: {
    ...mapActions(['userRegistration']),
    async submitHandler () {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      // actually submit form
      console.log('S: >>> Registration')
      this.userRegistration({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
