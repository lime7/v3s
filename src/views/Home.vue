<template>
  <div class="home">
    <h1 class="mb-4 h3 fw-bold">Home</h1>
    <div v-if="!isAuthentificated">is not Auth</div>
    <div v-else>
      Hello, <strong>{{ getUser.user.displayName }}</strong> !
    </div>
    <a href="#" v-on:click.prevent="userLogout">
      Logout
    </a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  // mounted () {
  //   this.userAction()
  // },
  computed: {
    ...mapGetters(['getUser', 'isAuthentificated'])
  },
  methods: {
    ...mapActions(['userLogout'])
  }
}
</script>
