import * as core from '@actions/core'
import {loader} from './loader'

async function run(): Promise<void> {
  core.startGroup('env-loader logging')
  try {
    const path: string = core.getInput('path', {required: true})
    const mask: boolean =
      core
        .getInput('mask', {required: true, trimWhitespace: true})
        .toLowerCase() === 'true'

    core.info(`Will load environment variables from "${path}"`)

    if (mask) {
      core.info('Environment variables value mask is ENABLED')
    } else {
      core.warning(
        'Environment variables value mask is DISABLED, your secret will not be protected.'
      )
    }

    core.debug('Begin parse dotenv file at ' + new Date().toTimeString())
    const output = loader(path)
    core.debug('End dotenv file parse at ' + new Date().toTimeString())

    core.info(`.env file loaded, total ${Object.values(output).length} environment variables exported.`)
  } catch (error) {
    core.setFailed(error.message)
  } finally {
    core.endGroup()
  }
}

run()
