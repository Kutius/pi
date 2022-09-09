import prompts from 'prompts'
import { detect, isShort, isValidIP } from './detect'
import { writeCracoConfig, writeShortcut } from './fs'
import { parse } from './parse'

export async function runCli() {
  const args = process.argv.slice(2).filter(Boolean)
  try {
    await parse(args)
  } catch (error) {
    process.exit(1)
  }
}

export async function run() {
  const cwd = process.cwd()
  const { cracoConfigPath } = await detect(cwd)
  const { ip } = await prompts({
    type: 'text',
    name: 'ip',
    message: 'Enter the server ip you want to use',
    validate: value =>
      (!value || !(isValidIP(value, true) || isValidIP(value))) ? 'Please enter a valid ip' : true,
  })
  if (!ip)
    return
  isShort(ip) ? writeShortcut(cracoConfigPath, ip) : writeCracoConfig(cracoConfigPath, ip)
}
