import type { Ad, AdPayload, AdResponse } from "@/types/ad-types";
import { apiService } from "../api-service";
import type { ApiResponse } from "@/types/common";

export const adService = {
  async create(payload: FormData): Promise<ApiResponse<Ad>> {
    return await apiService.post<Ad>("/clients/ads/store", payload);
  },

  async getAllAds(params: any = {}): Promise<ApiResponse<AdResponse>> {
    return await apiService.get<AdResponse>("/clients/ads/index", { params });
  },

  async getAd(id: number): Promise<ApiResponse<AdResponse>> {
    return await apiService.get<AdResponse>(`/clients/ads/${id}`);
  },

  async adsVideoUpload(payload: FormData): Promise<ApiResponse<any>> {
    return await apiService.post<Ad>("/clients/ads/generate-url/upload", payload);
  },
  async adsVideoUploadOnS3(payload, url:string): Promise<ApiResponse<any>> {
    return await apiService.post<Ad>("/clients/ads/generate-url/upload", payload);
  },
  async update(id: number, payload: any): Promise<ApiResponse<AdResponse>> {
  return await apiService.put<ApiResponse<AdResponse>>(`/clients/ads/${id}`, payload);
}
};
