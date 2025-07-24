<template>
  <SidebarProvider>
    <div class="w-full">
      <Header />
      <!-- SidebarTrigger will go here -->
      <div class="min-h-screen h-full flex">
        <ClientSidebar>
          <RouterView v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component" />
            </Transition>
          </RouterView>
        </ClientSidebar>
      </div>
      <!-- <Footer /> -->
    </div>
  </SidebarProvider>
</template>

<script>
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "../components/Header.vue";
import ClientSidebar from "./ClientSidebar.vue";
// import Footer from '../components/Footer.vue';

export default {
  name: "ClientLayout",
  components: {
    Header,
    ClientSidebar,
    SidebarProvider,
    // Footer
  },
};
</script>
