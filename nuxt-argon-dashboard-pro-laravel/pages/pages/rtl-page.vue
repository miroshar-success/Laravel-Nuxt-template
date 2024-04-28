<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-3 col-md-6">
        <MiniStatisticsCard
          class="p-0 bg-gradient-dark"
          :title="{ text: 'صحة البطارية', color: 'text-white opacity-7' }"
          :value="{ text: '99 %', color: 'text-white' }"
          :icon="{
            component: 'ni ni-controller text-dark',
            background: 'bg-white',
          }"
        />
        <MiniStatisticsCard
          class="p-0 bg-gradient-dark"
          :title="{
            text: 'طبقة صوت الموسيقا',
            color: 'text-white opacity-7',
          }"
          :value="{ text: '15/100', color: 'text-white' }"
          :icon="{
            component: 'ni ni-note-03 text-dark',
            background: 'bg-white',
          }"
        />
      </div>
      <div class="col-lg-3 col-md-6">
        <LineChart
          title="دخل"
          :value="{
            amount: '$130,832',
            percentage: { value: '+90%', color: 'success' },
          }"
        />
      </div>
      <div class="col-lg-6">
        <ProgressLineChart title="مهام" :count="480" :progress="60" isRTL />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-lg-4 col-sm-6">
        <div class="card">
          <div class="card-header p-3 pb-0">
            <h6 class="mb-0">الأحداث القادمة</h6>
            <p class="text-sm mb-0 text-capitalize font-weight-bold">انضم</p>
          </div>
          <div class="card-body border-radius-lg p-3">
            <DefaultItem
              color="info"
              icon="ni ni-money-coins"
              title="أسبوع الإنترنت"
              description="01 يونيو 2021, ي 12:30 PM"
            />
            <DefaultItem
              class="mt-4"
              color="primary"
              icon="ni ni-bell-55"
              title="لقاء مع ماري"
              description="24 مايو 2021, ي 10:00 PM"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-sm-6">
        <div class="row">
          <div class="col-md-6">
            <DefaultInfoCard
              :icon="{
                component: 'fas fa-landmark',
                background: 'bg-gradient-success',
              }"
              title="مرتب"
              description="تنتمي التفاعلية"
              value="+$2000"
            />
          </div>
          <div class="col-md-6">
            <DefaultInfoCard
              :icon="{
                component: 'fab fa-paypal',
                background: 'bg-gradient-success',
              }"
              title="باي بال"
              description="دفع لحسابهم الخاص"
              value="$455.00"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <MasterCard
          :card="{
            holderText: 'حامل البطاقة',
            expiryText: 'نتهي',
            number: '4562   1122   4594   7852',
            holderName: 'جاك بيترسون',
            expiryDate: '11/22',
            background: 'dark',
          }"
        />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-lg-3 col-md-6">
        <InfoCard
          title="جسم كامل"
          description="ما يهم هو الأشخاص الذين أوقدوه. والناس الذين يشبهونهم مستاءون منه."
          :badge="{ text: 'معتدل', color: 'success' }"
        />
      </div>
      <div class="col-lg-2 col-md-6">
        <ControllerCard
          title="على"
          :image="{
            src: bulbIcon,
            alt: 'علی',
            label: 'درجة حرارة',
          }"
          isRTL
        />
      </div>
      <div class="col-lg-3">
        <LineChart
          title="سعرات حراريه"
          :value="{
            amount: '97',
            percentage: { value: '+5%', color: 'success' },
          }"
        />
      </div>
      <div class="col-lg-2 col-md-6">
        <MiniInfoCard
          :icon="{ component: 'curved-next', background: 'success' }"
          title="754
          <span class='text-sm text-secondary'>م</span>"
          description="مدينة نيويورك"
        />
      </div>
      <div class="col-lg-2 col-md-6">
        <StepsCard
          title="خطوات"
          count="11.4ک"
          :badge="{ label: '+4.3%', color: 'success' }"
        />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-lg-5">
        <Calendar title="تقویم" />
      </div>
      <div class="mt-0 col-lg-3">
        <CategoriesList
          title="فئات"
          :categories="[
            {
              icon: {
                component: 'ni ni-mobile-button',
                background: 'dark',
              },
              label: 'الأجهزة',
              description: '250 في المخزن, <strong>346+ تم البيع</strong>',
            },
            {
              icon: {
                component: 'ni ni-tag',
                background: 'dark',
              },
              label: 'تذاكر',
              description: '123 مغلق, <strong>15 افتح البيع</strong>',
            },
            {
              icon: { component: 'ni ni-box-2', background: 'dark' },
              label: 'سجلات الخطأ',
              description: 'is نشيط, <strong>40 مغلق</strong>',
            },
            {
              icon: { component: 'ni ni-satisfied', background: 'dark' },
              label: 'المستخدمين السعداء',
              description: '+ 430',
            },
          ]"
          isRTL
        />
        <MiniPlayerCard
          color="dark"
          :song="{ label: 'نوع من البلوز', album: 'ديفتونز' }"
        />
      </div>
      <div class="col-lg-4">
        <timeline-list
          class="h-100"
          title="نظرة عامة على الطلبات"
          description="<i class='fa fa-arrow-up text-success' aria-hidden='true'></i>
          <span class='font-weight-bold'>24%</span>هذا الشهر"
        >
          <timeline-item
            :icon="{ component: 'ni ni-bell-55', color: 'success' }"
            title="$2400, تغييرات في التصميم"
            date-time="22 ديسمبر 7:20 مساءً"
          />
          <TimelineItem
            :icon="{ component: 'ni ni-html5', color: 'danger' }"
            title="طلب جديد # 1832412"
            date-time="21 ديسمبر 11 م"
          />
          <TimelineItem
            :icon="{ component: 'ni ni-cart', color: 'info' }"
            title="مدفوعات الخادم لشهر أبريل"
            date-time="21 ديسمبر 9:34 مساءً"
          />
          <TimelineItem
            :icon="{ component: 'ni ni-credit-card', color: 'warning' }"
            title="تمت إضافة بطاقة جديدة للأمر رقم 4395133"
            date-time="20 ديسمبر 2:20 صباحًا"
          />
          <TimelineItem
            :icon="{ component: 'ni ni-key-25', color: 'primary' }"
            title="فتح الحزم من أجل التطوير"
            date-time="18 ديسمبر ، 4:54 صباحًا"
          />
          <TimelineItem
            :icon="{ component: 'ni ni-money-coins', color: 'dark' }"
            title="طلب جديد # 9583120"
            date-time="17 ديسمبر"
          />
        </timeline-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import MiniStatisticsCard from "~~/examples/cards/MiniStatisticsCard.vue";
import ProgressLineChart from "~~/examples/charts/ProgressLineChart.vue";
import LineChart from "~~/examples/charts/LineChart.vue";
import DefaultInfoCard from "~~/examples/cards/DefaultInfoCard.vue";
import MasterCard from "~~/examples/cards/MasterCard.vue";
import DefaultItem from "~~/examples/cards/DefaultItem.vue";
import InfoCard from "~~/examples/cards/InfoCard.vue";
import ControllerCard from "~~/pagesComponents/pages/widgets/ControllerCard.vue";
import MiniInfoCard from "~~/examples/cards/MiniInfoCard.vue";
import StepsCard from "~~/pagesComponents/pages/widgets/StepsCard.vue";
import Calendar from "~~/examples/Calendar.vue";
import CategoriesList from "~~/examples/cards/CategoriesList.vue";
import MiniPlayerCard from "~~/examples/cards/MiniPlayerCard.vue";
import TimelineList from "~~/examples/cards/TimelineList.vue";
import TimelineItem from "~~/examples/cards/TimelineItem.vue";
import bulbIcon from "@/assets/img/small-logos/icon-bulb.svg";

definePageMeta({
  layout: "rtl",
  middleware: ["auth"],
});
</script>
