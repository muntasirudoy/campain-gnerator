<script setup lang="ts">
import { watch } from "vue";
import { useOnboardingStore } from "../store/campaign.store";

const props = defineProps<{ data: any; section: string }>();
const store = useOnboardingStore();

watch(
  () => props.data,
  (newVal) => {
    store.updateSection(props.section, newVal);
  },
  { deep: true }
);
</script>
