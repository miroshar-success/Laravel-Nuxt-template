<template>
  <NuxtLayout name="authentication">
    <template #navbar>
      <NavbarTransparent
        is-blur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
        btn-background="bg-gradient-success"
        :dark-mode="true"
      />
    </template>
    <div class="page-header min-vh-100">
      <div class="container">
        <div class="row">
          <div
            class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto"
          >
            <div class="card card-plain">
              <div class="card-header pb-0 text-left">
                <h4 class="font-weight-bolder">Sign Up</h4>
                <p class="mb-0">Enter your email and password to register</p>
              </div>
              <div class="card-body pb-3">
                <form role="form">
                  <label>Name</label>
                  <ArgonInput
                    id="name"
                    type="text"
                    placeholder="Name"
                    aria-label="Name"
                  />
                  <label>Email</label>
                  <ArgonInput
                    id="email"
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                  />
                  <label>Password</label>
                  <ArgonInput
                    id="password"
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                  />
                  <ArgonCheckbox>
                    <label
                      class="form-check-label"
                      for="flexCheckDefault"
                      checked
                    >
                      I agree the
                      <a href="#" class="text-dark font-weight-bolder"
                        >Terms and Conditions</a
                      >
                    </label>
                  </ArgonCheckbox>
                  <div class="text-center">
                    <ArgonButton
                      color="success"
                      variant="gradient"
                      full-width
                      class="mt-4 mb-0"
                      >Sign up</ArgonButton
                    >
                  </div>
                </form>
              </div>
              <div class="card-footer text-center pt-0 px-sm-4 px-1">
                <p class="mb-4 mx-auto">
                  Already have an account?
                  <NuxtLink to="/" class="text-success font-weight-bolder">
                    Sign in
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column"
          >
            <div
              class="position-relative bg-gradient-success h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
              style="
                background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-ill.jpg');
                background-size: cover;
              "
            >
              <span class="mask bg-success opacity-4"></span>
              <h4 class="mt-5 text-white font-weight-bolder position-relative">
                Your journey starts here
              </h4>
              <p class="text-white position-relative">
                Just as it takes a company to sustain a product, it takes a
                community to sustain a protocol.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
import NavbarTransparent from "@/examples/Navbar/Transparent.vue";
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
