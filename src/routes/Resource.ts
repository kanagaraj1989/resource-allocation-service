import * as express from 'express'
import { validationResult } from 'express-validator/check';

import Logger from "../util/logger/Logger";
import {importResource} from "../domain/Resource/Request/ImportResource";
import Resource from "../domain/Resource/Model/Resource";
import ImportResourceService from "../domain/Resource/service/ImportResourceService";
export const resourceRouter = express.Router()


resourceRouter.post('/',
  importResource,
  async (req: any, res: any) => {
    Logger.info('Auth token=', req.auth);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Logger.info('found error');
      return res.status(422).json({ errors: errors.array() });
    }

    const resources: Resource[] = req.body;

    const resposne = "";
    Logger.info('response=', resources);
    const service:ImportResourceService = new ImportResourceService(resources)
    await service.import()
    return res.status(200).json(resources)
})





