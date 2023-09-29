import express from 'express';
import User from '../model/userModel';
import { omit , get } from 'lodash';
import jwt from 'jsonwebtoken';
import config from 'config';
import {promisify} from 'util'

export const register = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(401).json('write the field to register!');
    }
    const user = await User.create({ name, email, password });
    return res.status(201).json(omit(user.toJSON(), 'password'));

  } catch (error) {
    return res.status(400).json(error);
  }
};

export const protect = async(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let token
  // get token if exist
  if (req.headers.authorization && 
    req.headers.authorization.startsWith('B')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(400).json({
      status: 'fail',
      msg: 'not found the token , login or register again!'
    });
  }

  // verify the token 
  const secret_key =  config.get<string>('jwt_secret_key')
  const decoded = await promisify(jwt.verify)(token, secret_key);
  
  // check user if still exist or not 
  const currentUser = await User.findById(get(decoded , 'id'));
  
  if (!currentUser) {
    return res.status(404).json({
      status: 'faild',
      msg: 'user no longer exist!'
    });
  }

  // if user already exist
  // req.user = currentUser; 
  res.locals.user = currentUser
  next();

} 