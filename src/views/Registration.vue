<template>
  <div class="auth">
    <h1>Registration</h1>

    <form class="form mb-4">
      <div class="mb-3">
        <label for="regEmail" class="form-label">Email address</label>
        <input type="email" class="form-control" id="regEmail" placeholder="name@example.com">
      </div>

      <div class="mb-3">
        <label for="regPass" class="form-label">Password</label>
        <input type="password" class="form-control" id="regPass" placeholder="****">
      </div>

      <div class="mb-3">
        <label for="regRePass" class="form-label">Repeat Password</label>
        <input type="password" class="form-control" id="regRePass" placeholder="****">
      </div>

      <button class="btn btn-primary" type="submit">Registration</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Registration'
}
</script>
