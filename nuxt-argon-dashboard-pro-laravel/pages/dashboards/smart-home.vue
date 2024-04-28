<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-7">
        <div class="card">
          <div class="p-3 pb-0 card-header d-flex">
            <h6 class="my-auto">Cameras</h6>
            <div class="nav-wrapper position-relative ms-auto w-50">
              <ul class="p-1 nav nav-pills nav-fill" role="tablist">
                <li class="nav-item">
                  <a
                    class="px-0 py-1 mb-0 nav-link"
                    data-bs-toggle="tab"
                    href="#cam1"
                    role="tab"
                    aria-controls="cam1"
                    aria-selected="false"
                    >Lounge</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="px-0 py-1 mb-0 nav-link active"
                    data-bs-toggle="tab"
                    href="#cam2"
                    role="tab"
                    aria-controls="cam2"
                    aria-selected="true"
                    >Office</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="px-0 py-1 mb-0 nav-link"
                    data-bs-toggle="tab"
                    href="#cam3"
                    role="tab"
                    aria-controls="cam3"
                    aria-selected="false"
                    >Attic</a
                  >
                </li>
              </ul>
            </div>
            <div class="pt-2 dropdown">
              <a
                id="dropdownCam"
                href="#"
                class="text-secondary ps-4"
                :class="{ show: showMenu }"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                @click="showMenu = !showMenu"
              >
                <i class="fas fa-ellipsis-v"></i>
              </a>
              <ul
                class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
                :class="{ show: showMenu }"
                aria-labelledby="dropdownCam"
              >
                <li>
                  <a class="dropdown-item border-radius-md" href="#">Pause</a>
                </li>
                <li>
                  <a class="dropdown-item border-radius-md" href="#">Stop</a>
                </li>
                <li>
                  <a class="dropdown-item border-radius-md" href="#"
                    >Schedule</a
                  >
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item border-radius-md text-danger" href="#"
                    >Remove</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="p-3 mt-2 card-body">
            <div id="v-pills-tabContent" class="tab-content">
              <div
                id="cam1"
                class="tab-pane fade show position-relative active height-400 border-radius-lg"
                role="tabpanel"
                aria-labelledby="cam1"
                style="
                  background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/smart-home-1.jpg');
                  background-size: cover;
                "
              >
                <div class="top-0 position-absolute d-flex w-100">
                  <p class="p-3 mb-0 text-white">17.05.2021 4:34PM</p>
                  <div class="p-3 ms-auto">
                    <span class="badge badge-secondary">
                      <i class="fas fa-dot-circle text-danger"></i>
                      Recording
                    </span>
                  </div>
                </div>
              </div>
              <div
                id="cam2"
                class="tab-pane fade position-relative height-400 border-radius-lg"
                role="tabpanel"
                aria-labelledby="cam2"
                style="
                  background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/smart-home-2.jpg');
                  background-size: cover;
                "
              >
                <div class="top-0 position-absolute d-flex w-100">
                  <p class="p-3 mb-0 text-white">17.05.2021 4:35PM</p>
                  <div class="p-3 ms-auto">
                    <span class="badge badge-secondary">
                      <i class="fas fa-dot-circle text-danger"></i>
                      Recording
                    </span>
                  </div>
                </div>
              </div>
              <div
                id="cam3"
                class="tab-pane fade position-relative height-400 border-radius-lg"
                role="tabpanel"
                aria-labelledby="cam3"
                style="
                  background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/smart-home-3.jpg');
                  background-size: cover;
                "
              >
                <div class="top-0 position-absolute d-flex w-100">
                  <p class="p-3 mb-0 text-white">17.05.2021 4:57PM</p>
                  <div class="p-3 ms-auto">
                    <span class="badge badge-secondary">
                      <i class="fas fa-dot-circle text-danger"></i>
                      Recording
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 col-xl-5 ms-auto mt-xl-0">
        <div class="row">
          <div class="col-12">
            <WeatherCard />
          </div>
        </div>
        <div class="mt-4 row">
          <div class="col-md-6">
            <DefaultCounterCard
              color="success"
              :count="21"
              suffix=" °C"
              title="Living Room"
              description="Temperature"
            />
          </div>
          <div class="mt-4 col-md-6 mt-md-0">
            <DefaultCounterCard
              color="success"
              :count="44"
              suffix=" %"
              title="Outside"
              description="Humidity"
            />
          </div>
        </div>
        <div class="mt-4 row">
          <div class="col-md-6">
            <DefaultCounterCard
              color="success"
              :count="87"
              suffix=" m³"
              title="Water"
              description="Consumption"
            />
          </div>
          <div class="mt-4 col-md-6 mt-md-0">
            <DefaultCounterCard
              color="success"
              :count="417"
              suffix=" GB"
              title="Internet"
              description="All devices"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-lg-6 ms-auto">
        <ReportsDoughnutChart
          title="Consumption per room"
          tooltip="See the consumption per room"
          :count="{ number: 471.3, text: 'WATTS' }"
          :chart-options="{
            chart: {
              type: 'donut',
            },
            labels: ['Living Room', 'Attic', 'Basement', 'Kitchen', 'Garage'],
            colors: ['#2152ff', '#3A416F', '#f53939', '#a8b8d8', '#4BB543'],
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                },
              },
            ],
          }"
          :series="[15, 20, 13, 32, 20]"
        />
      </div>
      <div class="mt-4 col-lg-6 mt-lg-0">
        <div class="row">
          <div class="col-sm-6">
            <ThinBarChart />
          </div>
        </div>
      </div>
    </div>
    <hr class="my-5 horizontal dark" />
    <div class="row">
      <div class="col-lg-2 col-sm-6">
        <ControllerCard
          :item="{
            state: false,
            label: { text: 'Humidity', class: 'mt-4' },
            description: 'Inactive since: 2 days',
          }"
        >
          <Humidity />
        </ControllerCard>
      </div>
      <div class="mt-4 col-lg-2 col-sm-6 mt-lg-0">
        <ControllerCard
          class="text-white bg-gradient-success"
          :item="{
            state: true,
            label: { text: 'Temperature', class: 'mt-2' },
            description: 'Active',
          }"
        >
          <Temperature />
        </ControllerCard>
      </div>
      <div class="mt-4 col-lg-2 col-sm-6 mt-lg-0">
        <ControllerCard
          :item="{
            state: false,
            label: { text: 'Air Conditioner', class: 'mt-4' },
            description: 'Inactive since: 1 hour',
          }"
        >
          <Weather />
        </ControllerCard>
      </div>
      <div class="mt-4 col-lg-2 col-sm-6 mt-lg-0">
        <ControllerCard
          :item="{
            state: false,
            label: { text: 'Lights', class: 'mt-4' },
            description: 'Inactive since: 27 min',
          }"
        >
          <Lights />
        </ControllerCard>
      </div>
      <div class="mt-4 col-lg-2 col-sm-6 mt-lg-0">
        <ControllerCard
          class="text-white bg-gradient-success"
          :item="{
            state: true,
            label: { text: 'Wi-fi', class: 'mt-4' },
            description: 'Active',
          }"
        >
          <Wifi />
        </ControllerCard>
      </div>
      <div class="mt-4 col-lg-2 col-sm-6 mt-sm-0">
        <PlaceholderCard :title="{ text: 'New Device', variant: 'h5' }" />
      </div>
    </div>
  </div>
</template>

<script setup>
import WeatherCard from "~~/pagesComponents/dashboards/smartHome/WeatherCard.vue";
import DefaultCounterCard from "~~/examples/cards/DefaultCounterCard.vue";
import ReportsDoughnutChart from "~~/examples/charts/ReportsDoughnutChart.vue";
import ThinBarChart from "~~/examples/charts/ThinBarChart.vue";
import ControllerCard from "~~/examples/cards/ControllerCard.vue";
import PlaceholderCard from "~~/examples/cards/PlaceholderCard.vue";

import setNavPills from "@/assets/js/nav-pills.js";

const showMenu = ref(false);
onMounted(() => {
  setNavPills();
});
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
</script>
