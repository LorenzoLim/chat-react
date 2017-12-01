import React, { Component } from 'react';
import './App.css';
import {Input, Button, Card, Title, SubTitle} from 'reactbulma'
import axios from 'axios'
class App extends Component {
  state = {
    messages: [
      // {id: 0, username: "Bob", message: "Hello"},
      // {id: 1, username: "JOE", message: "BYE"}
    ]
  }
  componentWillMount() {
    axios.get('/api/messages')
    .then((response) => {
      console.log('Success!');
      console.log(response.data);
      this.setState({
        messages: response.data
      })

   })
    .catch((error) => {
      console.log('Whoops');
      console.log(error);
    });
  };
  addMessage = (event) => {
    event.preventDefault();
    // const {messages} = this.state
    axios.post('/api/messages', {
      username: event.target.username.value,
      message: event.target.message.value
    })
    .then((response) => {
      this.setState({
        messages: response.data
      })
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    const { messages } = this.state
    return (
      <div className="App">
        <div>
           <form onSubmit={this.addMessage}>
            <label htmlFor="small">Username:<br /></label>
              <Input  type="text" name="username" large id="small" />
            <label htmlFor="large"><br />Message:<br /></label>
              <Input type="text"  name="message" large id="large"  /><br />
              <Button primary type="submit">Submit</Button>
            </form>


          {
            messages.reverse().map(comment => (
                <Card key={comment._id}>
                  <Card.Content>
                    <Title>
                    "{comment.message}"
                    </Title>
                    <SubTitle>
                      -{comment.username}
                    </SubTitle>
                  </Card.Content>
                </Card>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
