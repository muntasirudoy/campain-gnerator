import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { appConfig } from "../../config/app.config";
import { authService } from "@/services/client/auth-service";
import type {
  ClientUserLogin,
  ClientUserRegistration,
} from "@/types/client-auth-types";
import { useRouter } from "vue-router";
import { useClientUserStore } from "./client-user-store";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const clientUserStore = useClientUserStore()
  const token = ref<string | null>(loadToken());
  const refreshToken = ref<string | null>(loadRefreshToken());
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const isAdmin =ref(JSON.parse(localStorage.getItem('isAdmin')) || false)
  const stepper_count = ref(JSON.parse(localStorage.getItem('stepper_count')) || 0)
  const is_stepper_complete = ref(JSON.parse(localStorage.getItem('is_stepper_complete')) || 0)
  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: ClientUserLogin): Promise<void> {
    try {
      isLoading.value = true;
      error.value = null;
      const response = await authService.login(credentials);
      isAdmin.value = response.data.is_admin == 1 ? true : false
      stepper_count.value = response.data.stepper_count 
      is_stepper_complete.value = response.data.is_stepper_complete
      localStorage.setItem('isAdmin', JSON.stringify(response.data.is_admin == 1 ? true : false));
      localStorage.setItem('stepper_count', JSON.stringify(response.data.stepper_count));
      localStorage.setItem('is_stepper_complete', JSON.stringify(response.data.is_stepper_complete));

      token.value = response.data.access_token;
      localStorage.setItem(appConfig.tokenKey, response.data.access_token);
      clientUserStore.fetchAuthUserInfo()
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Login failed";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(payload: ClientUserRegistration): Promise<void> {
    try {
      isLoading.value = true;
      error.value = null;

      await authService.register(payload);
      router.push("/clients/auth/login"); 
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Registration failed";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout(): Promise<void> {
    try {
      isLoading.value = true;
      await authService.logout();
    } catch (err) {
      console.warn("Logout API call failed:", err);
    } finally {
      token.value = null;
      refreshToken.value = null;
      error.value = null;
      isLoading.value = false;

      localStorage.removeItem(appConfig.tokenKey);
      localStorage.removeItem(appConfig.refreshTokenKey);
      router.push("/");
    }
  }

  function clearError(): void {
    error.value = null;
  }

  function loadToken(): string | null {
    return localStorage.getItem(appConfig.tokenKey);
  }

  function loadRefreshToken(): string | null {
    return localStorage.getItem(appConfig.refreshTokenKey);
  }

  return {
    token,
    refreshToken,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError,
    isAdmin,
    is_stepper_complete,
    stepper_count
  };
});
