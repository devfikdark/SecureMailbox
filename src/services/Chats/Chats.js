import Chat from '../../models/Chats';
import sendData from '../../utils/response/sendData';

class Chats {
  async find (data) {
    const { from, to } = data.query;

    const chatInfo = await Chat.find({ from, to });

    for (let i = 0; i < chatInfo.length; i++) {
      if(chatInfo[i].from === from) {
        chatInfo[i]._doc.type = 'Send';
      } else {
        chatInfo[i]._doc.type = 'Received';
      }
    }
    
    return sendData('ok', chatInfo);
  }

  async create (body) {

    const {
      message,
      from,
      to, 
    } = body;

    const createChatInfo = await Chat.create({
      message,
      from,
      to,
      createAt: Date.now()
    });

    return sendData('ok', createChatInfo);
  }
}

export default Chats;
