export interface PaginationQuery {
  page?: number
  per_page?: number
  search?: string
  sort_by?: string
  sort_order?: "asc" | "desc"
}

export interface PaginationResponse {
  current_page: number
  last_page: number
  per_page: number
  total: number
  next_page_url?: string | null
  prev_page_url?: string | null
  from: number
  to: number
}
