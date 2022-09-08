import fs from 'fs'
import c from 'picocolors'
import { regex } from './detect'

type writeConfig = (path: string, ip: string) => void

export function getCracoConfig(cwd = process.cwd()) {
  const path = cwd

  if (fs.existsSync(path)) {
    try {
      const raw = fs.readFileSync(path, 'utf-8')
      const matched = raw.match(regex)?.shift()

      if (!matched) {
        console.warn('Failed to find IP address in craco.config.js')
        process.exit(0)
      }
      return matched
    } catch (error) {
      console.warn('Failed to parse craco.config.js')
      process.exit(0)
    }
  } else {
    console.warn('Failed to find craco.config.js')
    process.exit(0)
  }
}

export function writeCracoConfig(cwd = process.cwd(), ip: string) {
  const path = cwd

  if (fs.existsSync(path)) {
    try {
      const raw = fs.readFileSync(path, 'utf-8')
      const replaced = raw.replace(regex, ip)
      fs.writeFileSync(path, replaced)
      // eslint-disable-next-line no-console
      console.log(c.green(`Successfully updated to ${c.blue(ip)}`))
    } catch (error) {
      console.warn('Failed to write craco.config.js')
      process.exit(0)
    }
  }
}

export const writeShortcut: writeConfig = (cwd, shortIP) => {
  const ip = `192.168.${shortIP}`
  return writeCracoConfig(cwd, ip)
}
