import React from 'react';
import Auth from '../../lib/Auth';
import User from '../../lib/User';
import axios from 'axios';

import Form from './Form';

class NewRoute extends React.Component {
  
  state = {
    username: User.getUser().username,
    title: '',
    moreinfo: '',
    from: '',
    date: '',
    submitReport: false
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  toggleSubmitReport = () =>{
    this.setState({ submitReport: !this.state.submitReport });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const data = { ...this.state };
    axios.post('/api/questions', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/questions'))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <main>
        <h3 className="logo is-3">Is this in?</h3>
        <Form submit={this.handleSubmit} toggle={this.toggleSubmitReport} handleChange={this.handleChange} data={this.state}/>
      </main>
      );
    }
  }
export default NewRoute;
