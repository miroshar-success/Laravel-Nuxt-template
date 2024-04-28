<template>
  <NuxtLayout name="authentication">
    <template #navbar>
      <NavbarTransparent
        is-blur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
        btn-background="bg-gradient-warning"
        :dark-mode="true"
      />
    </template>
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/verification-cover.jpg');
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-7">Good evening!</h1>
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
          <div class="card mb-5">
            <div class="card-body px-lg-5 py-lg-5 text-center">
              <div class="text-center text-muted mb-4">
                <h2>2-Step Verification</h2>
              </div>
              <div class="row gx-2 gx-sm-3">
                <div class="col">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      maxlength="1"
                      autocomplete="off"
                      autocapitalize="off"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      maxlength="1"
                      autocomplete="off"
                      autocapitalize="off"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      maxlength="1"
                      autocomplete="off"
                      autocapitalize="off"
                    />
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      maxlength="1"
                      autocomplete="off"
                      autocapitalize="off"
                    />
                  </div>
                </div>
              </div>
              <div class="text-center">
                <ArgonButton
                  type="button"
                  class="btn bg-gradient-warning w-100 mb-3"
                  >Send code
                </ArgonButton>
                <span class="text-muted text-sm">
                  Haven't received it?
                  <NuxtLink to="/"> Resend a new code. </NuxtLink>
                </span>
              </div>
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
</script>
