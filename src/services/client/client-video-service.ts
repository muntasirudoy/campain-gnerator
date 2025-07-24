import { ApiResponse } from "@/types/common";
import { apiService } from "../api-service";

export const clientVideoService = {
  async getVideoURL(path:string): Promise<any> {
    const res = await apiService.get<ApiResponse<any>>(`/clients/ads/generate-url/download?video_path=${path}`);
    return res;
  },
};
