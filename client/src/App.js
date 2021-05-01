import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import { NotificationContainer } from "react-notifications";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MailPage from "./pages/MailPage";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/mails" component={MailPage} />
      </Switch>
      <NotificationContainer />
    </div>
  );
}

export default App;
