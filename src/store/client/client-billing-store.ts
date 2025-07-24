import { useToast } from "@/composeable/useToast";
import { clientBillingService } from "@/services/client/client-billing-service";
import {
  BillingPayload,
  BillingProfile,
  ClientBillingDetails,
  PaymentProfile,
  PaymentSettings,
} from "@/types/client-billing-type";
import { defineStore } from "pinia";

export const useBillingStore = defineStore("billing", {
  state: () => ({
    billingProfile: {} as BillingProfile,
    paymentProfile: {} as PaymentProfile,
    paymentSettings: {} as PaymentSettings,
    isBilling: false,
    isLoading: false,
  }),

  actions: {
    async createBillingProfile(payload: BillingPayload) {
      this.isLoading = true;
      const { showToast } = useToast();
      try {
        const response = await clientBillingService.createBilling(payload);
        this.billingProfile.data = response.data;
        this.isLoading = false;
        this.isBilling = true;
        showToast(response.message, "", "success");
        return response;
      } catch (e) {
        this.isLoading = false;
        showToast("Failed to save!", "", "error");
        return e;
      } finally {
        this.isLoading = false;
      }
    },
    async getClientPaymentInfo() {
      try {
        const response = await clientBillingService.getPaymentInfo();
        if (response.data.payment_settings) {
          this.isBilling = true;
        }

        this.billingProfile = response.data.billing_profiles;
        this.paymentProfile = response.data.payment_profiles;
        this.paymentSettings = response.data.payment_settings;

        return response;
      } catch (er) {}
    },
    async createPaymentProfile(payload: any) {
      this.isLoading = true;
      const { showToast } = useToast();
      try {
        const response = await clientBillingService.createPaymentProfile(
          payload
        );
        this.paymentProfile = response.data;
        showToast(response.message, "", "success");
        return response;
      } catch (e) {
        showToast("Failed to create payment profile!", "", "error");
        return e;
      } finally {
        this.isLoading = false;
      }
    },
    async updatePaymentProfile(payload: any) {
      this.isLoading = true;
      const { showToast } = useToast();
      try {
        const response = await clientBillingService.updatePaymentProfile(
          payload
        );
        this.paymentProfile = response.data;
        showToast(response.message, "", "success");
        return response;
      } catch (e) {
        showToast("Failed to create payment profile!", "", "error");
        return e;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
