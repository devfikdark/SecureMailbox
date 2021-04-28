import User from '../../models/User'
import sendMessage from '../../utils/response/sendMessage';
import userValidator from '../../utils/validators/User';

class SignUp {
  async create (body) {
    const { fullName, email, password, role } = body;
    
    // body verification
    const message = userValidator(body);
    if (message !== 'ok') return sendMessage('fail', message);

    // check duplicate
    const checkDuplicate = await User.findOne({ email });
    if (checkDuplicate) return sendMessage('fail', 'Already use this email');
  
    const userInfo = await User.create({
      fullName,
      email,
      role,
      createAt: Date.now(),
    });
    userInfo.password = await userInfo.hashPassword(password);
    await userInfo.save();

    return sendMessage('ok', 'User create successfully');
  }
}

export default SignUp;
