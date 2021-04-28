import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import WelcomeService from './src/services/WelcomeService';
import './src/config/ImportEnv';
import './src/config/dbConfig';

const app = express(feathers());

// Parse JSON
app.use(express.json());

// Config socket.io realtime APIs
app.configure(socketio());

// Enable REST services
app.configure(express.rest());

// Register services
app.use('/welcome', new WelcomeService());

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
  