export interface response {
  id: string
  customer_id: string
  accepted?: boolean
}

export interface load_data {
  id: string
  customer_id: string
  load_amount: string
  time: string
}

export interface limits_data {
  daily_deposit_balance: number
  weekly_deposit_balance: number
  daily_deposits: number
  daily_deposit_balance_limit?: number
  number_of_deposits_limit?: number
  weekly_deposit_balance_limit?: number
}
