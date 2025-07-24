<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center justify-between">
      <div
        class="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm"
      >
        <Select v-model="pageSize">
          <SelectTrigger class="w-[120px] font-primary !h-[43px] rounded-[3px]">
            <SelectValue placeholder="Per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectLabel>Per Page</SelectLabel>
            <SelectItem v-for="size in [1, 2, 3]" :key="size" :value="size">{{
              size
            }}</SelectItem>
          </SelectContent>
        </Select>
        <Input
          v-model="searchQuery"
          placeholder="Search User"
          class="w-64 form-input"
        />
      </div>

      <div class="flex items-center space-x-2">
        <Dialog >
          <DialogTrigger as-child>
            <Button class="btn">+ Add New User</Button>
          </DialogTrigger>
          <DialogContent class="p-0" v-if="!isEdit">
            <UserCreate
              :isOpen="isModalOpen"
              :user-to-edit="null"
              :isEdit="isEdit"
              @close="onClose"
              @created="fetchUsers"
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>

    <div class="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>

            <TableHead class="cursor-pointer max-w-[350px]" @click="handleSort('name')">
              User
              <span v-if="sortBy.startsWith('name')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>
            <TableHead>Assigned Roles</TableHead>
            <TableHead class="cursor-pointer" @click="handleSort('email')">
              Email
              <span v-if="sortBy.startsWith('email')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>
            <TableHead class="cursor-pointer" @click="handleSort('phone')">
              Phone
              <span v-if="sortBy.startsWith('phone')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>
            <TableHead class="cursor-pointer" @click="handleSort('is_admin')">
              Role
              <span v-if="sortBy.startsWith('is_admin')">
                {{ sortBy.endsWith("asc") ? "↑" : "↓" }}
              </span>
            </TableHead>
            <TableHead class="text-right pr-5">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="!loading">
            <TableRow
              v-for="user in clientUser?.users"
              :key="user.id"
              :class="selectedUsers.includes(user.id) ? 'bg-muted/50' : ''"
            >
              <TableCell>
                <div class="flex items-center space-x-3">
                  <Avatar>
                    <!-- <AvatarImage :src="user.avatar" /> -->
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                  <div>
                    <p class="font-medium font-secondary-Regular text-left">
                      {{ user.name }}
                    </p>
                    <p class="text-sm text-muted-foreground text-left">
                      {{ user.email }}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell
                class="flex flex-wrap gap-1 items-center h-full font-secondary-Regular"
              >
                <Badge
                  v-for="role in user.roles"
                  :key="role.id"
                  :class="getRoleBadgeColor(role.name)"
                >
                  {{ role.name }}
                </Badge>
              </TableCell>

              <TableCell class="text-left">{{ user.email }}</TableCell>
              <TableCell class="text-left">{{ user.phone }}</TableCell>
              <TableCell class="text-left">
                {{ user.is_admin ? "Admin" : "User" }}
              </TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end space-x-2">
                  
                  <Button
                    v-if="!user.is_admin"
                    variant="ghost"
                    size="icon"
                    @click="confirmDeleteUser(user.id)"
                  >
                    <Button variant="outline">
                      <Trash2 class="w-4 h-4"
                    /></Button>
                  </Button>
                  <Dialog  >
                    <DialogTrigger as-child @click="openEditUser(user)">
                      <Button variant="outline"> <Pencil /> </Button>
                    </DialogTrigger>
                    <DialogContent class="p-0" v-if="isEdit">
                      <UserCreate
                        
                        :user-to-edit="userToEdit"
                        :isEdit="isEdit"
                        @close="onClose"
                        @created="fetchUsers"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
      <TableSkelton v-if="loading" :rows="pageSize" :columns="6" />
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
      v-if="clientUser.users.length > 0"
      :current-page="currentPage"
      :last-page="clientUser.pagination?.last_page || 1"
      :total="clientUser.pagination?.total || 0"
      :per-page="pageSize"
      :from="clientUser.pagination?.from || 1"
      :to="clientUser.pagination?.to"
      @page-change="setPage"
    />
  </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useClientUserStore } from "@/store/client/client-user-store";

import Pagination from "@/views/dashboard/components/Pagination.vue";
import UserCreate from "../user.create/UserCreate.vue";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSearchQuary } from "@/composeable/userSearchQuary";
import { clientUserService } from "@/services/client/client-user-service";
import ConfirmDelete from "@/views/dashboard/components/ConfirmDelete.vue";
import TableSkelton from "@/views/dashboard/components/TableSkelton.vue";
import { Pencil, Trash2 } from "lucide-vue-next";
import { computed, onMounted, ref, watch } from "vue";
import { useRoleColor } from "@/composeable/useRoleColor";
import { useRoleStore } from "@/store/common/role-permission-store";
const { getRoleBadgeColor } = useRoleColor();
const clientUser = useClientUserStore();
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
console.log();


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
    clientUser?.users?.length > 0 &&
    selectedUsers.value.length === clientUser?.users?.length
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
    selectedUsers.value = clientUser?.users?.map((user) => user.id);
  } else {
    selectedUsers.value = [];
  }
}

const fetchUsers = async () => {
  loading.value = true;
  try {
    await clientUser.fetchAllClientUserIndex(buildApiParams());
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
