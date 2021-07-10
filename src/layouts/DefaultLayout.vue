<template>
  <div class="position-relative">
    <h6 class="text-muted p-2 position-absolute top-0 left-0">Default layout</h6>

    <div class="container p-5">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
