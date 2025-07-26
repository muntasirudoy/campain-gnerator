// src/router/routes/client-routes.ts
import type { RouteRecordRaw } from "vue-router";

const clientRoutes: RouteRecordRaw[] = [
  {
    path: "/client",
    component: () => import("../../layouts/client/ClientLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: { name: "ClientOverview" },
      },
      {
        path: "overview",
        name: "ClientOverview",
        component: () =>
          import("../../views/dashboard/modules/client/overview/Overview.vue"),
      },
      {
        path: "campaigns",
        name: "CampaignsList",
        component: () =>
          import(
            "../../views/dashboard/modules/client/campaigns/Campaigns.vue"
          ),
      },
      {
        path: "campaigns/create",
        name: "CampaignCreate",
        component: () =>
          import(
            "../../views/dashboard/modules/client/campaigns/campaign.create/CampaignCreate.vue"
          ),
      },

      {
        path: "campaigns/:id",
        name: "CampaignDetails",
        component: () =>
          import(
            "../../views/dashboard/modules/client/campaigns/campaign.details/CampaignDetails.vue"
          ),
      },
      {
        path: "campaigns/:id/edit",
        name: "CampaignEdit",
        component: () =>
          import(
            "../../views/dashboard/modules/client/campaigns/campaign.edit/CampaignEdit.vue"
          ),
      },
      {
        path: "ads",
        name: "AdsList",
        component: () =>
          import("../../views/dashboard/modules/client/ads/Ads.vue"),
      },
      {
        path: "ads/:id",
        name: "AdsDetails",
        component: () =>
          import(
            "../../views/dashboard/modules/client/ads/ads.details/AdsDetails.vue"
          ),
      },
      {
        path: "ads/:id/edit",
        name: "AdsEdit",
        component: () =>
          import(
            "../../views/dashboard/modules/client/ads/ads.edit/AdsEdit.vue"
          ),
      },
      {
        path: "ads/create",
        name: "AdCreate",
        meta: { transition: "slide-left" },
        component: () =>
          import(
            "../../views/dashboard/modules/client/ads/ad.create/AdCreate.vue"
          ),
      },
      {
        path: "billing-details",
        name: "Billing",
        component: () =>
          import("../../views/dashboard/modules/client/billing/Billing.vue"),
      },
      {
        path: "billing",
        name: "BillingEdit",
        component: () =>
          import(
            "../../views/dashboard/modules/client/billing/billing.edit/BillingEdit.vue"
          ),
      },
      {
        path: "accounts",
        name: "Accounts",
        component: () =>
          import("../../views/dashboard/modules/client/account/Accounts.vue"),
      },
      {
        path: "users",
        name: "Users",
        component: () =>
          import(
            "../../views/dashboard/modules/client/users/user.list/Users.vue"
          ),
      },
      {
        path: "roles",
        name: "Roles",
        component: () =>
          import("../../views/dashboard/modules/client/users/roles/Roles.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () =>
          import("../../views/dashboard/modules/client/settings/settings.vue"),
      },
    ],
  },
  {
    path: "/create-campaign",
    component: () =>
      import("../../views/public/campaign.create/CampaignCreate.vue"),
    name: "CreateCampaignPublic",
    meta: { requiresAuth: true },
  },
];

export default clientRoutes;
