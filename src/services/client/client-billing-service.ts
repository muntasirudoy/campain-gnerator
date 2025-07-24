import { ClientUser } from "@/types/client-user-types";
import { ApiResponse } from "@/types/common";
import { apiService } from "../api-service";
import {
  BillingPayload,
  ClientBillingDetails,
  PaymentProfileResponse,
} from "@/types/client-billing-type";

export const clientBillingService = {
  async getBillingDetails(): Promise<ApiResponse<ClientUser>> {
    const res = await apiService.get<ClientUser>(`/clients/users/me`);
    return res;
  },
  async createBilling(
    data: BillingPayload
  ): Promise<ApiResponse<BillingPayload>> {
    const res = await apiService.post<BillingPayload>(
      `/clients/payment-settings/store`,
      data
    );
    return res;
  },
  async getPaymentInfo(): Promise<ApiResponse<ClientBillingDetails>> {
    const res = await apiService.get<ClientBillingDetails>(
      `/clients/users/clients/payment-info`
    );
    return res;
  },
  async createPaymentProfile(
    formData: FormData
  ): Promise<ApiResponse<PaymentProfileResponse>> {
    const res = await apiService.post<PaymentProfileResponse>(
      `/clients/payment-profiles/store`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res;
  },
  async updatePaymentProfile(
    formData: FormData
  ): Promise<ApiResponse<PaymentProfileResponse>> {
    const res = await apiService.post<PaymentProfileResponse>(
      `/clients/payment-profiles`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res;
  },
};
