import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth';

class ShowQuestion extends React.Component {
  state = {
    question: {},
    deletePressed: false
  }

  componentDidMount() {
    axios.get(`/api/questions/${this.props.id}`)
      .then(res => this.setState({ question: res.data }))      
  }

  render() {
 
    return (

    <div className="container showcontainer">
     {Auth.isAuthenticated() && <Link to={`${this.props.id}/edit`} 
     params={{ id: `${this.props.id}` }}><p>edit</p></Link>}
      <div className="column colone is-three-quarters-mobile is-half-desktop">
        <h3 className="title">{this.state.question.title}</h3>
          <figure className="image">
           <img className="showimage" src={this.state.question.image} alt={this.state.question.title}/>
       </figure>
       <p>Extra info: {this.state.question.moreinfo}</p>
      <p>Where is it from: {this.state.question.from}</p>
      </div>
    </div>
    )}
  }
export default ShowQuestion;