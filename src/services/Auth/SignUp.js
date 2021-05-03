import User from "../../models/User";
import sendMessage from "../../utils/response/sendMessage";
import AppError from '../../utils//errors/AppError';
import userValidator from "../../utils/validators/User";

class SignUp {
  async create(body) {
    const { fullName, email, password, role } = body;

    // body verification
    const message = userValidator(body);
    if (message !== "ok") return next(new AppError(message, 400));

    // check duplicate
    const checkDuplicate = await User.findOne({ email });
    if (checkDuplicate) return next(new AppError('Email is already in use. Please give unique email.', 400));

    const userInfo = await User.create({
      fullName,
      email,
      role,
      createAt: Date.now(),
    });
    userInfo.password = await userInfo.hashPassword(password);
    await userInfo.save();

    return sendMessage("ok", "User created successfully");
  }
}

export default SignUp;
