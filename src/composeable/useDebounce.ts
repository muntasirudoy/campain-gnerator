import { ref, watch, type Ref } from "vue";

export function useDebounce<T>(
  value: Ref<T>,
  delay: number = 300
): Ref<T> {
  const debounced = ref(value.value) as Ref<T>;
  let timeout: ReturnType<typeof setTimeout>;

  watch(value, (newValue) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debounced.value = newValue;
    }, delay);
  });

  return debounced;
}
