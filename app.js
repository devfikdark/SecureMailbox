import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import SignUp from './src/services/SignUp';
import SignIn from './src/services/SignIn';
import './src/config/ImportEnv';
import './src/config/dbConfig';

const app = express(feathers());

// Parse JSON
app.use(express.json());

// Config socket.io realtime APIs
app.configure(socketio());

// Enable REST services
app.configure(express.rest());

// Route
app.use('/api/auth/signup', new SignUp());
app.use('/api/auth/signin', new SignIn());

// Docs
app.use('/docs', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/9978541/TzK2Ytab');
});

// New connections connect to stream channel
app.on('connection', con => app.channel('stream').join(con));

// Publish events to stream
app.publish(data => app.channel('stream'));

const PORT = process.env.PORT || 5000;

app
  .listen(PORT)
  .on('listening', () => {
    console.log(`Server running on port ${PORT}`);
  });
  