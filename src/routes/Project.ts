import * as express from 'express'
import { validationResult } from 'express-validator/check';

import Logger from "../util/logger/Logger";
import {importProject} from "../domain/Projects/Request/ImportProjects";
import Project from "../domain/Projects/Model/Project";
import ImportProjectService from "../domain/Projects/service/ImportProjectService";
export const projectRouter = express.Router()


projectRouter.post('/',
  importProject,
  async (req: any, res: any) => {
    Logger.info('Auth token=', req.auth);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Logger.info('found error');
      return res.status(422).json({ errors: errors.array() });
    }

    const projects: Project[] = req.body;

    const resposne = "";
    Logger.info('response=', projects);
    const service:ImportProjectService = new ImportProjectService(projects)
    await service.import()
    return res.status(201).json(projects)
  })





