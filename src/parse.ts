import c from 'picocolors'
import { version } from '../package.json'
import { run } from './cli'
import { getConfig, writeConfig } from './config'
import { detect, isValidIP } from './detect'
import { writeShortcut } from './fs'

export const parse = async (args: string[]) => {
  if (args.length === 0)
    run()

  if (args.length === 1 && args[0] === '-v') {
    // eslint-disable-next-line no-console
    console.log(c.gray(`craco-pi v${version}`))
    process.exit(0)
  }

  if (args.length === 2 && args[0] === '-i') {
    const inserts = args[1]

    if (isValidIP(inserts, true)) {
      const config = getConfig()
      config.ipChoices.push(inserts)

      const { cracoConfigPath } = await detect(process.cwd())

      writeShortcut(cracoConfigPath, inserts)
      writeConfig(config)
    }
  }
}
