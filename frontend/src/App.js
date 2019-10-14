import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chat from './components/chat';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://192.168.15.2:3001",
      socket: null, 
    };
  }
  
  render() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    return (
      <div>
        <Chat  socket={socket}/>
      </div>
    );
  }
}
export default App;