<script setup lang="ts">
import NavMain from "@/components/ui/app-sidebar/NavMain.vue";
import NavProjects from "@/components/ui/app-sidebar/NavProjects.vue";
import TeamSwitcher from "@/components/ui/app-sidebar/TeamSwitcher.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-vue-next";
import { Component, HTMLAttributes } from "vue";

// import { SidebarProps } from '@/components/ui/sidebar'

const props = withDefaults(
  defineProps<{
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
    class?: HTMLAttributes["class"];
   data: {
    teams: Array<{
      name: string;
      logo: Component;
      plan: string;
    }>;
    navMain: Array<{
      title: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean; 
      items?: Array<{
        title: string;
        url: string;
      }>;
    }>;
    users: Array<{
      name: string;
      url: string;
      icon: LucideIcon;
    }>;
    user?: {
      name: string;
      email: string;
      avatar: string;
    };
  };
  }>(),
  {
    collapsible: "icon",
  }
);

</script>

<template>
  <Sidebar v-bind="props" class="relative">
    <SidebarHeader>
      <TeamSwitcher :teams="props.data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="props.data.navMain" />
      <NavProjects :projects="props.data.users" />
    </SidebarContent>
    <SidebarFooter class="relative">
      <img
        src="/public/logo/footer-icon.svg"
        class="h-[140px] absolute z-50 bottom-0 -right-4"
      />
      <!-- <NavUser :user="data.user" /> -->
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
