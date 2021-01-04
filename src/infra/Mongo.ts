import { connect, Connection } from 'mongoose'
import Logger from "../util/logger/Logger";

export default class Mongo {
  private connection: Connection

  public async connect (url: string, connectionOptions = {}) {
    if (this.connection) {
      Logger.info('Returning existing establishConnection')

      return this.connection
    }
    Logger.info('Connecting to %s', url)

    await connect(url, {
      useNewUrlParser: true,
      autoReconnect: true,
      keepAlive: true,
      keepAliveInitialDelay: 5000,
      ...connectionOptions,
    })

    Logger.info('Connection established to Mongo MongoSchema through Mongoose')
  }

  public async disconnect () {
    if (this.connection) {
      return this.connection.close()
    }
  }
}
