<template>
  <div
    class="section min-vh-85 position-relative transform-scale-0 transform-scale-md-6"
  >
    <div class="container ms-n0 ms-lg-n5">
      <div class="row">
        <div class="mb-4 col-lg-12 mb-lg-0 position-relative z-index-2">
          <div class="mb-4 card card-plain">
            <div class="p-3 card-body">
              <div class="row">
                <div class="col-lg-6">
                  <div class="d-flex flex-column h-100">
                    <h2
                      class="font-weight-bolder mb-0mt-4 fadeIn1 fadeInBottom"
                    >
                      General Statistics
                    </h2>
                    <div class="d-flex align-items-center">
                      <h6 class="mb-0 font-weight-bolder fadeIn4 fadeInBottom">
                        All users
                      </h6>
                      <a
                        class="mt-1 mb-0 text-sm text-primary font-weight-bold icon-move-right ms-4 fadeIn4 fadeInBottom"
                        href="javascript:;"
                      >
                        Read More
                        <i
                          class="text-sm fas fa-arrow-right ms-1"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </div>
                    <h1 class="mb-0 font-weight-bolder fadeIn4 fadeInBottom">
                      1,600,000
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <MiniStatisticsCard
                class="fadeIn1 fadeInBottom"
                content-class="ms-0"
                title="Today's Money"
                value="$53,000"
                description="<span
                  class='text-sm font-weight-bolder text-success'
                  >+55%</span> since yesterday"
                :icon="{
                  component: 'ni ni-money-coins',
                  background: 'bg-gradient-primary',
                  shape: 'rounded-circle',
                }"
              />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <MiniStatisticsCard
                class="fadeIn2 fadeInBottom"
                content-class="ms-0"
                title="Today's Users"
                value="2,300"
                description="<span
                  class='text-sm font-weight-bolder text-success'
                  >+3%</span> since last week"
                :icon="{
                  component: 'ni ni-world',
                  background: 'bg-gradient-danger',
                  shape: 'rounded-circle',
                }"
              />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <MiniStatisticsCard
                class="fadeIn3 fadeInBottom"
                title="New Clients"
                content-class="ms-0"
                value="+3,462"
                description="<span
                  class='text-sm font-weight-bolder text-danger'
                  >-2%</span> since last quarter"
                :icon="{
                  component: 'ni ni-paper-diploma',
                  background: 'bg-gradient-success',
                  shape: 'rounded-circle',
                }"
              />
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <MiniStatisticsCard
                class="fadeIn4 fadeInBottom"
                title="Sales"
                value="$103,430"
                description="<span
                  class='text-sm font-weight-bolder text-success'
                  >+5%</span> than last month"
                :icon="{
                  component: 'ni ni-cart',
                  background: 'bg-gradient-warning',
                  shape: 'rounded-circle',
                }"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
              <MemberCard
                :members="[
                  {
                    image: team1,
                    profile: { name: 'John Michael', link: 'javascript:;' },
                    badge: { label: 'Online', color: 'success' },
                  },
                  {
                    image: team2,
                    profile: { name: 'Alex Smith', link: 'javascript:;' },
                    badge: { label: 'In meeting', color: 'danger' },
                  },
                  {
                    image: team5,
                    profile: { name: 'Samantha Ivy', link: 'javascript:;' },
                    badge: { label: 'Offline', color: 'danger' },
                  },
                  {
                    image: team4,
                    profile: { name: 'John Michael', link: 'javascript:;' },
                    badge: { label: 'Online', color: 'success' },
                  },
                ]"
              />
            </div>
            <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <TodoList
                :todos="[
                  {
                    label: 'Call with Dave',
                    dateTime: '09:30 AM',
                    isChecked: true,
                  },
                  {
                    label: 'Brunch Meeting',
                    dateTime: '11:00 AM',
                  },
                  {
                    label: 'Argon Dashboard Launch',
                    dateTime: '02:00 PM',
                  },
                  {
                    label: 'Winter Hackaton',
                    dateTime: '10:30 AM',
                    isChecked: true,
                  },
                ]"
              />
            </div>
            <div class="col-lg-4 col-md-6">
              <ProgressTrackCard
                title="Progress track"
                :list="[
                  {
                    brand: { logo: jira, link: 'javascript:;' },
                    label: 'React Material Dashboard',
                    progress: { percentage: 90, color: 'primary' },
                  },
                  {
                    brand: { logo: asana, link: 'javascript:;' },
                    label: 'Argon Design System',
                    progress: { percentage: 60, color: 'warning' },
                  },
                  {
                    brand: { logo: spotify, link: 'javascript:;' },
                    label: 'VueJs Now UI Kit PRO',
                    progress: { percentage: 100, color: 'success' },
                  },
                  {
                    brand: { logo: bootstrap, link: 'javascript:;' },
                    label: 'Soft UI Dashboard',
                    progress: { percentage: 72, color: 'primary' },
                  },
                ]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image2 from "@/assets/img/img-2.jpg";
import image1 from "@/assets/img/img-1.jpg";
import image3 from "@/assets/img/img-3.jpg";

import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team5 from "@/assets/img/team-5.jpg";
import team4 from "@/assets/img/team-4.jpg";

import jira from "@/assets/img/small-logos/logo-jira.svg";
import asana from "@/assets/img/small-logos/logo-asana.svg";
import spotify from "@/assets/img/small-logos/logo-spotify.svg";
import bootstrap from "@/assets/img/small-logos/bootstrap.svg";
import invision from "@/assets/img/small-logos/logo-invision.svg";
import slack from "@/assets/img/small-logos/logo-slack.svg";
import adobe from "@/assets/img/small-logos/logo-xd.svg";

import MiniStatisticsCard from "@/examples/cards/MiniStatisticsCard.vue";
import MemberCard from "~~/pagesComponents/dashboards/default/MemberCard.vue";
import ProgressTrackCard from "~~/pagesComponents/dashboards/default/ProgressTrackCard.vue";
import TodoList from "~~/pagesComponents/dashboards/default/TodoList.vue";

definePageMeta({
  layout: "vr-layout",
  middleware: ["auth"],
});
export default {
  name: "VrDeFault",
  components: { MemberCard, ProgressTrackCard, TodoList, MiniStatisticsCard },
  data() {
    return {
      image2,
      image1,
      image3,
      team1,
      team2,
      team5,
      team4,
      jira,
      asana,
      spotify,
      bootstrap,
      invision,
      slack,
      adobe,
    };
  },
};
</script>
