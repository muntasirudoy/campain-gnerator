<template >
  <div>
    <Header />
    <div class="min-h-screen h-full flex">
      <ClientSidebar />
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
<script>
import ClientSidebar from '../client/ClientSidebar.vue';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';

export default {
    name:'PartnerLayout',
    components: {
      Header,
      Footer,
      ClientSidebar
  },
}
</script>
<style scoped>
    
</style>