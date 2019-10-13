import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chat from './components/chat';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:3001",
      socket: null, 
    };
  }
  render() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    return (
      <Chat  socket={socket}/>
    );
  }
}
export default App;