<template>
  <div class="auth bg-light">
    <h6 class="text-muted p-2 position-absolute top-0 left-0">Authorization layout</h6>

    <div class="container p-5 h-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-12">
          <div class="row g-0 justify-content-center">
            <div class="col-lg-5">
              <div class="p-4 bg-white">
                <a href="#" class="text-success fw-bold text-decoration-none h6 mb-4 d-block">v3s-app</a>

                <router-view/>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="position-relative h-100">
                <img src="https://images.unsplash.com/photo-1565935795673-43d1fd9af660?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTB8fGdyZWVufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60" alt="" class="img-fluid w-100 h-100 position-absolute top-0 start-0">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>
