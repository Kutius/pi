import path from 'path'
import fs from 'fs'
import ini from 'ini'
import c from 'picocolors'

const customRcPath = process.env.PI_CONFIG_FILE

const home = process.platform === 'win32'
  ? process.env.USERPROFILE
  : process.env.HOME

const defaultRcPath = path.join(home || '~/', '.pirc')

const rcPath = customRcPath || defaultRcPath

interface Config {
  ipChoices: string[]
}

const defaultConfig: Config = {
  ipChoices: [],
}

let config: Config | undefined

export function getConfig(): Config {
  if (!config) {
    config = !fs.existsSync(rcPath)
      ? defaultConfig
      : Object.assign({}, defaultConfig, ini.parse(fs.readFileSync(rcPath, 'utf-8')))
  }
  return config
}

export function writeConfig(newConfig: Config) {
  try {
    fs.writeFileSync(rcPath, ini.stringify(newConfig))
    // eslint-disable-next-line no-console
    console.log(c.green('Successfully updated /.pirc'))
  } catch {
    console.warn('Failed to save .pirc')
    process.exit(0)
  }
}
