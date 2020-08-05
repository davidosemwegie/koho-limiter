/**
 * The limitCheck function returns true or false based on wether the user has passed their limits for the day.
 * the limits can also be sent as part of the function incase they need to be changed for whatever reason
 */
import { limits_data } from "../types"

export const limitCheck = (data: limits_data) => {
  const {
    daily_deposit_balance,
    weekly_deposit_balance,
    daily_deposits,
    daily_deposit_balance_limit = 5000,
    weekly_deposit_balance_limit = 20000,
    number_of_deposits_limit = 3,
  } = data
  if (
    daily_deposit_balance > daily_deposit_balance_limit ||
    daily_deposits > number_of_deposits_limit ||
    weekly_deposit_balance > weekly_deposit_balance_limit
  ) {
    return false
  }
  return true
}
