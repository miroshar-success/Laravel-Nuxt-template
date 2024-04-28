<template>
  <NuxtLayout name="authentication">
    <template #navbar>
      <NavbarTransparent btn-background="bg-gradient-success" />
    </template>
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/reset-cover.jpg');
        background-position: top;
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-7">Reset Password</h1>
            <p class="text-lead text-white">
              You will receive an e-mail in maximum 60 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card mb-md-8">
            <div class="card-header">
              <div class="d-flex">
                <div
                  class="icon icon-shape bg-success shadow text-center border-radius-md"
                >
                  <i
                    class="ni ni-circle-08 text-white text-lg opacity-10"
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="ms-3">
                  <h5 class="mb-0">Can't log in?</h5>
                  <p class="text-sm mb-0">Restore access to your account</p>
                </div>
              </div>
            </div>
            <div class="card-body">
              <form role="form">
                <label>We will send a recovery link to</label>
                <ArgonInput
                  id="email"
                  type="email"
                  placeholder="Your e-mail"
                  aria-label="Email"
                />
                <div class="text-center">
                  <ArgonButton
                    color="success"
                    full-width
                    class="w-100 mt-2 mb-0"
                  >
                    Reset password
                  </ArgonButton>
                  <p class="text-sm mt-3 cursor-pointer mb-0">
                    I don't have access to my Email
                  </p>
                </div>
              </form>
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
definePageMeta({
  layout: false,
  middleware: ["auth"],
});
useHead({
  bodyAttrs: {
    class: "bg-gray-200",
  },
});
</script>
