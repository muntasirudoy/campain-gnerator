import { Ad } from '@/types/ad-types';
import { PaymentSettings } from '@/types/client-billing-type';
import { defineStore, StoreDefinition } from 'pinia';

// ✅ State Interfaces
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


export interface OnboardingState {
  businessInfo: BusinessInfo;
  goalCampaign: GoalCampaign;
  adSettings: Pick<Ad,'audiences' |  'name' | 'video_url' >; 
  paymentSettings: Pick<PaymentSettings,'billing_country'|'time_zone'|'currency'>;
}

// ✅ Actions Interface
interface OnboardingActions {
  updateSection<T extends keyof OnboardingState>(
    section: T,
    data: Partial<OnboardingState[T]>
  ): void;

  persistData(): void;
  loadData(): void;
  resetStore(): void;
  getAll(): Record<string, any>;
}

// ✅ Define the store with full typing
export const useOnboardingStore: StoreDefinition<
  'onboarding',
  OnboardingState,
  {},
  OnboardingActions
> = defineStore('onboarding', {
  state: (): OnboardingState => ({
    businessInfo: { businessName: '' },
    goalCampaign: {
      goal_id: 1,
      name: '',
      budget_type: 1,
      budget: '',
      start_time: '',
      end_time: '',
      location: 1,
      out_url: 'https://example.com',
      type: 'Video ads',
      format_ads: 1,
      bid_strategy: 1,
      id: null,
    },
    adSettings: {
      name: '',
      audiences: [{ gender: '', age_group: 1 }],
      video_url: '',

    },
    paymentSettings: { 
      billing_country: 1,
      currency: 1,
      time_zone:'Asia/Dhaka'     },
  }),

  actions: {
    updateSection<T extends keyof OnboardingState>(
      section: T,
      data: Partial<OnboardingState[T]>
    ) {
      console.log(section,data);
      
      if (!this[section]) return;
      Object.assign(this[section], data);
    },

    getAll() {
      return {
        ...this.businessInfo,
        ...this.goalCampaign,
        ...this.adSettings,
        ...this.paymentSettings,
      };
    },

    resetStore() {
      this.$reset();
    },

    persistData() {
      localStorage.setItem('onboardingData', JSON.stringify(this.$state));
    },

    loadData() {
      const savedData = localStorage.getItem('onboardingData');
      if (savedData) {
        this.$patch(JSON.parse(savedData));
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }],
  },
});
