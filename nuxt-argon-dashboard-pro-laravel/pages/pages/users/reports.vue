<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-6 col-12">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-12">
            <ComplexStatisticsCard
              :image="img1"
              icon="text-dark ni ni-circle-08"
              percentage="+55%"
              :count="{ number: 1600, label: 'Active Users' }"
            />
          </div>
          <div class="col-lg-6 col-md-6 col-12">
            <ComplexStatisticsCard
              id="menu1"
              class="mt-md-0 mt-4"
              :image="img2"
              icon="text-dark ni ni-active-40"
              percentage="+124%"
              :count="{ number: 357, label: 'Click Events' }"
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-6 col-md-6 col-12">
            <ComplexStatisticsCard
              id="menu2"
              :image="img3"
              icon="text-dark ni ni-cart"
              percentage="+15%"
              :count="{ number: 2300, label: 'Purchases' }"
            />
          </div>
          <div class="col-lg-6 col-md-6 col-12">
            <ComplexStatisticsCard
              id="menu3"
              class="mt-md-0 mt-4"
              :image="img4"
              icon="text-dark ni ni-like-2"
              percentage="+90%"
              :count="{ number: 940, label: 'Likes' }"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-12 mt-4 mt-md-0">
        <ReviewCard
          title="Reviews"
          description="More than
          <b>1,500,000</b> developers used Creative Tim's products and over
          <b>700,000</b> projects were created."
          :reviews="[
            {
              title: 'Positive Reviews',
              value: 80,
              color: 'info',
            },
            {
              title: 'Neutral Reviews',
              value: 17,
              color: 'dark',
            },
            {
              title: 'Negative Reviews',
              value: 3,
              color: 'danger',
            },
          ]"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <Table />
      </div>
    </div>
  </div>
</template>
<script setup>
import img1 from "@/assets/img/reports1.jpg";
import img2 from "@/assets/img/reports2.jpg";
import img3 from "@/assets/img/reports3.jpg";
import img4 from "@/assets/img/reports4.jpg";
import ComplexStatisticsCard from "~~/examples/cards/ComplexStatisticsCard.vue";
import ReviewCard from "~~/pagesComponents/pages/users/ReviewCard.vue";
import Table from "~~/pagesComponents/pages/users/Table.vue";

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
</script>
