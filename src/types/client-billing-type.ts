export type BillingPayload = {
  payment_method_id?: number;
  billing_country: number;
  time_zone: string;
  currency: number;
  offer_code?: string;
};

export type BillingProfile = {
  id?: number;
  payment_setting_id: number;
  contact_name: string;
  phone: string;
  email: [""];
  client_id?: 1;
};
export type PaymentSettings = {
  id?: number;
  client_id?: number;
  payment_method_id: number;
  payment_method_name: string | null;
  billing_country: number;
  billing_country_name: string;
  time_zone: string;
  time_zone_name: string;
  currency: number;
  currency_name: string;
  offer_code: string | null;
  created_at: string;
  updated_at: string;
};
export interface PaymentProfile {
  id?: number;
  client_id?: number;
  legal_name: string;
  street_address: string;
  detail_address: string;
  city_district: string;
  province: number;
  postal_code: string | number;
  image: string;
  payment_setting_id: number;
  created_at?: string;
  updated_at?: string;
}

export type ClientBillingDetails = {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_image: string;
  created_at: string;
  clients: {
    id: number;
    name: string;
    registared_country_id: number | null;
    created_at: string;
    updated_at: string;
  };
  payment_settings: PaymentSettings;
  payment_profiles: PaymentProfile;
  billing_profiles: BillingProfile;
};

export type PaymentProfileResponse = {
  id: number;
  legal_name: string;
  street_address: string;
  detail_address: string;
  city_district: string;
  province: {
    value: string;
    label: string;
  };
  postal_code: string;
  image: string;
  payment_setting_id: string;
  client_id: number;
  created_at: string;
};
