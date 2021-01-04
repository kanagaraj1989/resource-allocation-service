import config from 'config';
import { sign, verify } from 'jsonwebtoken';
import Logger from "../../../util/logger/Logger";
import {DecodedAuthToken} from "../../../util/DecodedAuthToken";
import {UserNotFoundException} from "../../User/Exception/UserNotFoundException";
import {InvalidUserNameOrPasswordException} from "../../User/Exception/InvalidUserNameOrPasswordException";

interface User {
  email: string,
  password: string,
}
const secretKey: string = config.get('auth.secretKey');
const users: User[] = config.get('users');

export const createAuthToken = (payload: object) => {
  // Need to inject a code to verify access_token & refresh token with Google api before create JWT token
  const token = sign(payload, secretKey);
  return token;
}

export const verifyAuthToken = (token: string): DecodedAuthToken => {
  const decodedAuthToken = verify(token, secretKey) as DecodedAuthToken;
  Logger.info('decodedAuthToken=',decodedAuthToken)
  return decodedAuthToken;
}

export const getUser = (userName: string, password: string) : User => {
  const user = users.find((usr: User) => usr.email.toLowerCase() === userName.toLowerCase() )
  if(typeof user === 'undefined' ) {
    throw new UserNotFoundException('user not found')
  }

  if (user.password !== password) {
    throw new InvalidUserNameOrPasswordException('user name or password is incorrect')
  }

  return user;
}

