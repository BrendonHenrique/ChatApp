import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chat from './components/chat';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:3001",
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