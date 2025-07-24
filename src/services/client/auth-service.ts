import { apiService } from "../api-service"
import {
  ClientUserLogin,
  ClientUserLoginResponse,
  ClientUserRegisterResponse,
  ClientUserRegistration,
} from "@/types/client-auth-types"
import { authManager } from "../auth-manager"
import { ApiResponse } from "@/types/common"

export const authService = {
  async login(credentials: ClientUserLogin): Promise<ApiResponse<ClientUserLoginResponse>> {
    return apiService.post<ClientUserLoginResponse>(
      "/clients/users/login",
      credentials
    )
  },

  async logout(): Promise<void> {
    try {
      await apiService.post("/clients/users/logout")
    } catch (e) {
      console.warn("Logout failed", e)
    } finally {
      authManager.logout('/auth/client/login')
    }
  },

  async register(userData: ClientUserRegistration): Promise< ApiResponse<ClientUserRegisterResponse>> {
    return apiService.post<ClientUserRegisterResponse>(
      "/clients/users/register",
      userData
    )
  },

  async forgotPassword(email: string) {
    return apiService.post("/clients/users/forgot-password", { email })
  },

  async resetPassword(data: {
    email: string
    password: string
    password_confirmation: string
    token: string
  }) {
    return apiService.post("/clients/users/reset-forgot-password", data)
  },
}
