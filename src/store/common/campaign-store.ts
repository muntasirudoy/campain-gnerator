import { defineStore } from "pinia";

import { campaignService } from "@/services/common/campain-service";
import type { CampaignPayload } from "@/types/campaign-types";
import { type Campaign } from "@/types/campaign-types";
import { PaginationResponse } from "@/types/pagination";
export const useCampaignStore = defineStore("campaign", {
  state: () => ({
    loading: false,
    error: null as string | null,
    success: false,
    campaigns: [] as Campaign[],
    pagination: null as PaginationResponse | null,
    message:''
  }),

  actions: {
    async fetchAllCampaignIndex(params: any = {}) {
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

        const response = await campaignService.getAllCampaign(queryParams);

        this.campaigns = response.data;
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
    async createCampaign(payload: CampaignPayload) {
      this.loading = true;
      this.error = null;
      this.success = false;

      try {
        let res = await campaignService.create(payload);
        this.success = true;
          this.message = res.message
        return res;
      } catch (err: any) {
        
        this.error = err.response?.data?.message || "Failed to create campaign";
        return err;
      } finally {
        this.loading = false;
      }
    },
    async updateCampaign(id: number, payload: CampaignPayload) {
  
      this.loading = true;
      this.error = null;
      this.success = false;

      try {
        const res = await campaignService.updateCampaign(id, payload);
        console.log(res);
        
        this.success = true;
        this.message = res.message
        return res;
      } catch (err: any) {
        this.error = err.response?.data?.message || "Failed to update campaign";
        return err;
      } finally {
        this.loading = false;
      }
    },
  },
});
