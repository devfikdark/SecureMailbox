import Email from '../../models/Email'
import sendData from '../../utils/response/sendData';

class Emails {
  async find () {
    const emailInfo = await Email.find();
    
    return sendData('ok', emailInfo);
  }

  async create (body) {
    console.log(body)
  }
}

export default Emails;
