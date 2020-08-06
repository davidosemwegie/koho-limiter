import fs from "fs"
import { response } from "../types"

export const generateResponse = async (data: response) => {
  const { id, customer_id, accepted } = data
  const response = {
    id,
    customer_id,
    accepted,
  }

  const res = JSON.stringify(response)

  await fs.appendFile("output.txt", `${res}\n`, (err) => {
    if (err) throw err
  })
  console.log(response)

  return res
}
