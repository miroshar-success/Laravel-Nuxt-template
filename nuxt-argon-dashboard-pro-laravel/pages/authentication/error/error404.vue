<template>
  <NuxtLayout name="authentication">
    <template #navbar>
      <NavbarTransparent
        :dark-mode="true"
        is-blur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
      />
    </template>
    <div
      class="page-header min-vh-100"
      :style="{
        backgroundImage: `url(${bg})`,
      }"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-7 mx-auto text-center">
            <h1 class="display-1 text-bolder text-primary">Error 404</h1>
            <h2>Erm. Page not found</h2>
            <p class="lead">
              We suggest you to go to the homepage while we solve this issue.
            </p>
            <ArgonButton color="dark" variant="gradient" class="mt-4">
              Go to Homepage
            </ArgonButton>
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
import bg from "@/assets/img/illustrations/404.svg";
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
