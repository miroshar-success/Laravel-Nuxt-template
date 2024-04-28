<template>
  <div class="container-fluid mt-4">
    <div class="row align-items-center">
      <div class="col-lg-4 col-sm-8 mt-5">
        <NavPill />
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8">
        <div class="row mt-6">
          <div class="col-xl-6 mb-xl-0 mb-4">
            <MasterCard />
          </div>
          <div class="col-xl-6">
            <div class="row">
              <div class="col-md-6">
                <DefaultInfoCard
                  :icon="{
                    component: 'fas fa-landmark',
                    background: 'bg-gradient-success',
                  }"
                  title="Salary"
                  description="Belong Interactive"
                  value="+$2000"
                />
              </div>
              <div class="col-md-6">
                <DefaultInfoCard
                  :icon="{
                    component: 'fab fa-paypal',
                    background: 'bg-gradient-success',
                  }"
                  title="Paypal"
                  description="Freelance Payment"
                  value="$455.00"
                />
              </div>
            </div>
          </div>
          <div class="col-md-12 mb-4">
            <PaymentMethodsCard />
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <InvoiceCard class="mt-6" />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-7">
        <BillingCard
          title="Billing Information"
          :bills="[
            {
              name: 'Oliver Liam',
              company: 'Viking Burrito',
              email: 'oliver@burrito.com',
              id: 'FRB1235476',
              action: [
                { label: 'Delete', route: 'javascript:;' },
                { label: 'Edit', route: 'javascript:;' },
              ],
            },
            {
              name: 'Lucas Harper',
              company: 'Stone Tech Zone',
              email: 'lucas@stone-tech.com',
              id: 'FRB1235476',
              action: [
                { label: 'Delete', route: 'javascript:;' },
                { label: 'Edit', route: 'javascript:;' },
              ],
            },
            {
              name: 'Ethan James',
              company: 'Fiber Notion',
              email: 'ethan@fiber.com',
              id: 'FRB1235476',
              action: [
                { label: 'Delete', route: 'javascript:;' },
                { label: 'Edit', route: 'javascript:;' },
              ],
            },
          ]"
        />
      </div>
      <div class="col-md-5">
        <RankingListCard
          :horizontal-break="false"
          :card="{
            title: 'Transactions',
            date: '23 - 30 March 2021',
            subtitle: 'Newest',
          }"
          :items="[
            {
              title: 'Netflix',
              date: '27 March 2020, at 12:30 PM',
              amount: '- $ 2,500',
              icon: 'fa-arrow-down',
              color: 'danger',
            },
            {
              title: 'Apple',
              date: '23 March 2020, at 04:30 AM',
              amount: '+ $ 2,000',
              icon: 'fa-arrow-up',
              color: 'success',
            },
          ]"
        >
          <RankingList
            title="Yesterday"
            :items="[
              {
                title: 'Stripe',
                date: '26 March 2020, at 13:45 PM',
                amount: '+ $ 750',
                icon: 'fa-arrow-up',
                color: 'success',
              },
              {
                title: 'HubSpot',
                date: '26 March 2020, at 12:30 PM',
                amount: '+ $ 1,000',
                icon: 'fa-arrow-up',
                color: 'success',
              },
              {
                title: 'Creative Tim',
                date: '26 March 2020, at 08:30 AM',
                amount: '+ $ 2,500',
                icon: 'fa-arrow-up',
                color: 'success',
              },
              {
                title: 'Webflow',
                date: '26 March 2020, at 05:00 AM',
                amount: 'Pending',
                icon: 'fa-info',
                color: 'dark',
              },
            ]"
            :horizontal-break="false"
          />
        </RankingListCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavPill from "~~/pagesComponents/pages/account/NavPill.vue";
import MasterCard from "~~/examples/cards/MasterCard.vue";
import DefaultInfoCard from "@/examples/cards/DefaultInfoCard.vue";
import RankingListCard from "@/examples/cards/RankingListCard.vue";
import RankingList from "@/examples/cards/RankingList.vue";
import InvoiceCard from "@/pagesComponents/pages/account/InvoiceCard.vue";
import PaymentMethodsCard from "@/pagesComponents/pages/account/PaymentMethodsCard.vue";
import BillingCard from "@/pagesComponents/pages/account/BillingCard.vue";

import setNavPills from "~~/assets/js/nav-pills";

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
onMounted(() => {
  setNavPills();
});
</script>
