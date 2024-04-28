<template>
  <div id="sidenav-collapse-main" class="collapse navbar-collapse w-auto h-auto h-100">
    <ul class="navbar-nav">
      <li class="nav-item">
        <SidenavCollapse collapse-ref="dashboardsExamples" nav-text="Dashboards"
          :class="getRoute === 'dashboards' ? 'active' : ''">
          <template #icon>
            <i class="ni ni-shop text-primary text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <SidenavItem to="/dashboards/landing" mini-icon="L" text="Landing" />
              <SidenavItem to="/dashboards/default" mini-icon="D" text="Default" />
              <SidenavItem to="/dashboards/automotive" mini-icon="A" text="Automotive" />
              <SidenavItem to="/dashboards/smart-home" mini-icon="S" text="Smart Home" />
              <SidenavCollapseItem refer="vrExamples" mini-icon="V" text="Virtual Reality">
                <template #nav-child-item>
                  <SidenavItem to="/dashboards/vr/vr-default" mini-icon="V" text="VR Default" />
                  <SidenavItem to="/dashboards/vr/vr-info" mini-icon="V" text="VR Info" />
                </template>
              </SidenavCollapseItem>
              <SidenavItem to="/dashboards/crm" mini-icon="C" text="CRM" />
            </ul>
          </template>
        </SidenavCollapse>
      </li>
      <li class="mt-3 nav-item">
        <h6 class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6" :class="isRTL ? 'me-4' : 'ms-2'">
          PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse collapse-ref="apiExamples" nav-text="Examples (API)"
          :class="getRoute === 'examples' ? 'active' : ''">
          <template #icon>
            <i class="fab fa-vuejs text-success text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <SidenavItem to="/examples/user-profile" mini-icon="U" text="User Profile" />
              <SidenavItem v-if="authStore.userRole === 'admin'" to="/examples/role-management/list-roles" mini-icon="R" text="Role Management" />
              <SidenavItem v-if="authStore.userRole === 'admin'" to="/examples/user-management/list-users" mini-icon="U" text="User Management" />
              <SidenavItem v-if="authStore.userRole === 'admin' || authStore.userRole === 'creator'" to="/examples/tag-management/list-tags" mini-icon="T" text="Tag Management" />
              <SidenavItem v-if="authStore.userRole === 'admin' || authStore.userRole === 'creator'" to="/examples/category-management/list-categories" mini-icon="C" text="Category Management" />
              <SidenavItem to="/examples/item-management/list-items" mini-icon="I" text="Item Management" />
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse collapse-ref="pagesExamples" nav-text="Pages" :class="getRoute === 'pages' ? 'active' : ''">
          <template #icon>
            <i class="ni ni-ungroup text-warning text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <SidenavCollapseItem refer="profileExample" mini-icon="P" text="Profile">
                <template #nav-child-item>
                  <SidenavItem to="/pages/profile/profile-overview" mini-icon="P" text="Profile Overview" />
                  <SidenavItem to="/pages/profile/teams" mini-icon="T" text="Teams" />
                  <SidenavItem to="/pages/profile/all-projects" mini-icon="A" text="All Projects" />
                </template>
              </SidenavCollapseItem>

              <SidenavCollapseItem refer="usersExample" mini-icon="U" text="Users">
                <template #nav-child-item>
                  <SidenavItem to="/pages/users/reports" mini-icon="R" text="Reports" />
                  <SidenavItem to="/pages/users/new-user" mini-icon="N" text="New User" />
                </template>
              </SidenavCollapseItem>

              <SidenavCollapseItem refer="accountExample" mini-icon="A" text="Account">
                <template #nav-child-item>
                  <SidenavItem to="/pages/account/settings" mini-icon="S" text="Settings" />
                  <SidenavItem to="/pages/account/billing" mini-icon="B" text="Billing" />
                  <SidenavItem to="/pages/account/invoice" mini-icon="I" text="Invoice" />
                  <SidenavItem to="/pages/account/security" mini-icon="S" text="Security" />
                </template>
              </SidenavCollapseItem>

              <SidenavCollapseItem refer="projectsExample" mini-icon="P" text="Projects">
                <template #nav-child-item>
                  <SidenavItem to="/pages/projects/general" mini-icon="G" text="General" />
                  <SidenavItem to="/pages/projects/timeline" mini-icon="T" text="Timeline" />
                  <SidenavItem to="/pages/projects/new-project" mini-icon="N" text="New Project" />
                </template>
              </SidenavCollapseItem>

              <SidenavItem to="/pages/pricing-page" mini-icon="P" text="Pricing Page" />
              <SidenavItem to="/pages/rtl-page" mini-icon="R" text="RTL" />
              <SidenavItem to="/pages/widgets" mini-icon="W" text="Widgets" />
              <SidenavItem to="/pages/charts" mini-icon="C" text="Charts" />
              <SidenavItem to="/pages/sweet-alerts" mini-icon="S" text="Sweet Alerts" />
              <SidenavItem to="/pages/notifications" mini-icon="N" text="Notifications" />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse collapse-ref="applicationsExamples" nav-text="Applications"
          :class="getRoute === 'applications' ? 'active' : ''">
          <template #icon>
            <i class="ni ni-ui-04 text-info text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <SidenavItem to="/applications/wizard" mini-icon="W" text="Wizard" />
              <SidenavItem to="/applications/data-tables" mini-icon="D" text="Data Tables" />
              <SidenavItem to="/applications/calendar" mini-icon="C" text="Calendar" />
              <SidenavItem to="/applications/analytics" mini-icon="A" text="Analytics" />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse collapse-ref="ecommerceExamples" nav-text="Ecommerce"
          :class="getRoute === 'ecommerce' ? 'active' : ''">
          <template #icon>
            <i class="ni ni-archive-2 text-success text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <SidenavItem to="/ecommerce/overview" mini-icon="O" text="Overview" />

              <SidenavCollapseItem refer="productsExample" mini-icon="P" text="Products">
                <template #nav-child-item>
                  <SidenavItem to="/ecommerce/products/new-product" mini-icon="N" text="New Product" />
                  <SidenavItem to="/ecommerce/products/edit-product" mini-icon="E" text="Edit Product" />
                  <SidenavItem to="/ecommerce/products/product-page" mini-icon="P" text="Product page" />
                  <SidenavItem to="/ecommerce/products/product-list" mini-icon="P" text="Products List" />
                </template>
              </SidenavCollapseItem>

              <SidenavCollapseItem refer="ordersExample" mini-icon="O" text="Orders">
                <template #nav-child-item>
                  <SidenavItem to="/ecommerce/orders/order-list" mini-icon="O" text="Order List" />
                  <SidenavItem to="/ecommerce/orders/order-details" mini-icon="O" text="Order Details" />
                </template>
              </SidenavCollapseItem>
              <SidenavItem to="/ecommerce/referral" mini-icon="R" text="Referral" />
            </ul>
          </template>
        </sidenav-collapse>
      </li>

      <li class="nav-item">
        <sidenav-collapse collapse-ref="authExamples" nav-text="Authentication"
          :class="getRoute === 'authentication' ? 'active' : ''">
          <template #icon>
            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <SidenavCollapseItem refer="signinExample" mini-icon="S" text="Sign In">
                <template #nav-child-item>
                  <SidenavItem to="/authentication/signin/basic" mini-icon="B" text="Basic" />
                  <SidenavItem to="/authentication/signin/cover" mini-icon="C" text="Cover" />
                  <SidenavItem to="/authentication/signin/illustration" mini-icon="I" text="Illustration" />
                </template>
              </SidenavCollapseItem>

              <SidenavCollapseItem refer="signupExample" mini-icon="S" text="Sign Up">
                <template #nav-child-item>
                  <SidenavItem to="/authentication/signup/basic" mini-icon="B" text="Basic" />
                  <SidenavItem to="/authentication/signup/cover" mini-icon="C" text="Cover" />
                  <SidenavItem to="/authentication/signup/illustration" mini-icon="I" text="Illustration" />
                </template>
              </SidenavCollapseItem>

              <SidenavCollapseItem refer="resetExample" mini-icon="R" text="Reset Password">
                <template #nav-child-item>
                  <SidenavItem to="/authentication/reset/basic" mini-icon="B" text="Basic" />
                  <SidenavItem to="/authentication/reset/cover" mini-icon="C" text="Cover" />
                  <SidenavItem to="/authentication/reset/illustration" mini-icon="I" text="Illustration" />
                </template>
              </SidenavCollapseItem>

              <SidenavCollapseItem refer="lockExample" mini-icon="L" text="Lock">
                <template #nav-child-item>
                  <SidenavItem to="/authentication/lock/basic" mini-icon="B" text="Basic" />
                  <SidenavItem to="/authentication/lock/cover" mini-icon="C" text="Cover" />
                  <SidenavItem to="/authentication/lock/illustration" mini-icon="I" text="Illustration" />
                </template>
              </SidenavCollapseItem>

              <SidenavCollapseItem refer="StepExample" mini-icon="2" text="2-Step Verification">
                <template #nav-child-item>
                  <SidenavItem to="/authentication/verification/basic" mini-icon="B" text="Basic" />
                  <SidenavItem to="/authentication/verification/cover" mini-icon="C" text="Cover" />
                  <SidenavItem to="/authentication/verification/illustration" mini-icon="I" text="Illustration" />
                </template>
              </SidenavCollapseItem>

              <SidenavCollapseItem refer="errorExample" mini-icon="E" text="Error">
                <template #nav-child-item>
                  <SidenavItem to="/authentication/error/error404" mini-icon="E" text="Error 404" />
                  <SidenavItem to="/authentication/error/error500" mini-icon="E" text="Error 500" />
                </template>
              </SidenavCollapseItem>
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="mt-3 nav-item">
        <hr class="mt-0 horizontal dark" />
        <h6 class="text-xs ps-4 ms-2 text-uppercase font-weight-bolder opacity-6" :class="isRTL ? 'me-4' : 'ms-2'">
          DOCS
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse collapse-ref="basicExamples" nav-text="Basic" :class="getRoute === 'basic' ? 'active' : ''">
          <template #icon>
            <i class="ni ni-spaceship text-sm" :class="sidenavType"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <SidenavCollapseItem refer="gettingStartedExample" mini-icon="G" text="Getting Started">
                <template #nav-child-item>
                  <li class="nav-item">
                    <a class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/nuxt/quick-start/argon-dashboard/" target="_blank">
                      <span class="text-xs sidenav-mini-icon">Q</span>
                      <span class="sidenav-normal">Quick Start</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/license/argon-dashboard/"
                      target="_blank">
                      <span class="text-xs sidenav-mini-icon">L</span>
                      <span class="sidenav-normal">License</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/overview/argon-dashboard/"
                      target="_blank">
                      <span class="text-xs sidenav-mini-icon">C</span>
                      <span class="sidenav-normal">Contents</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link"
                      href="https://www.creative-tim.com/learning-lab/nuxt/build-tools/argon-dashboard/" target="_blank">
                      <span class="text-xs sidenav-mini-icon">B</span>
                      <span class="sidenav-normal">Build Tools</span>
                    </a>
                  </li>
                </template>
              </SidenavCollapseItem>

              <SidenavCollapseItem refer="foundationExample" mini-icon="F" text="Foundation">
                <template #nav-child-item>
                  <li class="nav-item">
                    <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/colors/argon-dashboard/"
                      target="_blank">
                      <span class="text-xs sidenav-mini-icon">C</span>
                      <span class="sidenav-normal">Colors</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/grid/argon-dashboard/"
                      target="_blank">
                      <span class="text-xs sidenav-mini-icon">G</span>
                      <span class="sidenav-normal">Grid</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/typography/argon-dashboard/"
                      target="_blank">
                      <span class="text-xs sidenav-mini-icon">T</span>
                      <span class="sidenav-normal">Typography</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/icons/argon-dashboard/"
                      target="_blank">
                      <span class="text-xs sidenav-mini-icon">I</span>
                      <span class="sidenav-normal">Icons</span>
                    </a>
                  </li>
                </template>
              </SidenavCollapseItem>
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse collapse-ref="componentsExamples" nav-text="Components"
          :class="getRoute === 'components' ? 'active' : ''">
          <template #icon>
            <i class="ni ni-app text-sm" :class="sidenavType"></i>
          </template>
          <template #list>
            <ul class="nav ms-4">
              <li class="nav-item">
                <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/alerts/argon-dashboard/"
                  target="_blank">
                  <span class="sidenav-mini-icon">A</span>
                  <span class="sidenav-normal">Alerts</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/Avatar/argon-dashboard/"
                  target="_blank">
                  <span class="sidenav-mini-icon">A</span>
                  <span class="sidenav-normal">Avatar</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/badge/argon-dashboard/"
                  target="_blank">
                  <span class="sidenav-mini-icon">B</span>
                  <span class="sidenav-normal">Badge</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/buttons/argon-dashboard/"
                  target="_blank">
                  <span class="sidenav-mini-icon">B</span>
                  <span class="sidenav-normal">Buttons</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/input/argon-dashboard/"
                  target="_blank">
                  <span class="sidenav-mini-icon">I</span>
                  <span class="sidenav-normal">Input</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/checkbox/argon-dashboard/"
                  target="_blank">
                  <span class="sidenav-mini-icon">C</span>
                  <span class="sidenav-normal">Checkbox</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/pagination/argon-dashboard/"
                  target="_blank">
                  <span class="sidenav-mini-icon">P</span>
                  <span class="sidenav-normal">Pagination</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/progress/argon-dashboard/"
                  target="_blank">
                  <span class="sidenav-mini-icon">P</span>
                  <span class="sidenav-normal">Progress</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/progress/argon-dashboard/"
                  target="_blank">
                  <span class="sidenav-mini-icon">P</span>
                  <span class="sidenav-normal">Progress</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/snackbar/argon-dashboard/"
                  target="_blank">
                  <span class="sidenav-mini-icon">S</span>
                  <span class="sidenav-normal">Snackbar</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://www.creative-tim.com/learning-lab/nuxt/snackbar/argon-dashboard/"
                  target="_blank">
                  <span class="sidenav-mini-icon">S</span>
                  <span class="sidenav-normal">Social Button</span>
                </a>
              </li>
            </ul>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse nav-text="Changelog" :collapse="false" url="#" :aria-controls="''"
          collapse-ref="https://github.com/creativetimofficial/ct-nuxt-argon-dashboard-pro-laravel/blob/master/CHANGELOG.md">
          <template #icon>
            <i class="ni ni-align-left-2 text-sm" :class="sidenavType"></i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
  <div class="mt-3 sidenav-footer">
    <SidenavCard :card="{
      title: 'Need Help?',
      description: 'Please check our docs',
      links: [
        {
          label: 'Documentation',
          route:
            'https://www.creative-tim.com/learning-lab/vue/overview/argon-dashboard/',
          color: 'dark',
        },
        {
          label: 'Buy now',
          route:
            'https://www.creative-tim.com/product/nuxt-argon-dashboard-pro-laravel?ref=vadp',
          color: 'success',
        },
      ],
    }" />
  </div>
</template>
<script setup>
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCollapseItem from "./SidenavCollapseItem.vue";
import SidenavCard from "./SidenavCard.vue";
import SidenavItem from "./SidenavItem.vue";
import { useNavStore } from "~~/stores/NavStore";
import { useAuthStore } from "~~/stores/AuthStore";
const navStore = useNavStore();
const authStore = useAuthStore();

if(!authStore.currentUser && authStore.checkIsAuthenticated()) {
  await authStore.getProfile();
}

const sidenavType = computed(() => {
  return navStore.sidenavType === "bg-white" ? "text-dark" : "text-white";
});
const getRoute = computed(() => {
  const route = useRoute();
  return route.path.split("/")[1];
});
defineProps({
  isRTL: {
    type: Boolean,
    default: false,
  },
});
</script>
