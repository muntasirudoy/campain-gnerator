
import {
  ClientUser,
  ClientUserCreateRequest,
  ClientUserUpdateRequest
} from "@/types/client-user-types";
import { ApiResponse } from "@/types/common";
import { apiService } from "../api-service";


export const clientUserService = {
  // async list(): Promise<ClientUserListResponse> {
  //   return apiService.get<ClientUserListResponse>("/clients/users");
  // },

  async getAllUsers(params:any ={}): Promise<ApiResponse<ClientUser>> {
    const res = await apiService.get<ClientUser>(`/clients/users/index`,{
      params
    });
    return res
  },
    async getAuthUser(): Promise<ApiResponse<ClientUser>> {
    const res = await apiService.get<ClientUser>(`/clients/users/me`);
    return res
  },
    async getAdminUserClient(): Promise<ApiResponse<{
      id:number,
      name:string
    }>> {
    const res = await apiService.get<{
      id:number,
      name:string
    }>(`/clients/admin-user/client-data`);
    return res
  },
  

  async create(data: ClientUserCreateRequest): Promise<ApiResponse<ClientUser>> {
    return await apiService.post<ClientUser>("/clients/users/store", data);
  },

  async update(id: number, data: ClientUserUpdateRequest): Promise<ApiResponse<ClientUserUpdateRequest>> {
   let res = await apiService.put<ApiResponse<ClientUserUpdateRequest>>(`/clients/users/${id}`, data)
    return res.data
  },

  async delete(id: number): Promise<void> {
    return apiService.delete(`/clients/users/${id}`);
  },
};
