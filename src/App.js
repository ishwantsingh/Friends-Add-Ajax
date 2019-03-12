import React, { Component } from "react";
import "./App.css";

import axios from "axios";

const personURL = "http://localhost:5000/friends";

class App extends Component {
  state = {
    friend: null,
    error: null,
    loading: false
  };

  addNameRef = React.createRef();
  addAgeRef = React.createRef();
  addEmailRef = React.createRef();

  updateNameRef = React.createRef();
  updateAgeRef = React.createRef();
  updateEmailRef = React.createRef();
  inputIdRef = React.createRef();

  componentDidMount() {
    this.fetchFriends();
  }

  fetchFriends = () => {
    this.startLoader();
    this.resetError();
    axios
      .get("http://localhost:5000/friends")
      .then(friends => this.setFriend(friends.data))
      .then(this.setError)
      .finally(this.stopLoader);
  };

  addFriends = () => {
    this.startLoader();
    this.resetError();
    const name = this.addNameRef.current.value;
    const age = this.addAgeRef.current.value;
    const email = this.addEmailRef.current.value;
    axios
      .post(personURL, { name, age, email })
      .then(person => this.setFriend(person.data))
      .catch(this.setError)
      .finally(this.stopLoader);
  };

  updateFriends = id => {
    this.startLoader();
    this.resetError();
    const name = this.updateNameRef.current.value;
    const age = this.updateAgeRef.current.value;
    const email = this.updateEmailRef.current.value;
    axios
      .put(`${personURL}/${id}`, { name, age, email })
      .then(person => this.setFriend(person.data))
      .catch(this.setError)
      .finally(this.stopLoader);
  };

  deleteFriends = id => {
    this.startLoader();
    this.resetError();
    axios
      .delete(`${personURL}/${id}`)
      .then(person => this.setFriend(person.data))
      .catch(this.setError)
      .finally(this.stopLoader);
  };

  setFriend = friend => {
    this.setState({ friend });
  };
  setError = error => {
    console.dir(error);
    this.setState({ error });
  };
  resetError = () => {
    this.setState({ error: null });
  };
  startLoader = () => {
    this.setState({ loading: true });
  };
  stopLoader = () => {
    this.setState({ loading: false });
  };

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }
    if (this.state.error) {
      return (
        <div>
          Argh! This failed rather miserably.
          <button onClick={this.fetchFriends}>fetch again</button>
        </div>
      );
    }
    return (
      <div className="App">
        <div>
          {console.log(this.state.friend)}
          {this.state.friend && (
            <div>
              <div>
                {this.state.friend.map(friend => (
                  <div>
                    <div>{`Id:${friend.id}`}</div>
                    <div>{`Name:${friend.name}`}</div>
                    <div>{`Age:${friend.age}`} </div>
                    <div>{`Email:${friend.email}`}</div>
                    <div>
                      <button onClick={() => this.deleteFriends(friend.id)}>
                        Delete Friend!
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <input type="text" placeholder="name" ref={this.addNameRef} />
                <input type="text" placeholder="age" ref={this.addAgeRef} />
                <input type="text" placeholder="email" ref={this.addEmailRef} />
                <button onClick={this.addFriends}>Add Friend!</button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="name"
                  ref={this.updateNameRef}
                />
                <input type="text" placeholder="age" ref={this.updateAgeRef} />
                <input
                  type="text"
                  placeholder="email"
                  ref={this.updateEmailRef}
                />
                <input type="text" placeholder="id" ref={this.inputIdRef} />
                <button
                  onClick={() =>
                    this.updateFriends(this.inputIdRef.current.value)
                  }
                >
                  Update Friend!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
