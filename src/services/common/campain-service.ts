import type { Campaign, CampaignPayload, InitialResponse } from "@/types/campaign-types";
import { apiService } from "../api-service";
import { ApiResponse } from "@/types/common";

export const campaignService = {
  async create(payload: CampaignPayload) {
    let res = await apiService.post("/clients/campaigns/store", payload);
    return res;
  },

  async getAllCampaign(params: any = {}): Promise<ApiResponse<Campaign>> {
    const res = await apiService.get<Campaign>(`/clients/campaigns/index`, {
      params,
    });
    return res;
  },

  async getCampaign(id: number): Promise<ApiResponse<Campaign>> {
    const res = await apiService.get<Campaign>(`/clients/campaigns/${id}`);
    return res;
  },

  async updateCampaign(id: number, payload: CampaignPayload): Promise<ApiResponse<Campaign>> {
    const res = await apiService.put<Campaign>(`/clients/campaigns/${id}`, payload);
    return res;
  },



  async submitAboutBusiness(data:any) {
    let res = await apiService.post("/clients", data);
    return res;
  },

    async getInitialData(): Promise<ApiResponse<InitialResponse>> {
    const res = await apiService.get<InitialResponse>(`/clients/users/stepper`);
    return res;
  },


};
