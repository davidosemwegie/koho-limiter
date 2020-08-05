/**
 * convertToObject function is going to take the input.txt file, convert and return it as on large javascript object
 */

//import fs from "fs"
import { resolve } from "path"
import fs from "promise-fs"

const convertToObject = async (file_ref: string) => {
  let new_array = []

  await fs.readFile(file_ref).then((content) => {
    const data = String(content).split("\n")
    //console.log(data)
    new_array = data
  })

  //   await fs.readFile(file_ref, "utf8", async (err, data) => {
  //     if (err) {
  //       console.log("Error reading file from the disk, ", err)
  //       return
  //     }

  //     const lines = data.split("\n")
  //     lines.pop()

  //     new_array = lines

  //     // await lines.forEach((line: string, index: number) => {
  //     //   const nl = JSON.parse(line)

  //     //   new_array.push(nl)

  //     //   //   if (line === "") {
  //     //   //     remove(lines, line)
  //     //   //   } else {
  //     //   //     const nl = JSON.parse(line)

  //     //   //     new_array.push(nl)
  //     //   //   }
  //     // })
  //   })
}

const remove = (array, element) => {
  const index = array.indexOf(element)
  array.splice(index, 1)
}

export default convertToObject
