import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import { NotificationContainer } from "react-notifications";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MailPage from "./pages/MailPage";
import LiveChatPage from "./pages/LiveChatPage";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Switch>
        <Route exact path="/" component={MailPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/mails" component={MailPage} />
        <Route exact path="/live-chat" component={LiveChatPage} />
      </Switch>
      <NotificationContainer />
    </div>
  );
}

export default App;
