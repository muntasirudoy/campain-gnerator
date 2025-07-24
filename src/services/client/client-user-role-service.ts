import { ApiResponse, RolesAndPermission } from "@/types/common";
import { apiService } from "../api-service";



export const clientUserRolesService = {


  async getAllRole(params:any ={}): Promise<ApiResponse<RolesAndPermission>> {
    const res = await apiService.get<RolesAndPermission>(`/clients/roles/index`,{
      params
    });
    
    return res
  },

};