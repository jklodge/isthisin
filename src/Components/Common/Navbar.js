import React from 'react';
import Auth from '../../lib/Auth';
import User from '../../lib/User';

import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  state = {
    isActive: false
  }

  handleToggleBurger = () => {
    this.setState({ isActive: !this.state.isActive });
  }

  handleLogout = () => {
    Auth.logout();
    // this.props.history.push('/questions');//props is the property we pass into
  }

  render() {
    return (
      <nav className="navbar is-primary">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="/images/questions.jpg" width="50px" height="100px" alt="fashion logo"/>
            &nbsp;
            Home
          </a>
            <a className="navbar-item" href="/questions">Is this in?</a>
          <div className="navbar-burger burger" data-target="#mobile-menu" onClick={this.handleToggleBurger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="mobile-menu" className={this.state.isActive ? 'navbar-menu is-active': 'navbar-menu'}>
          <div className="navbar-end" onClick={this.handleToggleBurger}>
          <Link to="/">
          {Auth.isAuthenticated() && <p className="navbar-item" onClick={this.handleLogout}>Logout</p>}
          </Link>
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
            {!Auth.isAuthenticated() &&  <Link className="navbar-item" to="/register">Register</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item" to={`/users/${Auth.getPayload().sub}`}>Hi, {User.getUser().username}</Link>}
          </div>
        </div>
      </nav>
      )}
    }
  export default NavBar;
