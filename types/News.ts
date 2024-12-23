export interface NewsInterface {
  id: number
  title: string
  description: string
  news_link: string
  image_link: string
  source: string
  pub_date: string
}
export interface ResultsNewsPage {
  count_results: number
  next: string | null
  previous: string | null
  results: NewsInterface[]
}

// Estrutura completa da resposta paginada
export interface PaginatedNewsResponse {
  pages: ResultsNewsPage[]
}
