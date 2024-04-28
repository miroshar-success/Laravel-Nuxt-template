<template>
  <NuxtLayout name="authentication">
    <template #navbar>
      <NavbarTransparent
        is-blur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
        btn-background="bg-gradient-success"
        :dark-mode="true"
      />
    </template>
    <div class="page-header min-vh-100">
      <div class="container">
        <div class="row">
          <div
            class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
          >
            <div class="card card-plain">
              <div class="pb-0 card-header text-start">
                <h4 class="font-weight-bolder">Reset password</h4>
                <p class="mb-0">
                  You will receive an e-mail in maximum 60 seconds
                </p>
              </div>
              <div class="card-body">
                <form role="form">
                  <div class="mb-3">
                    <ArgonInput
                      id="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      size="lg"
                    />
                  </div>
                  <div class="mb-3">
                    <ArgonInput
                      id="code"
                      type="text"
                      placeholder="Verification Code"
                      name="code"
                      size="lg"
                    />
                  </div>
                  <div class="text-center">
                    <ArgonButton
                      class="my-4"
                      variant="gradient"
                      color="success"
                      full-width
                      size="lg"
                    >
                      Send
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
              class="position-relative bg-gradient-success h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
              style="
                background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/reset-ill.jpg');
                background-size: cover;
              "
            >
              <span class="mask bg-dark opacity-6"></span>
              <h4 class="mt-5 text-white font-weight-bolder position-relative">
                Argon Design
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
