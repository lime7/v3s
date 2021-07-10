<template>
  <div>
    <h1 class="mb-4 h3 fw-bold">Registration</h1>

    <form
      class="form mb-3"
      v-on:submit.prevent="submitHandler">
      <div
        class="mb-3 position-relative"
        :class="{ error: v$.name.$errors.length }">
        <input
          id="regName"
          placeholder="Name"
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
        class="mb-3 position-relative"
        :class="{ error: v$.email.$errors.length }">
        <input
          id="regEmail"
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
        class="mb-3 position-relative"
        :class="{ error: v$.password.$errors.length }">
        <input
          id="regPass"
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

      <div
        class="mb-3 position-relative"
        :class="{ error: v$.repassword.$errors.length }">
        <input
          id="regRePass"
          placeholder="Repeat Password"
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
        class="mb-3 position-relative"
        :class="{ error: v$.checkbox.$errors.length }">
        <div class="form-check">
          <input
            type="checkbox"
            v-model="v$.checkbox.$model"
            class="form-check-input"
            id="regAgree"
          />
          <label
            class="form-check-label text-muted"
            for="regAgree">
            <small>Agree to <a href="#" class="text-reset">Terms and Conditions</a> and <a href="#" class="text-reset">Privacy Policy</a></small>
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

      <div class="pt-2">
        <button class="btn btn-success w-100" type="submit">Registration</button>
      </div>
    </form>

    <div class="text-center">
      <span class="me-2">Already have an account?</span>
      <strong><router-link to="/login">Login</router-link></strong>
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
      this.userRegistration({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
