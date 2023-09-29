import jwt from 'jsonwebtoken';
import User from './../model/userModel';
import Session from './../model/sessionModel';
import express from 'express';
import config from 'config';

const createToken = (id: object): string => {
  const jwt_secret_key = config.get<string>('jwt_secret_key');
  const jwt_expires_in = config.get<string>('jwt_expires_in');

  return jwt.sign({id}, jwt_secret_key, {
    expiresIn: jwt_expires_in
  });
}

export const createSession = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // check body 
    const { email, password } = req.body;

    // check email 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'email is not correct' });
    }
    
    //check password 
    const correct = await user.comparePassword(password);
  
    if (!correct) {
      return res.status(400).json({ msg: 'password is not correct' });
    }

    // if user create session
    const session = await Session.create({ user: user._id, valid: true });

    // if user create and send token 
    const token = createToken(user._id);

    res.status(201).json({
      status: 'success',
      token,
      data: 'success in created session'
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getSessionUser = async(
  req: express.Request,
  res: express.Response
) => {
  // const userId = req.user._id;
  const userId = res.locals.user._id

  const session = await Session.find({ user: userId, valid: true });

  res.status(200).json({
    status: 'success',
    length: session.length,
    session,
  });
}

// delete one session 
export const deleteSession = async(
  req: express.Request,
  res : express.Response
) => {
  // get session and user id 
  const sessionId = req.params.sessionId;
  const userId = res.locals.user._id;

  // check if user is owner the session or not 
  const session = await Session.findById(sessionId);
  
  if (!(session.user?.toString()  === userId.toString())) {
    return res.status(404).json({
      status: 'fail',
      msg : 'you not the owner this session to deleted it ! '
    })
  }

  // update session => set valid : false 
  const newsession = await Session.findByIdAndUpdate(sessionId, { valid: false }, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    session : 'invalid'
  })
}