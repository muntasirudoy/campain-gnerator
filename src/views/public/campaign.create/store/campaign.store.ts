import { BillingProfile, PaymentProfile } from "@/types/client-billing-type";
import { defineStore } from "pinia";

// ✅ Interfaces
interface BusinessInfo {
  businessName: string;
}

interface GoalCampaign {
  goal_id: number;
  name: string;
  budget_type: number;
  budget: string;
  start_time: string;
  end_time: string;
  location: number;
  out_url: string;
  type: string;
  format_ads: number;
  bid_strategy: number;
  id?: number | null;
}

interface Audience {
  gender: string;
  age_group: number;
}

interface AdSettings {
  name: string;
  audiences: Audience[];
  video_url: string;
}

interface PaymentSettings {
  billing_country: number | "";
  currency: number | "";
  time_zone: string;
}

// ✅ New Interface for Billing Info
interface BillingInfo {
  full_name: string;
  address: string;
  city: string;
  postal_code: string;
  phone: string;
}
type PaymentProfileMerged = PaymentProfile & BillingProfile;

export interface OnboardingState {
  businessInfo: BusinessInfo;
  goalCampaign: GoalCampaign;
  adSettings: AdSettings;
  paymentSettings: PaymentSettings;
  paymentProfile: PaymentProfileMerged;
  snapshots: Record<string, any>;
}

// ✅ Store
export const useOnboardingStore = defineStore("onboarding", {
  state: (): OnboardingState => ({
    businessInfo: { businessName: "" },
    goalCampaign: {
      goal_id: 1,
      name: "",
      budget_type: 1,
      budget: "",
      start_time: "",
      end_time: "",
      location: 1,
      out_url: "",
      type: "Video ads",
      format_ads: 1,
      bid_strategy: 1,
      id: null,
    },
    adSettings: {
      name: "",
      audiences: [{ gender: "", age_group: 1 }],
      video_url: "",
    },
    paymentSettings: {
      billing_country: "",
      currency: "",
      time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    paymentProfile: {
      legal_name: "",
      street_address: "",
      detail_address: "",
      city_district: "",
      postal_code: "",
      province: 0,
      image: "",
      payment_setting_id: 1,
      contact_name: "",
      phone: "",
      email: [""],
    },
    snapshots: {},
  }),

  actions: {
    updateSection<T extends keyof OnboardingState>(
      section: T,
      data: Partial<OnboardingState[T]>
    ) {
      Object.assign(this[section], data);
    },

    resetStore() {
      this.$reset();
    },

    setAll(data: OnboardingState) {
      this.$state = data;
    },

    saveSnapshot(section: keyof OnboardingState) {
      this.snapshots[section as string] = JSON.parse(
        JSON.stringify(this[section])
      );
    },

    hasChanged(section: keyof OnboardingState) {
      const current = JSON.stringify(this[section]);
      const last = JSON.stringify(this.snapshots[section as string] || {});
      return current !== last;
    },
  },
});
