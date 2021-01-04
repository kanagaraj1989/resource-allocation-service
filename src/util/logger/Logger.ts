import { createLogger, format, Logger, transports } from 'winston'

function getLogger (): Logger {
  return createLogger({
    level: process.env.LOG_LEVEL,
    format: format.combine(format.splat(), format.simple()),
    transports: [new transports.Console()],
  })
}

export default getLogger()
