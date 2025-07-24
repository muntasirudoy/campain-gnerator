<script setup lang="ts">
import { ChevronRight, type LucideIcon } from "lucide-vue-next";
import { useRoute } from "vue-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const props = defineProps<{
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}>();

const route = useRoute();

const isActive = (url: string) => {
  return route.path === url || route.path.startsWith(url + "/");
};

const isSubActive = (subItems?: { url: string }[]) => {
  if (!subItems) return false;
  return subItems.some((sub) => isActive(sub.url));
};
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="isActive(item.url) || isSubActive(item.items)"
        class="group/collapsible"
      >
        <SidebarMenuItem :class="isActive(item.url) ? ' bg-sidebar-foreground text-black rounded-[5px]' : ''">
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.title">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
              <ChevronRight
                v-if="item.items?.length"
                class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <router-link
            v-if="!item.items?.length"
            :to="item.url"
            class="absolute inset-0 z-10"
          />

          <CollapsibleContent v-if="item.items?.length">
            <SidebarMenuSub>
              <SidebarMenuSubItem
                v-for="subItem in item.items"
                :key="subItem.title"
                :class="isActive(subItem.url) ? 'bg-muted/30 rounded-lg' : ''"
              >
                <SidebarMenuSubButton as-child>
                  <router-link :to="subItem.url" class="w-full block px-2 py-1">
                    {{ subItem.title }}
                  </router-link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
