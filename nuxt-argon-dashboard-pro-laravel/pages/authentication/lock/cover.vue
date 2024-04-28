<template>
  <NuxtLayout name="authentication">
    <template #navbar>
      <NavbarTransparent btn-background="bg-gradient-light" />
    </template>
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/lock-cover.jpg');
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card">
            <div class="card-body text-center">
              <div class="info mb-4 mt-n6">
                <img
                  class="avatar avatar-xxl shadow-lg border border-white"
                  alt="Image placeholder"
                  src="@/assets/img/team-2.jpg"
                />
              </div>
              <h4 class="mb-0 font-weight-bolder">Mike Priesler</h4>
              <p class="mb-4">Enter password to unlock your account.</p>
              <form role="form">
                <ArgonInput
                  id="password"
                  type="password"
                  placeholder="Password"
                  aria-label="password"
                />
                <div class="text-center">
                  <ArgonButton
                    type="button"
                    color="dark"
                    variant="gradient"
                    size="lg"
                    class="mt-3 mb-0"
                    >Unlock</ArgonButton
                  >
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
</script>
