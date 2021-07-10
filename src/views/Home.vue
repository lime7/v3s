<template>
  <div class="home">
    <h1>Home</h1>
    {{ isAuthentificated }}
    <div v-if="!isAuthentificated">is not Auth</div>
    <div v-else>
      {{ getUser.email }}
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
