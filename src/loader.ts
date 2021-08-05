import dotenv from 'dotenv'
import {setSecret, exportVariable} from '@actions/core'

export function loader(
  file: string,
  debug: boolean = false,
  mask: boolean = true
): {[key: string]: string} {
  const output = dotenv.parse(file, {debug})
  if (mask) {
    Object.values(output).forEach(setSecret)
  }
  for (const [key, value] of Object.entries(output)) {
    exportVariable(key, value)
  }
  return output
}
