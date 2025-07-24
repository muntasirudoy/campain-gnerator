import { DEFAULT_PAGINATION } from "@/constant/pagination";
import {  apiService } from "@/services/api-service";
import { clientUserRolesService } from "@/services/client/client-user-role-service";

import {
  ClientUser,
  SingleUserWithPermissions,
} from "@/types/client-user-types";

import { PaginationResponse } from "@/types/pagination";
import { defineStore } from "pinia";

export const useRoleStore = defineStore("role", {
  state: () => ({
    roles: [],
    pagination: null as PaginationResponse | null,
    loading: false,
    error: null as string | null,
    all_permissions: [],
    modules: [],
  }),

  actions: {
    async fetchSignlePermissions() {
      this.loading = true;
      this.error = null;
      try {
        const user = await apiService.get<SingleUserWithPermissions>(
          "/clients/users/me"
        );
        this.all_permissions = user.data.all_permissions;
      } catch (e) {
        this.error = e instanceof Error ? e.message : "Unknown error";
      } finally {
        this.loading = false;
      }
    },

    async fetchPermissionsByRoleId(roleId: string | number) {
      this.singleLoader = true;
      this.error = null;
      try {
        const response = await apiService.get<any>(
          `/clients/client-roles/show/${roleId}`
        );
        console.log(response);
        // this.singleLoader = false;
        return response.data.all_permissions || [];
      } catch (e) {
        // this.singleLoader = false;
        this.error =
          e instanceof Error ? e.message : "Failed to load role permissions";
        throw e;
      } finally {
        // this.singleLoader = false;
      }
    },

    async fetchAllPermissionsWithModule() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiService.get("/clients/client-modules/all");
        console.log(response);

        this.modules = response.data;
      } catch (e) {
        this.error =
          e instanceof Error ? e.message : "Failed to load permissions";
      } finally {
        this.loading = false;
      }
    },
    async fetchAllRoleIndex(params: any = DEFAULT_PAGINATION) {
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

        const response = await clientUserRolesService.getAllRole(queryParams);

        this.roles = response.data;
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

    async addRole(roleData: { name: string; permissions: number[] }) {
      this.loading = true;
      this.error = null;
      try {
        const newRole = await apiService.post("/clients/roles", roleData);
        this.roles.push(newRole);
        return newRole;
      } catch (e) {
        this.error = e instanceof Error ? e.message : "Unknown error";
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async updateRole(roleData: {
      id: string | number;
      name: string;
      permissions: number[];
    }) {
      this.loading = true;
      this.error = null;
      try {
        const updatedRole = await apiService.put(
          `/clients/roles/${roleData.id}`,
          roleData
        );
        return updatedRole;
      } catch (e) {
        this.error = e instanceof Error ? e.message : "Unknown error";
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async deleteRole(roleId: string | number) {
      this.loading = true;
      this.error = null;
      try {
        await apiService.delete(`/clients/roles/${roleId}`);
        this.roles = this.roles.filter((role) => role.id !== roleId);
      } catch (e) {
        this.error = e instanceof Error ? e.message : "Unknown error";
        throw e;
      } finally {
        this.loading = false;
      }
    },
  },
});
