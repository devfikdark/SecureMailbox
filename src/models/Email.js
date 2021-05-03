import mongoose from 'mongoose';

const EmailSchema = new mongoose.Schema({
  subject: {
    type: String,
  },
  body: {
    type: String,
  },
  filePath: {
    type: String,
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  createAt: {
    type: Date,
  },
});


if (!mongoose.models.Email) {
  mongoose.model('Email', EmailSchema);
}

export default mongoose.models.Email;
