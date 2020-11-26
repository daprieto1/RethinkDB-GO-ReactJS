class Channel extends React.Component {

    channelSelected() {
        console.log('I was clicked', this.props.name)
    }

    render() {
        return (
            <li onClick={this.channelSelected.bind(this)}>{this.props.name}</li>
        )
    }
}

class ChannelList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.channels.map(c => <Channel name={c.name}/>)}
            </ul>
        )
    }
}

class ChannelForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange(e) {
        this.setState({
            channelName: e.target.value
        })
    }

    onSubmit(e) {
        const {channelName} = this.state;
        console.log(channelName);
        this.setState({
            channelName: ''
        });
        this.props.addChannel(channelName);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <input type="text" onChange={this.onChange.bind(this)} value={this.state.channelName}/>
            </form>
        )
    }
}

class ChannelSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            channels: [
                {name: 'Hardware Support'},
                {name: 'Software Support'}
            ]
        }
    }

    addChannel(name) {
        const {channels} = this.state;
        channels.push({name});
        this.setState({channels});
    }

    render() {
        return (
            <div>
                <ChannelList channels={this.state.channels}/>
                <ChannelForm addChannel={this.addChannel.bind(this)}/>
            </div>
        )
    }
}

ReactDOM.render(<ChannelSection/>, document.getElementById('app'))
