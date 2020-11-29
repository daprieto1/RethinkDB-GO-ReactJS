import React, {Component} from 'react';
import ChannelSection from './channels/ChannelSection.jsx'
import UserSection from './users/UserSection.jsx'
import MessageSection from "./messages/MessageSection.jsx";
import Socket from '../socket.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channels: [],
            users: [],
            messages: [],
            activeChannel: {},
            connected: false
        }
    }

    componentDidMount() {
        const socket = this.socket = new Socket();

        socket.on('connect', this.onConnect.bind(this));
        socket.on('disconnect', this.onDisconnect.bind(this));
        socket.on('channel add', this.onAddChannel.bind(this));
        socket.on('user add', this.onAddUser.bind(this));
        socket.on('user edit', this.onEditUser.bind(this));
        socket.on('user remove', this.onRemoveUser.bind(this));
        socket.on('message add', this.onMessageAdd.bind(this));
    }

    onConnect() {
        this.state = {connected: true};
        this.socket.emit('channel subscribe');
        this.socket.emit('user subscribe');
    }

    onDisconnect() {
        this.state = {connected: false};
    }

    onMessageAdd(message) {
        let {messages} = this.state;
        messages.push(message);
        this.setState({messages});
    }

    onAddUser(user) {
        let {users} = this.state;
        users.push(user);
        this.setState({users});
    }

    onEditUser(editUser) {
        let {users} = this.state;
        users = users.map(u => {
            if (editUser.id === u.id)
                return editUser
            return u;
        })
        this.setState({users});
    }

    onRemoveUser(removeUser) {
        let {users} = this.state;
        users = users.filter(u => removeUser.id !== u.id);
        this.setState({users});
    }

    onAddChannel(channel) {
        let {channels} = this.state;
        channels.push(channel);
        this.setState({channels});
    }

    addChannel(name) {
        this.socket.emit('channel add', {name})
    }

    setChannel(activeChannel) {
        this.setState({activeChannel});
        this.socket.emit('messages unsubscribe');
        this.setState({messages: []});
        this.socket.emit('messages subscribe', {channelId: activeChannel.id});
    }

    setUserName(name) {
        this.socket.emit('user edit', {name});
    }

    addMessage(body) {
        const {activeChannel} = this.state;
        this.socket.emit('message add', {channelId: activeChannel.id, body});
    }

    render() {
        return (
            <div className="app">
                <div className="nav">
                    <ChannelSection
                        {...this.state}
                        addChannel={this.addChannel.bind(this)}
                        setChannel={this.setChannel.bind(this)}
                    />
                    <UserSection
                        {...this.state}
                        setUserName={this.setUserName.bind(this)}
                    />
                </div>
                <MessageSection
                    {...this.state}
                    addMessage={this.addMessage.bind(this)}
                />
            </div>
        )
    }
}

export default App;
