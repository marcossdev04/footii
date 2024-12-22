// Estrutura de uma aposta individual
export interface Bet {
  match_id: string
  match_date: string
  country_name: string
  league_id: string
  league_name: string
  away_name: string
  home_name: string
  stats_total_corners: number
  stats_total_goals: number
  stats_score: string
  stats_home_goals: number
  stats_away_goals: number
  odd_market: string
  odd_bet: 'Under' | 'Over'
  odd_line: number
  odd_value: number
  valid_0: boolean
  valid_1: boolean
  valid_2: boolean
  valid_3: boolean
  probability_green: number
  probability_green_devolution: number
  result: 'Black' | 'Green' | 'Red' | 'Orange'
  bookmaker_link: string
  is_product_pro: boolean
  is_product_corner: boolean
  is_product_novice: boolean
  profit: number
  inserted_at: string
  is_filter_hot: boolean
}

// Estrutura dos gráficos

// Estrutura da página de resultados
export interface ResultsPage {
  count_results: number
  next: string | null
  previous: string | null
  results: Bet[]
}

// Estrutura completa da resposta paginada
export interface PaginatedResponse {
  pages: ResultsPage[]
}
