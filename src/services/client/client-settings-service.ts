import { ApiResponse } from "@/types/common";
import { apiService } from "../api-service";
type UploadImage = {
    id:number,
    name:string,
    profile_image:string
  }
export const clientProfileSettingsService = {
  async uploadProfileImage(image: FormData, id: number): Promise<any> {
    const res = await apiService.post<ApiResponse<UploadImage>>(`clients/users/${id}/profile-image`, image);
    return res;
  },
};
