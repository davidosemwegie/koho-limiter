import moment from "moment"
import fs from "fs"
import { load_data } from "./types"
import { limitCheck, generateResponse } from "./src"

const data_store = new Map()

interface response {
  id: string
  customer_id: string
  accepted?: boolean
}

fs.readFile("input2.txt", "utf8", (err, data: any) => {
  if (err) {
    console.log("Error reading file from the disk")
    return
  }

  //Splitting the text file lines into an array
  const new_array: string[] = data.split("\n")

  //Removing the last empty line
  new_array.pop()

  //Creating a map of the dates and the weeks
  let current_week: number = 0

  new_array.forEach((line: string, index: number) => {
    //Converting each line to a json object
    const load: load_data = JSON.parse(line)

    const { id, customer_id, load_amount, time } = load

    const dateValue = moment(time, "YYYY-MM-DD")

    //Converting the time to unix value
    const date = dateValue.format("X")

    data_store[date] = new Map()
    data_store[date]["week"] = dateValue.isoWeek()
    data_store[date][customer_id] = new Map()
    data_store[date][customer_id]["daily_deposit_balance"] = 0
    data_store[date][customer_id]["number_of_deposits"] = 0
    data_store[date][customer_id]["weekly_deposit_balance"] = 0

    //Converting the load_amount string to a double
    const amount = parseFloat(load_amount.substring(1))

    //Current Values
    const new_week = data_store[date]["week"]
    let daily_deposits = data_store[date][customer_id]["number_of_deposits"]
    let daily_deposit_balance =
      data_store[date][customer_id]["daily_deposit_balance"]
    let weekly_deposit_balance =
      data_store[date][customer_id]["weekly_deposit_balance"]

    //Setting the temporary new values
    daily_deposit_balance += amount
    daily_deposits += 1

    //Checking to see if we are still in the same week
    if (new_week != current_week) {
      current_week = new_week
      weekly_deposit_balance = amount
    } else {
      weekly_deposit_balance += amount
    }

    const accepted: boolean = limitCheck({
      daily_deposit_balance,
      weekly_deposit_balance,
      daily_deposits,
    })

    if (accepted) {
      data_store[date][customer_id][id] = line
      data_store[date][customer_id]["number_of_deposits"] = daily_deposits
      data_store[date][customer_id][
        "daily_deposit_balance"
      ] = daily_deposit_balance
      data_store[date][customer_id][
        "weekly_deposit_balance"
      ] = weekly_deposit_balance
    }

    generateResponse(id, customer_id, accepted)
  })
})
