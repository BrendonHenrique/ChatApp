import React, { Component } from 'react';
import './style.css';

export default class chat extends Component {

    constructor(props){
        super(props);
        this.state = { 
            socket : this.props.socket,
            messages : [],
            userID: Number,
            author : '',
            message: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    
    componentDidMount = () => {
        const { socket } = this.state;
        socket.on('newUser', userID => {
            this.setState({userID});
        });
        socket.on('receivedMessage', newReceivedMessage => {
            this.setState({
                messages: [...this.state.messages, newReceivedMessage]
            });
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
        this.setState({
            messages: [...this.state.messages, {author, message}],
            message:  ''
        });
    }

    handleChange(event){
        const target =  event.target, 
        value  = target.type === 'checkbox' ? target.checked : target.value, 
        name = target.name;
        this.setState({
            [name] : value
        });
    }

    render() {
        const { state } = this;
        return (
            <div>
                <form id="chat" onSubmit={this.submitHandler}>
                    <div className="users-list">
                    </div>
                    <input value={state.author} name="author" onChange={this.handleChange}
                    placeholder="Digite seu nome:" />
                    <div className="messages">
                        <ul>
                            {
                                state.messages.map( message => <li key={message.message}> <strong>{message.author} says</strong>: {message.message} </li>)
                            }
                        </ul>
                    </div>
                    <input value={state.message}  name="message" onChange={this.handleChange} 
                    placeholder="Digite sua mensagem:" />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        );
    }
}
