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

    <ul class="list-unstyled mt-5">
      <li v-for="user in getUsers" :key="user.uid">
        {{ user.uid }} , {{ user.displayName }} , {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  mounted () {
    this.fetchUsers()
  },
  computed: {
    ...mapGetters(['getUser', 'getUsers', 'isAuthentificated'])
  },
  methods: {
    ...mapActions(['userLogout', 'fetchUsers'])
  }
}
</script>
