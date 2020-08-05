import fs from "fs"

export const generateResponse = (
  id: string,
  customer_id: string,
  accepted: boolean
) => {
  const response = {
    id,
    customer_id,
    accepted,
  }

  const data = JSON.stringify(response)

  fs.appendFile("output.txt", `${data}\n`, (err) => {
    if (err) throw err
  })
  console.log(response)
}
