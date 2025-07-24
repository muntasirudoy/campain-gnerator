<script setup>
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/store/client/client-auth-store'
import { useClientUserStore } from '@/store/client/client-user-store'
import { Loader2 } from 'lucide-vue-next'

const authStore = useAuthStore()
const clientUser = useClientUserStore()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar class="border-2 border-orange-highlight p-1 w-10 h-10">
        <AvatarImage src="/auth/user.png" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-64 p-2 shadow-xl border rounded-xl -left-[60px]">
      <!-- Profile Header -->
      <div class="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
        <Avatar class="w-10 h-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
          <AvatarFallback class="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold uppercase">
            {{ clientUser.authUser?.data?.name?.[0] || 'U' }}
          </AvatarFallback>
        </Avatar>
        <div class="space-y-0.5">
          <p class="text-sm font-medium leading-none">
            {{ clientUser.authUser?.data?.name }}
          </p>
          <p class="text-xs text-muted-foreground">
            {{ clientUser.authUser?.data?.email }}
          </p>
        </div>
      </div>

      <DropdownMenuSeparator class="my-2" />

      <!-- Menu Items -->
      <DropdownMenuItem class="py-2.5 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition">
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem class="py-2.5 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition">
        Billing Profile
      </DropdownMenuItem>
      <DropdownMenuItem class="py-2.5 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition">
        Team
      </DropdownMenuItem>

      <DropdownMenuSeparator class="my-2" />

      <!-- Logout -->
      <DropdownMenuItem
        class="py-2.5 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer rounded-md transition"
        :disabled="authStore.isLoading"
        @click="authStore.logout()"
      >
        <Loader2 v-if="authStore.isLoading" class="mr-2 h-4 w-4 animate-spin" />
        <span>Sign out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
