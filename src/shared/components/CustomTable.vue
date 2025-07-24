<script setup lang="ts">
import {
    createColumnHelper,
    FlexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useVueTable,
    type ColumnDef,
    type ColumnFiltersState,
    type ExpandedState,
    type SortingState,
    type VisibilityState,
} from '@tanstack/vue-table'

import { ChevronDown } from 'lucide-vue-next'
import { h, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { valueUpdater } from '@/lib/utils'
import { Campaign } from '@/types/campaign-types'

const data = ref<Campaign[]>([
    {
        id: 1,
        campaignName: 'Summer Blast',
        budget: 5000,
        status: 'Active',
        activeDevices: 12,
        liveAds: 3,
        impressions: 100000,
        averageCPP: 4.2,
        videoPlays: 25000,
    },
    {
        id: 2,
        campaignName: 'Winter Promo',
        budget: 8000,
        status: 'Review',
        activeDevices: 30,
        liveAds: 7,
        impressions: 150000,
        averageCPP: 3.8,
        videoPlays: 34000,
    },
])

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const columnHelper = createColumnHelper<Campaign>()

const columns: ColumnDef<Campaign, any>[] = [
    columnHelper.display({
        id: 'select',
        header: ({ table }) =>
            h(Checkbox, { class: 'border-red-500' }, {
                modelValue: table.getIsAllPageRowsSelected(),
                indeterminate:
                    table.getIsSomePageRowsSelected() &&
                    !table.getIsAllPageRowsSelected(),
                'onUpdate:modelValue': (value: boolean) =>
                    table.toggleAllPageRowsSelected(!!value),
            }),
        cell: ({ row }) =>
            h(Checkbox, { class: 'border-red-500' }, {
                modelValue: row.getIsSelected(),
                indeterminate:
                    row.getIsSomeSelected() && !row.getIsSelected(),
                'onUpdate:modelValue': (value: boolean) =>
                    row.toggleSelected(!!value),
            }),
        enableSorting: false,
        enableHiding: false,
    }),
    columnHelper.accessor('campaignName', {
        header: 'Campaign Name',
        cell: ({ getValue }) =>
            h('span', { class: 'font-medium text-secondary' }, getValue()),
    }),
    columnHelper.accessor('budget', {
        header: 'Budget',
        cell: ({ getValue }) => `$${getValue()}`,
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('liveAds', {
        header: 'Live Ads',
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('activeDevices', {
        header: 'Active Devices',
        cell: ({ getValue }) => getValue(),
    }),
    columnHelper.accessor('videoPlays', {
        header: 'Video Plays',
        cell: ({ getValue }) => getValue().toLocaleString(),
    }),
    columnHelper.accessor('impressions', {
        header: 'Impressions',
        cell: ({ getValue }) => getValue().toLocaleString(),
    }),
    columnHelper.accessor('averageCPP', {
        header: 'Avg CPP',
        cell: ({ getValue }) => `$${getValue().toFixed(2)}`,
    }),
]

const table = useVueTable({
    data: data.value,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: (val) => valueUpdater(val, sorting),
    onColumnFiltersChange: (val) => valueUpdater(val, columnFilters),
    onColumnVisibilityChange: (val) => valueUpdater(val, columnVisibility),
    onRowSelectionChange: (val) => valueUpdater(val, rowSelection),
    onExpandedChange: (val) => valueUpdater(val, expanded),
    state: {
        get sorting() {
            return sorting.value
        },
        get columnFilters() {
            return columnFilters.value
        },
        get columnVisibility() {
            return columnVisibility.value
        },
        get rowSelection() {
            return rowSelection.value
        },
        get expanded() {
            return expanded.value
        },
    },
})


const { title } = defineProps({
    title: {
        type: String
    }
})
</script>

<template>
    <div class="w-full">
        <div class="flex items-end py-4">
    

            <!-- <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="ml-auto">
                        Columns
                        <ChevronDown class="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem v-for="column in table.getAllColumns().filter(col => col.getCanHide())"
                        :key="column.id" class="capitalize" :model-value="column.getIsVisible()"
                        @update:model-value="val => column.toggleVisibility(!!val)">
                        {{ column.id }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu> -->
        </div>

        <div class="rounded-md border ">
            <Table>
                <TableHeader class=" bg-secondary/15 !hover:bg-secondary/20 font-primary text-black">
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody class=" bg-white">
                    <template v-if="table.getRowModel().rows.length">
                        <template v-for="row in table.getRowModel().rows" :key="row.id">
                            <TableRow :data-state="row.getIsSelected() && 'selected'" class="px-4">
                                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id"
                                    class=" py-5 border-[1px] border-secondary/20 font-primary">
                                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                                </TableCell>
                            </TableRow>
                            <TableRow v-if="row.getIsExpanded()">
                                <TableCell :colspan="row.getVisibleCells().length">
                                    {{ JSON.stringify(row.original) }}
                                </TableCell>
                            </TableRow>
                        </template>
                    </template>
                    <TableRow v-else>
                        <TableCell :colspan="columns.length" class="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

        <div class="flex items-center justify-between py-4">
            <div class="text-sm text-muted-foreground">
                {{ table.getFilteredSelectedRowModel().rows.length }} of
                {{ table.getFilteredRowModel().rows.length }} row(s) selected.
            </div>
            <div class="space-x-2">
                <Button variant="outline" size="sm" :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()">
                    Previous
                </Button>
                <Button variant="outline" size="sm" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
                    Next
                </Button>
            </div>
        </div>
    </div>
</template>


<!-- 
<script setup lang="ts" generic="TData">
import {
  createColumnHelper,
  useVueTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type ExpandedState,
  type RowSelectionState,
} from '@tanstack/vue-table'

import { h, ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { ChevronDown } from 'lucide-vue-next'

interface Props<T> {
  columns: ColumnDef<T, any>[]
  data: T[]
  pageCount: number
  state: {
    pageIndex: number
    pageSize: number
    sorting: SortingState
    columnFilters: ColumnFiltersState
  }
}

const props = defineProps<Props<TData>>()
const emit = defineEmits<{
  (e: 'update:pagination', val: { pageIndex: number; pageSize: number }): void
  (e: 'update:sorting', val: SortingState): void
  (e: 'update:filters', val: ColumnFiltersState): void
}>()

const sorting = ref(props.state.sorting)
const columnFilters = ref(props.state.columnFilters)
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref<RowSelectionState>({})
const expanded = ref<ExpandedState>({})

watch(sorting, val => emit('update:sorting', val))
watch(columnFilters, val => emit('update:filters', val))

const table = useVueTable({
  data: props.data,
  columns: props.columns,
  pageCount: props.pageCount,
  manualPagination: true,
  manualSorting: true,
  manualFiltering: true,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
onSortingChange: updater =>
  sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater,

onColumnFiltersChange: updater =>
  columnFilters.value = typeof updater === 'function' ? updater(columnFilters.value) : updater,

onColumnVisibilityChange: updater =>
  columnVisibility.value = typeof updater === 'function' ? updater(columnVisibility.value) : updater,

onRowSelectionChange: updater =>
  rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater,

onExpandedChange: updater =>
  expanded.value = typeof updater === 'function' ? updater(expanded.value) : updater,

  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return columnVisibility.value },
    get rowSelection() { return rowSelection.value },
    get expanded() { return expanded.value },
  },
})
</script>

<template>
  <div class="w-full">
    <div class="flex items-center py-4">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="ml-auto">
            Columns <ChevronDown class="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter(col => col.getCanHide())"
            :key="column.id"
            class="capitalize"
            :model-value="column.getIsVisible()"
            @update:model-value="val => column.toggleVisibility(!!val)"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell :colspan="props.columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <div class="flex items-center justify-between py-4">
      <div class="text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="emit('update:pagination', {
            pageIndex: table.getState().pagination.pageIndex - 1,
            pageSize: table.getState().pagination.pageSize,
          })"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="emit('update:pagination', {
            pageIndex: table.getState().pagination.pageIndex + 1,
            pageSize: table.getState().pagination.pageSize,
          })"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template> -->
