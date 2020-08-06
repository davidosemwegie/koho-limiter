import { limitCheck } from "../src/limitCheck"

describe("Testing the limit check and the generate response function", () => {
  //Limit Check function
  describe("limitCheck function", () => {
    it("Should return true when all values are under limit", () => {
      const accepted: boolean = limitCheck({
        daily_deposit_balance: 1234.23,
        weekly_deposit_balance: 15000,
        daily_deposits: 2,
      })

      expect(accepted).toBe(true)
    })
    it("Should return false when one of the values is over the limit", () => {
      const accepted: boolean = limitCheck({
        daily_deposit_balance: 1234.23,
        weekly_deposit_balance: 25000,
        daily_deposits: 2,
      })

      expect(accepted).toBe(false)
    })
    it("Should return true when all values are under limit with a new temporary limit set ", () => {
      const accepted: boolean = limitCheck({
        daily_deposit_balance: 7000,
        weekly_deposit_balance: 15000,
        daily_deposits: 2,
        daily_deposit_balance_limit: 10000,
      })

      expect(accepted).toBe(true)
    })
  })
})
