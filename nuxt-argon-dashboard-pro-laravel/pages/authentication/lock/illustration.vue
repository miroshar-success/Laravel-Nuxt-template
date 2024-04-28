<template>
  <NuxtLayout name="authentication">
    <template #navbar>
      <NavbarTransparent
        is-blur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
        btn-background="bg-gradient-dark"
        :dark-mode="true"
      />
    </template>
    <div class="page-header min-vh-100">
      <div class="container">
        <div class="row">
          <div
            class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto"
          >
            <div class="card card-plain py-lg-3">
              <div class="card-body text-center">
                <h4 class="mb-0 font-weight-bolder">Mike Priesler</h4>
                <p class="mb-4">Enter password to unlock your account.</p>
                <form role="form">
                  <div class="mb-3">
                    <ArgonInput
                      id="password"
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </div>
                  <div class="text-center">
                    <ArgonButton color="dark" full-width size="lg">
                      Unlock
                    </ArgonButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column"
          >
            <div
              class="position-relative bg-gradient-dark h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
              style="
                background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/lock-ill.jpg');
                background-size: cover;
              "
            >
              <span class="mask bg-dark opacity-6"></span>
              <h4 class="mt-5 text-white font-weight-bolder position-relative">
                "Attention is the new currency"
              </h4>
              <p class="text-white position-relative">
                The more effortless the writing looks, the more effort the
                writer actually put into the process.
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
