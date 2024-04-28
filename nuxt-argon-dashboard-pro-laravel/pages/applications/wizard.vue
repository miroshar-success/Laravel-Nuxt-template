<template>
  <div class="py-4 h-100 container-fluid">
    <div class="row">
      <div class="text-center col-12">
        <h3 class="mt-5 text-white">Build Your Profile</h3>
        <h5 class="text-white font-weight-normal">
          This information will let us know more about you.
        </h5>
        <div class="mb-5 multisteps-form">
          <div class="row mt-5">
            <div class="mx-auto my-5 col-12 col-lg-8">
              <div class="multisteps-form__progress">
                <button
                  class="multisteps-form__progress-btn"
                  type="button"
                  title="User Info"
                  :class="activeStep >= 0 ? activeClass : ''"
                  @click="activeStep = 0"
                >
                  <span>About</span>
                </button>
                <button
                  class="multisteps-form__progress-btn"
                  type="button"
                  title="Address"
                  :class="activeStep >= 1 ? activeClass : ''"
                  @click="activeStep = 1"
                >
                  <span>Account</span>
                </button>
                <button
                  class="multisteps-form__progress-btn"
                  type="button"
                  title="Order Info"
                  :class="activeStep === 2 ? activeClass : ''"
                  @click="activeStep = 2"
                >
                  <span>Address</span>
                </button>
              </div>
            </div>
          </div>
          <!--form panels-->
          <div class="row">
            <div class="m-auto col-12 col-lg-8">
              <form class="multisteps-form__form">
                <!--single form panel-->
                <About v-if="activeStep === 0" />
                <!--single form panel-->
                <Account :class="activeStep === 1 ? activeClass : ''" />
                <!--single form panel-->
                <WizardAddress :class="activeStep === 2 ? activeClass : ''" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import About from "~~/pagesComponents/applications/wizard/About.vue";
import Account from "~~/pagesComponents/applications/wizard/Account.vue";
import WizardAddress from "~~/pagesComponents/applications/wizard/Address.vue";

definePageMeta({
    middleware: ["auth"],
})

export default {
  name: "Wizard",
  components: { About, Account, WizardAddress },
  data() {
    return {
      activeClass: "js-active position-relative",
      activeStep: 0,
      formSteps: 2,
    };
  },
  methods: {
    nextStep() {
      if (this.activeStep < this.formSteps) {
        this.activeStep += 1;
      } else {
        this.activeStep -= 1;
      }
    },
    prevStep() {
      if (this.activeStep > 0) {
        this.activeStep -= 1;
      }
    },
  },
};
</script>
