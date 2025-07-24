import { ref, watch, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useSearchQuary(defaults = {
  page: 1,
  perPage: 10,
  search: "",
  sortBy: "name:asc",
}) {
  const route = useRoute();
  const router = useRouter();

  const ready = ref(false); // 👈

  const currentPage = ref(defaults.page);
  const pageSize = ref(defaults.perPage);
  const searchQuery = ref(defaults.search);
  const sortBy = ref(defaults.sortBy);
  const debouncedSearch = ref(searchQuery.value);

  // debounce setup
  let debounceTimeout: any;
  watch(searchQuery, (val) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      debouncedSearch.value = val;
    }, 400);
  });

  const updateUrlQuery = () => {
    const query: any = {
      page: currentPage.value.toString(),
      per_page: pageSize.value.toString(),
    };
    if (searchQuery.value) query.search = searchQuery.value;
    if (sortBy.value !== defaults.sortBy) query.sort = sortBy.value;
    router.replace({ query });
  };

  const initializeFromQuery = () => {
    const query = route.query;
    currentPage.value = parseInt(query.page as string) || defaults.page;
    pageSize.value = parseInt(query.per_page as string) || defaults.perPage;
    searchQuery.value = (query.search as string) || defaults.search;
    sortBy.value = (query.sort as string) || defaults.sortBy;
    ready.value = true; // ✅ after all query values are set
  };

  const buildApiParams = () => {
    const [sortField, sortOrder] = sortBy.value.split(":");
    return {
      page: currentPage.value,
      per_page: pageSize.value,
      search: searchQuery.value || undefined,
      sort_by: sortField,
      sort_order: sortOrder,
    };
  };

  onMounted(() => {
    initializeFromQuery();
  });

  return {
    currentPage,
    pageSize,
    searchQuery,
    debouncedSearch,
    sortBy,
    updateUrlQuery,
    buildApiParams,
    setPage: (page: number) => {
      currentPage.value = page;
      updateUrlQuery();
    },
    setPageSize: (value: string) => {
      pageSize.value = parseInt(value);
      currentPage.value = 1;
      updateUrlQuery();
    },
    setSort: (value: string) => {
      sortBy.value = value;
      currentPage.value = 1;
      updateUrlQuery();
    },
    ready, // 👈 expose it
  };
}
