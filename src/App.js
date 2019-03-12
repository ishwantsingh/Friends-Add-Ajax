import React, { Component } from "react";
import "./App.css";

import axios from "axios";

class App extends Component {
  state = {
    friend: null,
    error: null,
    loading: false
  };

  componentDidMount() {
    this.fetchFriends();
  }

  fetchFriends = () => {
    this.startLoader();
    axios
      .get("http://localhost:5000/friends")
      .then(friends => this.setFriend(friends.data))
      .then(this.setError);
  };

  addFriends = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/friends",
      data: {
        firstName: "Fred",
        lastName: "Flintstone"
      }
    });
  };

  setFriend = friend => {
    this.stopLoader();
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
                    <div>{`Name:${friend.name}`}</div>
                    <div>{`Age:${friend.age}`} </div>
                    <div>{`Email:${friend.email}`}</div>
                  </div>
                ))}
              </div>
              <div>
                <form>
                  <input />
                  <input />
                  <input />
                  <button onSubmit={this.addFriends}>Add Friends!</button>
                </form>
              </div>
              <button onClick={this.fetchFriends}>fetch again</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
