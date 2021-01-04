import * as express from 'express'
import {resourceRouter} from './Resource'
import {validationResult} from 'express-validator/check';
import {AuthTokenRequestSchema} from '../domain/OAuth/Request/AuthRequestSchema';
import {createAuthToken, getUser, verifyAuthToken} from '../domain/OAuth/service/AuthService';
import {UserNotFoundException} from "../domain/User/Exception/UserNotFoundException";
import {InvalidUserNameOrPasswordException} from "../domain/User/Exception/InvalidUserNameOrPasswordException";
import Logger from "../util/logger/Logger";
import {projectRouter} from "./Project";
import AllocationReportService from "../domain/AllocationReport/service/AllocationReportService";

export const rootRouter = express.Router()
rootRouter.post('/authToken',
  AuthTokenRequestSchema,
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const user = getUser(req.body.email, req.body.password)
    } catch (error) {
      let message = 'Internal server error.'
      Logger.error('error message when authenticate user =', error);
      if (error instanceof UserNotFoundException) {
        message = error.message
        res.status(404).json({ message })
      } else if (error instanceof InvalidUserNameOrPasswordException) {
        message = error.message
        res.status(401).json({ message })
      } else {
        res.status(500).json({ message})
      }
    }
    const jwtPayload = {
      email: req.body.email,
    };
    const token = createAuthToken(jwtPayload);

    return res.status(201).json({accessToken: token});
  });

rootRouter.use((req: any, res:any, next:any) => {
  const authorizationHeader = req.headers.authorization as string

  if (!authorizationHeader) {
    return res.status(401).send({ message: 'No token provided.' })
  }

  let decodedToken
  try {
    decodedToken = verifyAuthToken(authorizationHeader.replace('Bearer ', ''));
  } catch (error) {
    return res.status(401).send({ message: error.message })
  }

  if (!decodedToken) {
    return res.status(401).send({ message: 'User unauthenticated.' })
  }
  req.body.auth = decodedToken;

  next();
})

rootRouter.use('/import/resource', resourceRouter)
rootRouter.use('/import/project', projectRouter)

rootRouter.post('/allocate', async (req: any, res:any) => {
  const service = new AllocationReportService()
  await service.AllocateResource();
  res.status(201).send({message: 'resource allocated successfully'})
});





