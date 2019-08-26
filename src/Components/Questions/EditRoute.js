import React from 'react';
import Auth from '../../lib/Auth';
import User from '../../lib/User';
import axios from 'axios';

import Form from './Form';

class EditRoute extends React.Component {
  
  state = {
    title: '',
    moreinfo: '',
    from: '',
    date: '',
    submitReport: false
  }

  componentDidMount() {
    axios.get(`/api/questions/${this.props.match.params.id}`)
      .then(res => this.setState(res.data));
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
    axios.put(`/api/questions/${this.props.match.params.id}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() =>
        this.props.history.push(`/questions/${this.props.match.params.id}`));
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
export default EditRoute;
