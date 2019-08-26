import React, { Component } from "react";
import Home from "./Components/Home";
import IndexRoute from "./Components/Questions/IndexRoute";
import ShowRoute from "./Components/Questions/ShowRoute";
import NewRoute from "./Components/Questions/NewRoute";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import EditProfile from "./Components/Users/EditProfile";
import Profile from "./Components/Users/Profile";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProtectedRoute from "./Components/Common/ProtectedRoute";
import 'bulma';

import NavBar from "./Components/Common/Navbar";
import EditRoute from "./Components/Questions/EditRoute";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <main>
        <NavBar />
          <section className="section">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/questions" component={IndexRoute} />
              <Route exact path="/questions/new" component={NewRoute} />
              <Route exact path="/questions/:id" render={props => <ShowRoute id={props.match.params.id} />} />
              <Route exact path="/questions/:id/edit" component={EditRoute} />
              <Route exact path="/users/:id/edit" component={EditProfile} />
              <Route exact path="/users/:id/" component={Profile} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} /> 

            </Switch>
        </section>
      </main>
      </BrowserRouter>
    );
  }
}

export default App;