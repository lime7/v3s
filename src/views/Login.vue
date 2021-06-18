<template>
  <div class="auth">
    <h1>Login</h1>

    <form class="form mb-4">
      <div class="mb-3">
        <label for="loginEmail" class="form-label">Email address</label>
        <input type="email" class="form-control" id="loginEmail" placeholder="name@example.com">
      </div>

      <div class="mb-3">
        <label for="loginPass" class="form-label">Password</label>
        <input type="password" class="form-control" id="loginPass" placeholder="****">
      </div>

      <button class="btn btn-primary" type="submit">Login</button>
    </form>

    <div class="card text-center">
      <div class="card-body">
        <h2 class="card-title">
          Or Login with Social
        </h2>

        <ul class="list-unstyled d-flex align-items-center justify-content-center pt-4">
          <li>
            <a href="#" class="rounded-circle border p-3">
              <i class="fab fa-google-plus-g"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>
