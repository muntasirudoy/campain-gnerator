import { Ad } from "./ad-types";
import { PaymentSettings } from "./client-billing-type";

export type Campaign = {
  id: number;
  name: string;
  goal: {
    id: number;
    name: string;
  };
  out_url: string;
  type: string;
  format_ads: {
    value: number;
    label: string;
  };
  bid_strategy: {
    value: number;
    label: string;
  };
  budget_type: {
    value: number;
    label: string;
  };
  budget: string;
  start_time: string; // e.g., ISO datetime string
  end_time: string;
  location: {
    value: number;
    label: string;
  };
  status: {
    value: number;
    label: string;
  };
  created_at: string;
};

export interface CampaignCreate {
  businessName: string;
  businessRegister: string;

  selectedGoal: number;
  selectedVideo: string;
  campaignName: "";
  dailyBudget: {
    frequency: "string";
    startDate: string;
    endDate: string;
    amount: string;
  };
  campaignAudience: {
    gender: string;
    age: number;
  };
  campaignLocation: string;
  paymentMethod: string;
  cardNumber: number;
  billingAddress: string;
}

export interface CampaignPayload {
  name: string;
  goal_id: number;
  out_url: string;
  type: string;
  format_ads: number;
  bid_strategy: number;
  budget_type: number;
  budget: string;
  start_time: string;
  end_time: string;
  location: number;
}

export interface InitialResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  is_admin: number;
  stepper_count: number;
  is_stepper_complete: number;
  client: Client;
  campaign: Campaign;
  ad: Ad;
  paymentSetting: {
    billing_country: {
      value: number;
      label: string;
    };
    currency: {
      value: number;
      label: string;
    };
    time_zone: {
      value: string;
      label: string;
    };
  };

  paymentProfile: any[];
  billingProfile: any[];
}

interface Client {
  id: number;
  name: string;
}
