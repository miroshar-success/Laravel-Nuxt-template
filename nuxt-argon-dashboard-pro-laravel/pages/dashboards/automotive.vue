<template>
  <div class="py-4 container-fluid">
    <div class="mt-4 row">
      <div class="col-12">
        <CardDetail />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-lg-3 col-md-6 col-12">
        <MiniStatisticsCard
          class="bg-success"
          :title="{ text: 'Today\'s Trip', color: 'opacity-7 text-white' }"
          :value="{ text: '145 Km', color: 'text-white' }"
          :icon="{
            component: 'ni ni-money-coins text-dark',
            background: 'bg-white',
            shape: 'rounded-circle',
          }"
        />
      </div>
      <div class="mt-4 col-lg-3 col-md-6 col-12 mt-md-0">
        <MiniStatisticsCard
          class="bg-success"
          :title="{ text: 'Battery Health', color: 'opacity-7 text-white' }"
          :value="{ text: '99 %', color: 'text-white' }"
          :icon="{
            component: 'ni ni-controller text-dark',
            background: 'bg-white',
            shape: 'rounded-circle',
          }"
        />
      </div>
      <div class="mt-4 col-lg-3 col-md-6 col-12 mt-lg-0">
        <MiniStatisticsCard
          class="bg-success"
          :title="{ text: 'Average Speed', color: 'opacity-7 text-white' }"
          :value="{ text: '56 Km/h', color: 'text-white' }"
          :icon="{
            component: 'ni ni-delivery-fast text-dark',
            background: 'bg-white',
            shape: 'rounded-circle',
          }"
        />
      </div>
      <div class="mt-4 col-lg-3 col-md-6 col-12 mt-lg-0">
        <MiniStatisticsCard
          class="bg-success"
          :title="{ text: 'Music Volume', color: 'opacity-7 text-white' }"
          :value="{ text: '15/100', color: 'text-white' }"
          :icon="{
            component: 'ni ni-note-03 text-dark',
            background: 'bg-white',
            shape: 'rounded-circle',
          }"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <PlayerCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import CardDetail from "~~/pagesComponents/dashboards/automotive/CardDetail.vue";
import MiniStatisticsCard from "~~/examples/cards/MiniStatisticsCard.vue";
import PlayerCard from "~~/pagesComponents/dashboards/automotive/PlayerCard.vue";
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
</script>
