import { clientUserService } from "@/services/client/client-user-service";
import { ClientUser, ClientUserUpdateRequest } from "@/types/client-user-types";
import { PaginationResponse } from "@/types/pagination";
import { defineStore } from "pinia";

export const useClientUserStore = defineStore("users", {
  state: () => ({
    users: [],
    pagination: null as PaginationResponse | null,
    loading: false,
    error: null as string | null,
    authUser: {
      loading: false,
      error: null as string | null,
      data: {} as ClientUser,
    },
  }),

  actions: {
    async fetchAllClientUserIndex(params: any = {}) {
      this.loading = true;
      this.error = null;
      try {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append("page", params.page.toString());
        if (params.per_page)
          queryParams.append("show", params.per_page.toString());
        if (params.search) queryParams.append("search", params.search);
        if (params.sort_by && params.sort_order) {
          queryParams.append("sort[0][field]", params.sort_by);
          queryParams.append("sort[0][direction]", params.sort_order);
        }

        const response = await clientUserService.getAllUsers(queryParams);

        this.users = response.data;
        this.pagination = {
          current_page: response.meta.current_page,
          last_page: response.meta.last_page,
          per_page: response.meta.per_page,
          total: response.meta.total,
          next_page_url: response.links.next,
          prev_page_url: response.links.prev,
          from: response.meta.from,
          to: response.meta.to,
        };
      } catch (e) {
        this.error =
          e instanceof Error ? e.message : "Failed to load permissions";
      } finally {
        this.loading = false;
      }
    },
    async fetchAuthUserInfo() {
      this.authUser.loading = true;
      this.error = null;
      try {
        const response = await clientUserService.getAuthUser();
        this.authUser.loading = false;
        this.authUser.data = response.data;
      } catch {
        this.authUser.loading = false;
      } finally {
        this.authUser.loading = false;
      }
    },
    async updateClientUser(userId: number, values: ClientUserUpdateRequest) {
      this.authUser.loading = true;
      try {
        const response = await clientUserService.update(userId, values);
        if (this.authUser.data && this.authUser.data.id === userId) {
          this.authUser.data = {
            ...this.authUser.data,
            ...values,
          };
        }
        this.authUser.loading = false;
        return response;
      } catch (error) {
        this.authUser.loading = false;
        console.error("Update failed", error);
        throw error;
      }
    },

    resetAuthUser() {
      this.authUser = {
        loading: false,
        error: null,
        data: null,
      };
    },
  },
  persist: true,
});
