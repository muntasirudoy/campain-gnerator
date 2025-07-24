<template>
  <div class="space-y-4 mt-6">
    <div class="flex items-center justify-between">
      <Input
        v-model="searchQuery"
        placeholder="Search campaign..."
        class="max-w-[350px] form-input"
      />
      <div class="flex items-center space-x-2">
        <Select v-model="pageSize">
          <SelectTrigger
            class="w-[120px] font-primary !h-[40px] rounded-[3px] bg-white"
          >
            <SelectValue placeholder="Per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectLabel>Per Page</SelectLabel>
            <SelectItem v-for="size in [5, 10, 20]" :key="size" :value="size">{{
              size
            }}</SelectItem>
          </SelectContent>
        </Select>
        <RouterLink :to="`/client/ads/create?campaignId=${route.params.id}`">
          <Button class="px-10 py-1.5 btn !mx-0 text-[14px]">+ New AD</Button>
        </RouterLink>
      </div>
    </div>

    <div class="rounded-lg border bg-white">
      <Table>
        <TableHeader class="h-[55px]">
          <TableRow class="bg-table-header">
            <TableHead class="cursor-pointer" @click="handleSort('name')">
              Ad`s Name
              <span v-if="sortBy.startsWith('name')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>

            <TableHead class="cursor-pointer"> Campaign </TableHead>

            <TableHead class="cursor-pointer"> Creation Time </TableHead>
            <TableHead class="cursor-pointer" @click="handleSort('status')">
              Status
              <span v-if="sortBy.startsWith('status')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>
            <TableHead class="cursor-pointer"> Audience </TableHead>

            <TableHead class="text-left pr-5">Video URL</TableHead>
            <TableHead class="text-right pr-5">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="!loading">
            <TableRow
              v-for="ad in adStore.ads"
              :key="ad.id"
              :class="selectedUsers.includes(ad.id) ? 'bg-muted/50' : ''"
            >
              <TableCell class=" ">
                <RouterLink
                  :to="`/client/campaigns/${ad.id}`"
                  class="flex items-center space-x-3"
                >
                  <p class="font-medium font-secondary-Regular text-left">
                    {{ ad.name }}
                  </p>
                </RouterLink>
              </TableCell>
              <TableCell class="text-left font-secondary-Regular">
                {{ ad.campaign.name }}
              </TableCell>
              <TableCell class="text-left font-secondary-Regular">
                {{ formatDate(ad.created_at) }}
              </TableCell>
              <TableCell class="text-left font-secondary-Regular">
                {{ ad.status.label }}
              </TableCell>
              <TableCell class="text-left font-secondary-Regular">
                <ul class="space-y-1 text-sm">
                  <li v-for="(a, i) in ad.audiences" :key="i">
                    {{ a.gender.label }} ({{ a.age_group.label }})
                  </li>
                </ul>
              </TableCell>
              <TableCell class="text-left max-w-[180px] truncate">
                {{ ad.video_url }}
              </TableCell>
              <TableCell class="text-right pr-5 space-x-2">
                <!-- <RouterLink :to="`/client/ads/${ad.id}`">
                  <Button
                    variant="outline"
                    size="sm"
                    class="!bg-white !text-black px-3 py-1 btn"
                  >
                    <Eye /> View
                  </Button>
                </RouterLink> -->

                <Dialog v-model:open="isModalOpen">
                  <DialogTrigger @click="handleOnEdit(ad.id)">
                    <Button
                      variant="outline"
                      size="sm"
                      class="!bg-white !text-black px-3 py-1 btn"
                    >
                      <Eye /> View
                    </Button>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-[700px] mr-4">
                    <DialogHeader>
                      <DialogTitle>Ad Details</DialogTitle>
                    </DialogHeader>
                    <ScrollArea class="h-full max-h-[85vh] no-scrollbar">
                      <AdsDetailsCard :adInfo="adInfo" :isLoading="isLoading" />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>

                <RouterLink :to="`/client/ads/${ad.id}/edit`">
                  <Button variant="default" size="sm" class="px-3 py-1 btn">
                    <Pencil /> Edit
                  </Button>
                </RouterLink>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
      <TableSkelton v-if="loading" :rows="pageSize" :columns="7" />
    </div>
    <ConfirmDelete
      :open="isDeleteModalOpen"
      title="Confirm Delete"
      description="Are you sure you want to delete this user? This action cannot be undone."
      @update:open="isDeleteModalOpen = $event"
      @cancel="isDeleteModalOpen = false"
      @confirm="deleteUserConfirmed"
    />

    <Pagination
      v-if="adStore.ads.length > 0"
      :current-page="currentPage"
      :last-page="adStore.pagination?.last_page || 1"
      :total="adStore.pagination?.total || 0"
      :per-page="pageSize"
      :from="adStore.pagination?.from"
      :to="adStore.pagination?.to"
      @page-change="setPage"
    />
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useClientUserStore } from "@/store/client/client-user-store";

import Pagination from "@/views/dashboard/components/Pagination.vue";
// import UserCreate from "../user.create/UserCreate.vue";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import { useSearchQuary } from "@/composeable/userSearchQuary";
import { clientUserService } from "@/services/client/client-user-service";
import { useAdsStore } from "@/store/common/ads-store";
import { useRoleStore } from "@/store/common/role-permission-store";
import ConfirmDelete from "@/views/dashboard/components/ConfirmDelete.vue";
import TableSkelton from "@/views/dashboard/components/TableSkelton.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DialogTrigger from "@/components/ui/dialog/DialogTrigger.vue";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDateTime } from "@/composeable/useDateTime";
import { adService } from "@/services/common/ads-service";
import { Eye, Pencil } from "lucide-vue-next";
import AdsDetailsCard from "../ads.details/AdsDetailsCard.vue";
import { AdResponse } from "@/types/ad-types";
const adStore = useAdsStore();
const clientRoles = useRoleStore();
const isModalOpen = ref(false);
const selectedUsers = ref<number[]>([]);
const loading = ref(false);
const adInfo = ref<AdResponse>();
const isLoading = ref(false);
const route = useRoute();
const { formatDate } = useDateTime();
const {
  searchQuery,
  debouncedSearch,
  currentPage,
  pageSize,
  sortBy,
  buildApiParams,
  setPage,
  setSort,
} = useSearchQuary();

const isDeleteModalOpen = ref(false);
const userToDelete = ref<number | null>(null);

async function deleteUserConfirmed() {
  if (userToDelete.value === null) return;

  try {
    await clientUserService.delete(userToDelete.value);
    fetchAds();
  } finally {
    isDeleteModalOpen.value = false;
    userToDelete.value = null;
  }
}
const handleOnEdit = async (id: number) => {
  isLoading.value = true;
  try {
    let response = await adService.getAd(id);
    adInfo.value = response.data;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
  }
};

const handleSort = (field: string) => {
  const [currField, currDir] = sortBy.value.split(":");
  const nextDir = currField === field && currDir === "asc" ? "desc" : "asc";
  setSort(`${field}:${nextDir}`);
};

const fetchAds = async () => {
  loading.value = true;
  try {
    await adStore.fetchAllAdsIndex(buildApiParams());
  } finally {
    loading.value = false;
  }
};

watch([debouncedSearch, currentPage, pageSize, sortBy], fetchAds);

onMounted(() => {
  fetchAds();
  clientRoles.fetchAllRoleIndex();
});
</script>
