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
        <RouterLink to="/client/campaigns/create">
          <Button class="btn">+ Add New Campaign</Button>
        </RouterLink>
      </div>
    </div>

    <div class="rounded-lg border bg-white">
      <Table>
        <TableHeader class="h-[55px]">
          <TableRow class="bg-table-header">
            <TableHead class="cursor-pointer" @click="handleSort('name')">
              Campain Name
              <span v-if="sortBy.startsWith('name')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>

            <TableHead class="cursor-pointer" @click="handleSort('budget')">
              Budget
              <span v-if="sortBy.startsWith('budget')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span> </TableHead
            ><TableHead
              class="cursor-pointer"
              @click="handleSort('budget_type')"
            >
              Budget Type
              <span v-if="sortBy.startsWith('budget_type')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>
            <TableHead class="cursor-pointer" @click="handleSort('status')">
              Status
              <span v-if="sortBy.startsWith('status')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>
            <TableHead class="cursor-pointer" @click="handleSort('is_admin')">
              Live Ads
              <span v-if="sortBy.startsWith('is_admin')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>
            <TableHead class="cursor-pointer" @click="handleSort('is_admin')">
              Active Devices
              <span v-if="sortBy.startsWith('is_admin')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>
            <TableHead class="cursor-pointer" @click="handleSort('is_admin')">
              Video Plays
              <span v-if="sortBy.startsWith('is_admin')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>
            <TableHead class="cursor-pointer" @click="handleSort('is_admin')">
              Impressions
              <span v-if="sortBy.startsWith('is_admin')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>
            <TableHead class=" pr-5">Average CPP</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="!loading">
            <TableRow
              v-for="campaign in campainStore.campaigns"
              :key="campaign.id"
              :class="selectedUsers.includes(campaign.id) ? 'bg-muted/50' : ''"
            >
              <TableCell>
                <RouterLink
                  :to="`/client/campaigns/${campaign.id}`"
                  class="flex items-center space-x-3 capitalize"
                >
                  <p class="font-medium font-secondary-Regular text-left">
                    {{ campaign.name }}
                  </p>
                </RouterLink>
              </TableCell>
              <TableCell class="text-left font-secondary-Regular">
                {{ campaign.budget }} .tk
              </TableCell>
              <TableCell class="text-left font-secondary-Regular">
                {{ campaign.budget_type.label }}
              </TableCell>

              <TableCell class="text-left">{{
                campaign.status.label
              }}</TableCell>
              <TableCell class="text-left">{{ 0 }}</TableCell>
              <TableCell class="text-left"> 0 </TableCell>
              <TableCell class="text-left"> 0 </TableCell>
              <TableCell class="text-left"> 0 </TableCell>
              <TableCell class="text-left"> 0 </TableCell>
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
      v-if="campainStore.campaigns.length > 0"
      :current-page="currentPage"
      :last-page="campainStore.pagination?.last_page || 1"
      :total="campainStore.pagination?.total || 0"
      :per-page="pageSize"
      :from="campainStore.pagination?.from"
      :to="campainStore.pagination?.to"
      @page-change="setPage"
    />
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

import { useRoleColor } from "@/composeable/useRoleColor";
import { useSearchQuary } from "@/composeable/userSearchQuary";
import { clientUserService } from "@/services/client/client-user-service";
import { useCampaignStore } from "@/store/common/campaign-store";
import { useRoleStore } from "@/store/common/role-permission-store";
import ConfirmDelete from "@/views/dashboard/components/ConfirmDelete.vue";
import TableSkelton from "@/views/dashboard/components/TableSkelton.vue";
import { computed, onMounted, ref, watch } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
const { getRoleBadgeColor } = useRoleColor();
const campainStore = useCampaignStore();
const clientRoles = useRoleStore();
const isModalOpen = ref(false);
const selectedUsers = ref<number[]>([]);
const loading = ref(false);
const userToEdit = ref(null);
const isEdit = ref(false);
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

const onClose = () => {
  isModalOpen.value = false;
};
function openEditUser(user: any) {
  userToEdit.value = user;
  isModalOpen.value = true;
  isEdit.value = true;
}
const isDeleteModalOpen = ref(false);
const userToDelete = ref<number | null>(null);

function confirmDeleteUser(id: number) {
  userToDelete.value = id;
  isDeleteModalOpen.value = true;
}

async function deleteUserConfirmed() {
  if (userToDelete.value === null) return;

  try {
    await clientUserService.delete(userToDelete.value);
    fetchUsers();
  } finally {
    isDeleteModalOpen.value = false;
    userToDelete.value = null;
  }
}

const allSelected = computed(
  () =>
    campainStore?.campaigns?.length > 0 &&
    selectedUsers.value.length === campainStore?.campaigns?.length
);
const handleSort = (field: string) => {
  const [currField, currDir] = sortBy.value.split(":");
  const nextDir = currField === field && currDir === "asc" ? "desc" : "asc";
  setSort(`${field}:${nextDir}`);
};
function toggleUserSelection(id: number, checked: boolean) {
  if (checked) {
    if (!selectedUsers.value.includes(id)) selectedUsers.value.push(id);
  } else {
    selectedUsers.value = selectedUsers.value.filter((uid) => uid !== id);
  }
}

function toggleSelectAll(checked: boolean) {
  if (checked) {
    selectedUsers.value = campainStore?.campaigns?.map((user) => user.id);
  } else {
    selectedUsers.value = [];
  }
}

const fetchUsers = async () => {
  loading.value = true;
  try {
    await campainStore.fetchAllCampaignIndex(buildApiParams());
  } finally {
    loading.value = false;
  }
};

watch([debouncedSearch, currentPage, pageSize, sortBy], fetchUsers);

onMounted(() => {
  fetchUsers();
  clientRoles.fetchAllRoleIndex();
});
</script>
