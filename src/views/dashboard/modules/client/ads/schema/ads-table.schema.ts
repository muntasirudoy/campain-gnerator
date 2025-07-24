import { ColumnDef, createColumnHelper } from "@tanstack/vue-table"

import { h } from "vue"
import { Info } from "lucide-vue-next"
import { Checkbox } from "@/components/ui/checkbox"
import { Ad } from "@/types/ad-types"


const columnHelper = createColumnHelper<Ad>()

export const columns: ColumnDef<Ad, any>[] = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllRowsSelected(),
        indeterminate: table.getIsSomeRowsSelected(),
        onUpdateChecked: (val: boolean) => table.toggleAllRowsSelected(!!val),
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        disabled: !row.getCanSelect(),
        onUpdateChecked: (val: boolean) => row.toggleSelected(!!val),
      }),
  }),
  columnHelper.accessor('adName', {
    header: 'Campaign Name',
    cell: ({ getValue }) =>
      h('a', { href: '#', class: 'text-red-500 underline' }, getValue()),
  }),
    columnHelper.accessor('campaign', {
    header: 'Campaign',
    cell: ({ getValue }) => getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => {
      const color =
        getValue() === 'Active'
          ? 'bg-green-500'
          : getValue() === 'Pause'
          ? 'bg-yellow-500'
          : 'bg-orange-500'
      return h('div', { class: 'flex items-center gap-2' }, [
        h('span', { class: `w-2 h-2 rounded-full ${color}` }),
        h('span', getValue()),
      ])
    },
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
    header: () =>
      h('div', { class: 'flex items-center gap-1' }, [
        'Impressions',
        h(Info, { class: 'w-4 h-4 text-gray-400' }),
      ]),
    cell: ({ getValue }) => getValue().toLocaleString(),
  }),
  columnHelper.accessor('averageCPP', {
    header: 'Average CPP',
    cell: ({ getValue }) =>
      typeof getValue() === 'number' && getValue() !== 0
        ? `$${getValue()}`
        : '0',
  }),
    columnHelper.accessor('location', {
    header: 'Location',
    cell: ({ getValue }) => getValue(),
  }),
]
