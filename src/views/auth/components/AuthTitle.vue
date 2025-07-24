
<script setup>
 const {title} = defineProps({
   title: {
     type: String,
     default: "",
   },
 });

</script>

<template>
  <h1
    class="text-2xl md:text-3xl font-primary font-bold text-gray-900 text-center"
  >
    {{ title }}
  </h1>
</template>


