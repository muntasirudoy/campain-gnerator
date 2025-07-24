<template>
  <Toaster />

    <main class="main-content overflow-hidden">
      <RouterView v-slot="{ Component }">
        <!-- <Transition name="fade" mode="out-in"> -->
          <component :is="Component" />
        <!-- </Transition> -->
      </RouterView>
    </main>


  
</template>

<script setup>
import { RouterView } from "vue-router";
import { Toaster } from "./components/ui/sonner";
import "vue-sonner/style.css";

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
