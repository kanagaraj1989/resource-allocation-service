import express from 'express';
import Logger from './util/logger/Logger'
import {rootRouter} from './routes/index'
import { json as bodyParserJson, urlencoded as bodyParserUrlEncoded } from 'body-parser'
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import config from 'config';
import Mongo from "./infra/Mongo";

const app = express();

const port = config.get('api.port');


const establishMongoConnection = async () => {
  const intialTimeout: string = config.get('mongoInitialTimeOut');
  const idleTimeout: string = config.get('mongoIdleTimeOut')
  const connectionOptions = {
    poolSize: process.env.CONNECTION_POOL_SIZE || 100,
    // Give up initial establishConnection after 50 seconds
    connectTimeoutMS: Number.parseInt(intialTimeout, 10),
    // Close sockets after 5000 seconds of inactivity
    socketTimeoutMS: Number.parseInt(idleTimeout, 10),
    useFindAndModify: false,
  }

  const mongoInstance = new Mongo()
  Logger.info('Creating new MongoSchema Connection')
  await mongoInstance.connect(config.get('mongoUrl'), connectionOptions)
  Logger.info('Mongoose successfully connected to Mongo MongoSchema')
}


establishMongoConnection()
  .catch(err => {
    Logger.error('error when connect to mongoDB');
    process.exit(1);}
    )

app.listen( port, () => {
  Logger.info(`server started at http://localhost:${ port }`);
} );
app.use(cors())
app.use('/resource-allocation/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParserJson())
app.use(bodyParserUrlEncoded({ extended: false }))

app.use('/resource-allocation', rootRouter);


