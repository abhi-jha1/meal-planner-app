import React from 'react';
// import { Router, Route } from 'react-router';
import { Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Login from './pages/login';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard';
import AddMeal from './pages/addMeal'

const history = createBrowserHistory();

const createRoutes = () => (
    <Router history={history}>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/" component={Dashboard}/>
      <Route exact path="/add" component={AddMeal}/>
    </Router>
);

export default createRoutes;