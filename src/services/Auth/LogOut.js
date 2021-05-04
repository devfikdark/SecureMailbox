import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../../models/User';
import Token from '../../models/Token';
import sendMessage from '../../utils/response/sendMessage';
import AppError from '../../utils/errors/AppError';

class LogOut {
  async create (body) {

    const { token, email } = body;
    const userInfo = await User.findOne({ email });
    if (!userInfo) return sendMessage('fail', 'User not found.');

    await Token.create({ token });
    userInfo.status = false;
    await userInfo.save();
   
   return sendMessage('ok', 'Logout successfully');
  }
}

export default LogOut;