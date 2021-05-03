import User from '../../models/User'
import sendData from '../../utils/response/sendData';
import AppError from '../../utils//errors/AppError';
import createJWT from '../../middlewares/jwtToken'

class SignIn {
  async create (body) {
    const { email, password } = body;
    
    // body verification
    if (!email) return next(new AppError('provide your email', 400));
    if (!password) return next(new AppError('provide your password', 400));

    // check auth
    const userInfo = await User.findOne({
      email,
    }).select('+password');

    if (!userInfo || !(await userInfo.verifyPassword(password, userInfo.password))) {
      return next(new AppError('Incorrect username or password', 400));
    }

    return sendData('ok', {
      fullName: userInfo.fullName,
      email: userInfo.email,
      token: createJWT(userInfo._id),
    });
  }
}

export default SignIn;
