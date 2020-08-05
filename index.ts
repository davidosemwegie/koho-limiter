import moment from "moment"
import fs from "fs"

const data_store = new Map()

interface response {
  id: string
  customer_id: string
  accepted?: boolean
}

interface load {
  id: string
  customer_id: string
  load_amount: string
  time: string
}

fs.readFile("input3.txt", "utf8", (err, data: any) => {
  if (err) {
    console.log("Error reading file from the disk")
    return
  }

  //Splitting the text file lines into an array
  const new_array: string[] = data.split("\n")

  //Removing the last empty line
  new_array.pop()

  //const new_array = []

  //Creating a map of the dates and the weeks
  let current_week: number = 0
  new_array.forEach((line, index) => {
    const load = JSON.parse(line)

    const { id, customer_id, load_amount, time } = load

    new_array.push(load)

    const dateValue = moment(load.time, "YYYY-MM-DD")

    //Converting the time to unix value
    moment().isoWeekday()
    const date = dateValue.format("X")

    data_store[date] = new Map()
    data_store[date]["week"] = dateValue.isoWeek()
    data_store[date][customer_id] = new Map()
    data_store[date][customer_id]["daily_deposit_balance"] = 0
    data_store[date][customer_id]["number_of_deposits"] = 0
    data_store[date][customer_id]["weekly_deposit_balance"] = 0

    const amount = parseFloat(load_amount.substring(1))

    //Current Values
    const new_week = data_store[date]["week"]

    let daily_deposits = data_store[date][customer_id]["number_of_deposits"]
    let daily_deposit_balance =
      data_store[date][customer_id]["daily_deposit_balance"]
    let weekly_deposit_balance =
      data_store[date][customer_id]["weekly_deposit_balance"]

    daily_deposit_balance += amount
    daily_deposits += 1

    if (new_week != current_week) {
      current_week = new_week
      weekly_deposit_balance = amount
    } else {
      weekly_deposit_balance += amount
    }

    const response: response = {
      id,
      customer_id,
    }

    if (
      daily_deposit_balance > 5000 ||
      daily_deposits > 3 ||
      weekly_deposit_balance > 20000
    ) {
      response.accepted = false
    } else {
      data_store[date][customer_id][id] = line
      data_store[date][customer_id]["number_of_deposits"] = daily_deposits
      data_store[date][customer_id][
        "daily_deposit_balance"
      ] = daily_deposit_balance
      data_store[date][customer_id][
        "weekly_deposit_balance"
      ] = weekly_deposit_balance

      response.accepted = true
    }

    console.log(`${index + 1}: `, response)
  })

  //Setting balances for each record

  //   new_array.forEach((load) => {
  //     const date = moment(load.time, "YYYY-MM-DD").format("X")
  //     const { customer_id } = load

  //     data_store[date][customer_id] = new Map()
  //     data_store[date][customer_id]["daily_deposit_balance"] = 0
  //     data_store[date][customer_id]["number_of_deposits"] = 0
  //     data_store[date][customer_id]["weekly_deposit_balance"] = 0
  //   })
})
// fs.readFile("input.txt", "utf8", (err, data) => {
//   if (err) {
//     console.log("Error reading file from the disk")
//     return
//   }

//   //Splitting the text file lines into an array
//   const lines = data.split("\n")

//   //Removing the last empty line
//   lines.pop()

//   const new_array = []

//   //Creating a map of the dates and the weeks
//   lines.forEach((line) => {
//     const nl = JSON.parse(line)

//     new_array.push(nl)

//     const dateValue = moment(nl.time, "YYYY-MM-DD")

//     //Converting the time to unix value
//     moment().isoWeekday()
//     const date = dateValue.format("X")

//     data_store[date] = new Map()
//     data_store[date]["week"] = dateValue.isoWeek()
//   })

//   //Setting balances for each record

//   new_array.forEach((load) => {
//     const date = moment(load.time, "YYYY-MM-DD").format("X")
//     const { customer_id } = load

//     data_store[date][customer_id] = new Map()
//     data_store[date][customer_id]["daily_deposit_balance"] = 0
//     data_store[date][customer_id]["number_of_deposits"] = 0
//     data_store[date][customer_id]["weekly_deposit_balance"] = 0
//   })

//   //Main

//   let current_week: number = 0

//   new_array.forEach((load, index) => {
//     const date = moment(load.time, "YYYY-MM-DD").format("X")

//     const { id, customer_id, load_amount, time } = load

//     const amount = parseFloat(load_amount.substring(1))

//     //Current Values
//     const new_week = data_store[date]["week"]

//     let daily_deposits = data_store[date][customer_id]["number_of_deposits"]
//     let daily_deposit_balance =
//       data_store[date][customer_id]["daily_deposit_balance"]
//     let weekly_deposit_balance =
//       data_store[date][customer_id]["weekly_deposit_balance"]

//     daily_deposit_balance += amount
//     daily_deposits += 1

//     if (new_week != current_week) {
//       current_week = new_week
//       weekly_deposit_balance = amount
//     } else {
//       weekly_deposit_balance += amount
//     }

//     const response: response = {
//       id,
//       customer_id,
//     }

//     if (
//       daily_deposit_balance > 5000 ||
//       daily_deposits > 3 ||
//       weekly_deposit_balance > 20000
//     ) {
//       response.accepted = false
//     } else {
//       data_store[date][customer_id][id] = load
//       data_store[date][customer_id]["number_of_deposits"] = daily_deposits
//       data_store[date][customer_id][
//         "daily_deposit_balance"
//       ] = daily_deposit_balance
//       data_store[date][customer_id][
//         "weekly_deposit_balance"
//       ] = weekly_deposit_balance

//       response.accepted = true
//     }

//     console.log(`${index + 1}: `, response)
//   })
// })

//TODO FUNCTION THAT ADDS THE DATES A KEY TO THE DATA STORE
//TODO FUNCTION THAT THAT IN
