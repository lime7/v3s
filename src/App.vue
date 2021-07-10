<template>
  <!-- <div id="nav" class="mb-4">
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/registration">Registration</router-link>
  </div> -->

  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
// @ is an alias to /src
import DefaultLayout from '@/layouts/DefaultLayout'
import AuthLayout from '@/layouts/AuthLayout'

export default {
  name: 'App',
  components: {
    DefaultLayout,
    AuthLayout
  },
  computed: {
    layout () {
      return (this.$route.meta.layout || 'AuthLayout')
    }
  }
}
</script>
