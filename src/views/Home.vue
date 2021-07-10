<template>
  <div class="home">
    <h1 class="mb-4 h3 fw-bold">Home</h1>
    <div v-if="!isAuthentificated">is not Auth</div>
    <div v-else>
      Hello, <strong>{{ getUser.user.displayName }}</strong> !
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  // mounted () {
  //   this.userAction()
  // },
  computed: {
    ...mapGetters(['getUser', 'isAuthentificated'])
  }
  // methods: {
  //   ...mapActions(['userAction'])
  // }
}
</script>
