import io from "socket.io-client";
import feathers from "@feathersjs/client";

const socket = io(process.env.REACT_APP_SOCKET_URL);
const app = feathers();

app.configure(feathers.socketio(socket));

export default app;
