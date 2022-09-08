import { findUp } from 'find-up'
import { getCracoConfig } from './fs'

export const regex
  = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/g
export const shortRegex
  = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))/g

export async function detect(cwd: string) {
  const cracoConfigPath = await findUp('craco.config.js', { cwd })
  let ip: string | undefined

  if (cracoConfigPath) {
    ip = getCracoConfig(cracoConfigPath)
  } else {
    console.warn('Failed to find craco.config.js')
    process.exit(0)
  }

  return { ip, cracoConfigPath }
}

export function isValidIP(ip: string, isShort?: boolean) {
  if (isShort)
    return ip.split('.').length === 2 ? shortRegex.test(ip) : false
  return ip.split('.').length === 4 ? regex.test(ip) : false
}

export function isShort(ip: string) {
  return ip.split('.').length === 2
}
