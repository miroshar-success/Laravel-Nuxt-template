<template>
  <NuxtLayout name="authentication">
    <template #navbar>
      <NavbarTransparent
        is-blur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
        btn-background="bg-gradient-success"
        :dark-mode="true"
      />
    </template>
    <div
      class="page-header min-vh-100"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/lock-basic.jpg');
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-7">
            <div class="card py-lg-3">
              <div class="card-body text-center">
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
                      size="lg"
                      full-width
                      color="dark"
                      variant="gradient"
                      class="mb-0"
                    >
                      Unlock
                    </ArgonButton>
                  </div>
                </form>
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
