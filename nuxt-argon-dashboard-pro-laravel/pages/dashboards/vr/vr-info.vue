<template>
  <div
    class="section min-vh-85 position-relative transform-scale-0 transform-scale-md-7"
  >
    <div class="container-fluid">
      <div class="pt-10 row">
        <div class="pt-5 text-center col-lg-1 col-md-1 pt-lg-0 ms-lg-5">
          <a
            href="javascript:;"
            class="border-0 avatar avatar-md d-block"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="My Profile"
          >
            <img
              class="border-radius-lg"
              alt="Image placeholder"
              src="@/assets/img/team-1.jpg"
            />
          </a>
          <button
            class="p-2 mt-2 btn btn-white border-radius-lg d-block"
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Home"
          >
            <i class="p-2 fas fa-home"></i>
          </button>
          <button
            class="p-2 btn btn-white border-radius-lg d-block"
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Search"
          >
            <i class="p-2 fas fa-search"></i>
          </button>
          <button
            class="p-2 btn btn-white border-radius-lg d-block"
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Minimize"
          >
            <i class="p-2 fas fa-ellipsis-h"></i>
          </button>
        </div>
        <div class="col-lg-8 col-md-11">
          <div class="d-flex">
            <div class="me-auto">
              <h1 class="mb-0 display-1 font-weight-bold mt-n4">128°C</h1>
              <h6 class="mb-0 text-uppercase ms-1">Cloudy</h6>
            </div>
            <div class="ms-auto">
              <img
                class="w-50 float-end mt-lg-n4"
                src="@/assets/img/small-logos/icon-sun-cloud.png"
                alt="image sun"
              />
            </div>
          </div>
          <div class="mt-4 row">
            <div class="col-lg-4 col-md-4">
              <CalendarCard
                :items="[
                  {
                    time: '08:00',
                    description: `Synk up with Mark<small class='text-secondary font-weight-normal'>Hangouts</small>`,
                  },
                  {
                    time: '09:30',
                    description: `Gym<br /><small class='text-secondary font-weight-normal'>World Class</small>`,
                  },
                  {
                    time: '11:00',
                    description: `Design Review<br /><small class='text-secondary font-weight-normal'>Zoom</small>`,
                  },
                ]"
              />
            </div>
            <div class="mt-4 col-lg-4 col-md-4 mt-sm-0">
              <TodoCard :todos="['Shopping', 'Meeting']" />
              <EmailCard />
            </div>
            <div class="mt-4 col-lg-4 col-md-4 mt-sm-0">
              <MiniPlayerCard />
              <MessagesCard
                :messages="[
                  {
                    route: '/',
                    tooltip: '2 New Messages',
                    image: { url: image1, alt: 'Image Placeholder' },
                  },
                  {
                    route: '/',
                    tooltip: '1 New Messages',
                    image: { url: image2, alt: 'Image Placeholder' },
                  },
                  {
                    route: '/',
                    tooltip: '13 New Messages',
                    image: { url: image3, alt: 'Image Placeholder' },
                  },
                  {
                    route: '/',
                    tooltip: '7 New Messages',
                    image: { url: image4, alt: 'Image Placeholder' },
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
import image1 from "@/assets/img/team-1.jpg";
import image2 from "@/assets/img/team-2.jpg";
import image3 from "@/assets/img/team-3.jpg";
import image4 from "@/assets/img/team-4.jpg";
import CalendarCard from "@/pagesComponents/dashboards/vr/CalendarCard.vue";
import MessagesCard from "@/pagesComponents/dashboards/vr/MessagesCard.vue";
import EmailCard from "@/pagesComponents/dashboards/vr/EmailCard.vue";
import TodoCard from "@/pagesComponents/dashboards/vr/TodoCard.vue";
import MiniPlayerCard from "@/examples/cards/MiniPlayerCard.vue";
definePageMeta({
  layout: "vr-layout",
  middleware: ["auth"],
});
export default {
  name: "VrDeFault",
  components: {
    CalendarCard,
    MessagesCard,
    EmailCard,
    TodoCard,
    MiniPlayerCard,
  },
  data() {
    return {
      image1,
      image2,
      image3,
      image4,
    };
  },
};
</script>
