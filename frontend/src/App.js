import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chat from './components/chat';
import Header from './components/header';
import './app.css';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';


class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://192.168.15.2:3001",
      socket: null,
      drawerOpen: true,
    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({drawerOpen: true})
  };
  
  handleDrawerClose = () => {
    this.setState({drawerOpen: false})
  };

  
  render() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    return (
      <div style={{height:'100vh'}}>

        {/* Header */}
          <Header handlerOpen={this.handleDrawerOpen} />
        {/*  */}
        
        {/* Menu lateral  */}
          <SwipeableDrawer
            anchor="left"
            onClose={this.handleDrawerClose}
            onOpen={this.handleDrawerOpen}
            open={this.state.drawerOpen} >
            <Divider />
            <List>
              {['user1', 'user2', 'user3', 'user4384732874'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon><AccountCircle /></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </SwipeableDrawer>
        {/*  */}
        
        {/* Chat */}
          <Chat socket={socket}/>
        {/*  */}

      </div>
    );
  }
}
export default App;