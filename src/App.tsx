import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "pages/Login";
import Dashboard from 'pages/Dashboard'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
