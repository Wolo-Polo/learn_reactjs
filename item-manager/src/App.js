import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './page/login';
import Profile from "./page/profile";
import Items from "./page/items";
import Header from "./component/header";
function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <Header />
            <Items />
          </Route>
          <Route path="/home">
            <Header />
            <Items />
          </Route>
          <Route path="/items">
            <Header />
            <Items />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
