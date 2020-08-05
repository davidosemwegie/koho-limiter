import moment from "moment"
import fs from "fs"
import { convertToObject } from "./src"

const data_store = new Map()

fs.readFile("input2.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file from the disk")
    return
  }

  const lines = data.split("\n")

  //Removing the last empty line
  lines.pop()

  const new_array = []
  lines.forEach((line) => {
    const nl = JSON.parse(line)

    new_array.push(nl)

    //Converting the time to unix value
    const date = moment(nl.time, "YYYY-MM-DD").format("X")

    /**
     * - check if user has a record in that date
     * - add all transactions for that user in that date in another map inside
     */

    data_store[date] = new Map()
  })

  //Make
  new_array.forEach((load) => {
    const date = moment(load.time, "YYYY-MM-DD").format("X")

    data_store[date][load.customer_id] = new Map()
  })

  new_array.forEach((load) => {
    const date = moment(load.time, "YYYY-MM-DD").format("X")

    data_store[date][load.customer_id][load.id] = load

    console.log(
      `customer ${load.customer_id}: `,
      data_store[date][load.customer_id]
    )

    console.log("----------")
  })
})
