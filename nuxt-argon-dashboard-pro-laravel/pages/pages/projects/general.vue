<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-8 col-12">
        <div class="row">
          <div class="col-lg-4 col-12">
            <StatisticsCard
              title="Earnings"
              count="$15,800"
              :badge="{ color: 'dark', label: '+15% since last week' }"
              description="They're slowed down by their perception of themselves."
              :action="{
                route: 'https://creative-tim.com',
                label: 'View more',
              }"
            />
          </div>
          <div class="mt-4 col-lg-4 col-md-6 col-12 mt-lg-0">
            <MiniStatisticsCard
              title="Today's Money"
              value="$87,000"
              description="<span
                  class='text-sm font-weight-bolder text-success'
                  >+12%</span> since last month"
              :icon="{
                component: 'ni ni-money-coins',
                background: 'bg-gradient-dark',
                shape: 'rounded-circle',
              }"
            />
            <MiniStatisticsCard
              title="Sessions"
              value="9,600"
              description="<span
                  class='text-sm font-weight-bolder text-success'
                  >+2%</span> since last week"
              :icon="{
                component: 'ni ni-planet',
                background: 'bg-gradient-dark',
                shape: 'rounded-circle',
              }"
            />
          </div>
          <div class="mt-4 col-lg-4 col-md-6 col-12 mt-lg-0">
            <MiniStatisticsCard
              title="Today's Users"
              value="2,300"
              description="<span
                  class='text-sm font-weight-bolder text-danger'
                  >-1%</span> since last week"
              :icon="{
                component: 'ni ni-world',
                background: 'bg-gradient-dark',
                shape: 'rounded-circle',
              }"
            />
            <MiniStatisticsCard
              title="Sign-ups"
              value="348"
              description="<span
                  class='text-sm font-weight-bolder text-success'
                  >+12%</span> since last month"
              :icon="{
                component: 'ni ni-shop',
                background: 'bg-gradient-dark',
                shape: 'rounded-circle',
              }"
            />
          </div>
        </div>
      </div>
      <div class="mt-4 col-lg-4 col-12 mt-lg-0">
        <AnnouncementCard
          title="I need a Ruby developer for my new website."
          description="The website was initially built in PHP, I need a professional ruby programmer to shift it."
          :by="{
            image: image,
            name: 'lucas prila',
            date: '2h ago',
          }"
          :badge="{ color: 'success', label: 'Recommendation' }"
          :value="{ currency: '$', amount: '3,000', method: 'month' }"
          :action="{ route: 'javascript:;', label: 'Apply' }"
        />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-lg-8 col-12">
        <TodoList
          :header="{ title: 'To do list', dateTime: '23 -30 March 2020' }"
          :todos="[
            {
              todo: 'Check status',
              date: '24 March 2019',
              id: '#2414_VR4sf3',
              company: 'Creative Tim',
              action: [
                { route: 'javascript:;', label: 'Action' },
                { route: 'javascript:;', label: 'Some other action' },
              ],
            },
            {
              todo: 'Management discussion',
              date: '24 March 2019',
              id: '#4411_8sIsdd23',
              company: 'Apple',
              isComplete: true,
              action: [
                { route: 'javascript:;', label: 'Action' },
                { route: 'javascript:;', label: 'Some other action' },
              ],
            },
            {
              todo: 'New channel distribution',
              date: '25 March 2019',
              id: '#827d_kdl33D1s',
              company: 'Slack',
              isComplete: true,
              action: [
                { route: 'javascript:;', label: 'Action' },
                { route: 'javascript:;', label: 'Some other action' },
              ],
            },
            {
              todo: 'IOS App development',
              date: '26 March 2019',
              id: '#88s1_349DA2sa',
              company: 'Facebook',
              isComplete: false,
              action: [
                { route: 'javascript:;', label: 'Action' },
                { route: 'javascript:;', label: 'Some other action' },
              ],
            },
          ]"
        />
      </div>
      <div class="mt-4 col-lg-4 col-12 mt-lg-0">
        <ProgressLineChart title="Tasks" :count="480" :progress="60" />
        <ProgressDoughnutChart title="Projects" :count="115" />
      </div>
    </div>
  </div>
</template>

<script setup>
import StatisticsCard from "@/pagesComponents/pages/projects/StatisticsCard.vue";
import MiniStatisticsCard from "@/examples/cards/MiniStatisticsCard.vue";
import AnnouncementCard from "@/pagesComponents/pages/projects/AnnouncementCard.vue";
import ProgressLineChart from "@/examples/charts/ProgressLineChart.vue";
import ProgressDoughnutChart from "@/pagesComponents/pages/projects/ProgressDoughnutChart.vue";
import TodoList from "@/pagesComponents/pages/projects/TodoList.vue";
import image from "@/assets/img/team-3.jpg";

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
</script>
