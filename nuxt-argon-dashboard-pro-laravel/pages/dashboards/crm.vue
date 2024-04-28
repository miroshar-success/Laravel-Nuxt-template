<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-8 col-lg-7">
        <div class="row">
          <div class="col-sm-4">
            <div class="overflow-hidden card">
              <div class="p-3 pb-0 card-header">
                <p class="mb-0 text-sm text-capitalize font-weight-bold">
                  Visitors
                </p>
                <h5 class="mb-0 font-weight-bolder">
                  5,927<span class="text-sm text-success font-weight-bolder"
                    >+55%</span
                  >
                </h5>
              </div>
              <div class="p-0 card-body">
                <div class="chart">
                  <MiniGradientLineChart />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 col-sm-4 mt-sm-0">
            <div class="overflow-hidden card">
              <div class="p-3 pb-0 card-header">
                <p class="mb-0 text-sm text-capitalize font-weight-bold">
                  Income
                </p>
                <h5 class="mb-0 font-weight-bolder">
                  $130,832
                  <span class="text-sm text-success font-weight-bolder"
                    >+90%</span
                  >
                </h5>
              </div>
              <div class="p-0 card-body">
                <div class="chart">
                  <MiniGradientLineChart
                    :chart-options="{
                      chart: {
                        type: 'area',
                        zoom: {
                          enabled: false,
                        },
                      },
                      colors: ['#4BB543'],
                      labels: [
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                      ],
                      dataLabels: {
                        enabled: false,
                      },
                      stroke: {
                        curve: 'smooth',
                      },
                      legend: {
                        show: false,
                      },
                      dataLabels: {
                        enabled: false,
                      },
                    }"
                    :series="[
                      {
                        name: 'Income',
                        data: [60, 80, 75, 90, 67, 100, 90, 110, 120],
                      },
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 col-sm-4 mt-sm-0">
            <PlaceholderCard :title="{ variant: 'h6', text: 'New tab' }" />
          </div>
        </div>
        <div class="mt-4 row">
          <div class="col-12">
            <Calendar />
          </div>
        </div>
      </div>
      <div class="mt-4 col-xl-4 col-lg-5 mt-lg-0">
        <div class="row">
          <div class="col-lg-12">
            <BackgroundBlogCard
              :image="backgroundImage"
              title="Hey John!"
              description="Wealth creation is an evolutionarily recent positive-sum game. It is
            all about who take the opportunity first."
              :action="{
                route: '/',
                label: 'Read more',
              }"
            />
          </div>
          <div class="col-lg-12 col-sm-6 mt-4">
            <CategoriesList
              :categories="[
                {
                  icon: {
                    component: 'ni ni-mobile-button',
                    background: 'dark',
                  },
                  label: 'Devices',
                  description: '250 in stock <strong>346+ sold</strong>',
                },
                {
                  icon: {
                    component: 'ni ni-tag',
                    background: 'dark',
                  },
                  label: 'Tickets',
                  description: '123 closed <strong>15 open</strong>',
                },
                {
                  icon: { component: 'ni ni-box-2', background: 'dark' },
                  label: 'Error logs',
                  description: '1 is active <strong>40 closed</strong>',
                },
              ]"
            />
          </div>
          <div class="col-lg-12 col-sm-6">
            <MessageCard
              message="Today is Martina's birthday. Wish her the best of luck!"
              :image="{ url: image, alt: 'Kal' }"
              :action="{
                route: '/',
                label: 'Send message',
                color: 'dark',
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-sm-6">
        <RankingListCard
          :card="{ title: 'Transactions', date: '23 - 30 March 2021' }"
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
            {
              title: 'Partner #22213',
              date: '19 March 2020, at 02:50 AM',
              amount: '+ $ 1,400',
              icon: 'fa-arrow-up',
              color: 'success',
            },
          ]"
        />
      </div>
      <div class="mt-4 col-sm-6 mt-sm-0">
        <RankingListCard
          :card="{ title: 'Revenue', date: '01 - 07 June 2021' }"
          :items="[
            {
              title: 'via PayPal',
              date: '07 June 2021, at 09:00 AM',
              amount: '+ $ 4,999',
              icon: 'fa-arrow-up',
              color: 'success',
            },
            {
              title: 'Partner #90211',
              date: '07 June 2021, at 05:50 AM',
              amount: '+ $ 700',
              icon: 'fa-arrow-up',
              color: 'success',
            },
            {
              title: 'Services',
              date: '07 June 2021, at 07:10 PM',
              amount: '- $ 1,800',
              icon: 'fa-arrow-down',
              color: 'danger',
            },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import backgroundImage from "@/assets/img/ivancik.jpg";
import image from "@/assets/img/kal-visuals-square.jpg";

import CategoriesList from "@/examples/cards/CategoriesList.vue";
import MiniGradientLineChart from "~~/examples/charts/MiniGradientLineChart.vue";
import Calendar from "~~/examples/Calendar.vue";
import BackgroundBlogCard from "~~/pagesComponents/dashboards/crm/BackgroundBlogCard.vue";
import MessageCard from "~~/pagesComponents/dashboards/crm/MessageCard.vue";
import RankingListCard from "@/examples/cards/RankingListCard.vue";
import PlaceholderCard from "@/examples/cards/PlaceholderCard.vue";

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
</script>
