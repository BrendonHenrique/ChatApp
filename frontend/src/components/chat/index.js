import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './style.css';
import {TextField, InputAdornment, Paper, Fab, InputBase, Container, Card, CardActions, CardContent, List, 
    ListItem, ListItemText, ListItemAvatar, Avatar, Typography} from '@material-ui/core';
import discordAvatar from '../../static/discord-avatar.jpg';

export default class chat extends Component {

    constructor(props){
        super(props);
        this.state = { 
            socket : this.props.socket,
            messages : [],
            author : '',
            message: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.scrollChatToBottom = this.scrollChatToBottom.bind(this);
    }
    
    componentDidMount = () => {
        
        const { socket } = this.state;
        
        socket.on('getMessages', serverResponse => {
            this.setState({messages:serverResponse});
            this.scrollChatToBottom();
        });

        socket.on('receivedMessage', newReceivedMessage => {
            this.setState({
                messages: [...this.state.messages, newReceivedMessage]
            });
            this.scrollChatToBottom();
        });
    
    }

    submitHandler = (event) => {
        const { author, message, socket } = this.state;
        event.preventDefault();
        
        if(author.length && message.length){
            socket.emit('sendMessage', {
                author, message 
            });
        }
        this.setState({message:  ''});
     }

    handleChange(event){
        const target =  event.target, 
        value  = target.type === 'checkbox' ? target.checked : target.value, 
        name = target.name;
        this.setState({
            [name] : value
        });
    }

    scrollChatToBottom(){
        this.refs.chatContainer.scrollTop = this.refs.chatContainer.scrollHeight;
    }

    render() {
        const { state } = this;
        return (
            <Container maxWidth="sm" style={{marginTop:30, height:'115vh'}}>
                <Card style={{boxShadow: '0 1px 10px white'}}>
                    <CardContent id="chat">
                        <TextField 
                        variant="outlined"
                        style={{width: '100%'}}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                            ),
                        }}
                        value={state.author} name="author" onChange={this.handleChange}
                        label="Digite seu nome" />
                        <Card className="messages" >
                            <List style={{overflowY:'scroll', height:'95%'}}  ref="chatContainer">
                                {
                                    state.messages.map( message =>( 
                                        <ListItem key={message._id} alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar  src={discordAvatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={message.author}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                        </Typography>
                                                        {message.message}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Card>
                        <CardActions>
                            <Paper style={{ padding: '2px 4px', display: 'flex', alignItems: 'center', width: '100%',boxShadow:'2px 2px 7px #e0d9d9' }}>
                                <InputBase style={{ marginLeft: 10, flex: 1 }} placeholder="Escreva a mensagem" 
                                value={state.message}  name="message" onChange={this.handleChange} />
                                <Fab color="primary" aria-label="add" onClick={this.submitHandler}>
                                    <AddIcon />
                                </Fab>
                            </Paper>
                        </CardActions>
                    </CardContent>
                </Card>                                    
            </Container>
        );
    }
}
