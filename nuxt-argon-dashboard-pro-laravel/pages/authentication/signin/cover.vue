<template>
  <NuxtLayout name="authentication">
    <template #navbar>
      <NavbarTransparent btn-background="bg-gradient-success" />
    </template>
    <div
      class="page-header align-items-start min-vh-50 pt-7 pb-9"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-cover.jpg');
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
            <p class="text-lead text-white">
              Use these awesome forms to login or create new account in your
              project for free.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card mt-5">
            <div class="card-header pb-0 text-start">
              <h3 class="font-weight-bolder">Welcome back</h3>
              <p class="mb-0">Enter your email and password to sign in</p>
            </div>
            <div class="card-body">
              <form role="form" class="text-start">
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
                <ArgonSwitch id="rememberMe" name="rememberMe">
                  Remember me
                </ArgonSwitch>
                <div class="text-center">
                  <ArgonButton color="success" full-width class="mt-4 mb-0"
                    >Sign in</ArgonButton
                  >
                </div>
              </form>
            </div>
            <div class="card-footer text-center pt-0 px-lg-2 px-1">
              <p class="mb-4 text-sm mx-auto">
                Don't have an account?
                <NuxtLink to="/" class="text-success font-weight-bold"
                  >Sign up</NuxtLink
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <FooterCentered />
    </template>
  </NuxtLayout>
</template>
<script setup>
import NavbarTransparent from "@/examples/Navbar/Transparent.vue";
import FooterCentered from "@/examples/Footer/Centered.vue";
useHead({
  bodyAttrs: {
    class: "bg-gray-100",
  },
});
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
</script>
