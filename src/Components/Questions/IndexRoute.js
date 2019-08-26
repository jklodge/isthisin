import axios from 'axios';
import React, {Component, Props, ReactDOM}  from 'react';
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth';

// import '../public/css/styles.css';
// import './home.css';


class Questions extends React.Component {
  state = {
    questions: [],
    randomName: '',
    chosenNames: [],
    modalIsOpen: false,
    ready: false,
  }

  componentDidMount() {
    axios.get('/api/questions').then(res => {
      this.setState({questions: res.data.questions});
    })
  }

  render() {
    return (

      <main className="container hideit">
        {Auth.isAuthenticated() && <Link to='questions/new' className="title is-3 plus">+</Link>}
        <h3 className="title is-3">Your Questions Answered!</h3>
        <div className="columns is-multiline is-mobile">
          {this.state.questions.map((question, i) =>
          <div className="column is-one-quarter-desktop is-half-tablet is-three-quarters-mobile">
          <Link to={`questions/${question._id}`} params={{ id: `${question._id}` }}>
            <div className="card">
              <div className="card-content" key={i}>
              <h3 className="title">{question.title}</h3>
              </div>
              {/* <% if (locals.currentUser) { %>
                <% if(!locals.currentUser.hasFavorited(question)){ %>
                  <form method="POST" action="/questions/<%= question._id %>/favorite">
                    <button className="button is-primary fave"><i className="fa fa-heart fave"></i></button>
                  </form>
                <% } else { %>
                  <form method="GET" action="/questions/<%= question._id %>/favorite">
                    <button className="button is-danger fave"><i className="fa fa-heart fave"></i></button>
                  </form>
                <% } %>
                <% } %>*/}
              <div className="card-image" style={{backgroundImage: `url(${question.image})`}}>
              </div>
              {/*<div className="voteButtons">
              <form method="POST" action="/questions/<%= question._id %>/upvote">
              <% let totalvotes = question.downvotes.length + question.upvotes.length %>
              <% let votesCalcUp = ( Math.round( question.upvotes.length / totalvotes * 100 )) %>
              <% let votesCalcDown = ( Math.round( question.downvotes.length / totalvotes * 100 )) %>
              <% if(isNaN(votesCalcUp)) votesCalcUp = 0 %>
              <% if(isNaN(votesCalcDown)) votesCalcDown = 0 %>
                <% if(question.hasBeenUpvotedBy(locals.currentUser)) { %>
                <button className="button upvote is-success is-rounded default" disabled>Yay <%= votesCalcUp %>%</button>
                <% } else { %>
                  <button className="button upvote is-success is-rounded default">Yay <%= votesCalcUp %>%</button>
                <% } %>
              </form>
              <form method="POST" action="/questions/<%= question._id %>/downvote">
                <% if(question.hasBeenDownvotedBy(locals.currentUser)) { %>
                  <button className="button downvote is-warning is-rounded default" disabled>Sos, not Sos - <%= votesCalcDown %>%</button>
                <% } else{ %>
                  <button className="button downvote is-warning is-rounded default">Sos, not Sos - <%= votesCalcDown %>%</button>
                <% } %>
              </form>

              </div>
            */}
            </div> 
            {/* </a> */}
            </Link>
          </div>

          )}

        </div>
      </main>

    )}
  }
export default Questions;