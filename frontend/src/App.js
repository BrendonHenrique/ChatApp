import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chat from './components/chat';
import Header from './components/header';
import './app.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://192.168.15.8:3001",
      socket: null,
      drawerOpen: true,
    };
  }
  
  render() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    return (
      <div style={{height:'100vh'}}>

        {/* Header */}
          <Header handlerOpen={this.handleDrawerOpen} />
        {/*  */}
        
        {/* Chat */}
          <Chat socket={socket}/>
        {/*  */}

      </div>
    );
  }
}
export default App;