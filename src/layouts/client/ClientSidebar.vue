<template>
  <AppSidebar :data="CLIENT_SIDEBAR"  />
  <SidebarInset class="bg-[#E0DCD6]/50">
    <slot></slot>
  </SidebarInset>
</template>

<script lang="ts" setup>
import AppSidebar from '@/components/ui/app-sidebar/AppSidebar.vue';
import SidebarInset from "@/components/ui/sidebar/SidebarInset.vue";
import { CLIENT_SIDEBAR } from '@/constant';

</script>
