export interface h2h {
  match_id: string
  stats_home_last_five: [
    {
      date: string
      result: string
      goals_scored: number
      goals_conceded: number
      first_half_goals: number
      second_half_goals: number
    },
  ]
  stats_away_last_five: [
    {
      date: string
      result: string
      goals_scored: number
      goals_conceded: number
      first_half_goals: number
      second_half_goals: number
    },
  ]
  match_date: string
  h_id: string
  a_id: string
  league_id: string
  h2h_total_matches: number
  h2h_home_avg_first_half_goals: string
  h2h_home_avg_second_half_goals: string
  h2h_away_avg_first_half_goals: string
  h2h_away_avg_second_half_goals: string
  h2h_home_wins: number
  h2h_away_wins: number
  h2h_draws: number
  stats_home_matches_played: number
  stats_home_avg_goals_scored: string
  stats_home_avg_goals_conceded: string
  stats_home_avg_first_half_goals: string
  stats_home_avg_second_half_goals: string
  stats_home_win_rate: string
  stats_home_attack_efficiency: string
  stats_home_shot_accuracy: string
  stats_away_matches_played: number
  stats_away_avg_goals_scored: string
  stats_away_avg_goals_conceded: string
  stats_away_avg_first_half_goals: string
  stats_away_avg_second_half_goals: string
  stats_away_win_rate: string
  stats_away_attack_efficiency: string
  stats_away_shot_accuracy: string
  created_at: string
}
