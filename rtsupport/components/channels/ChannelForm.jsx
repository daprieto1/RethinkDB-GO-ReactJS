import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChannelForm extends Component {

    constructor(props) {
        super(props);
        this.channel = React.createRef();
    }

    onSubmit(e) {
        e.preventDefault();
        const node = this.channel.current;
        const channelName = node.value;
        this.props.addChannel(channelName);
        node.value = '';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <input
                        className="form-control"
                        placeholder="Add channel"
                        type="text"
                        ref={this.channel}/>
                </div>
            </form>
        )
    }

}

ChannelForm.propTypes = {
    addChannel: PropTypes.func.isRequired
}

export default ChannelForm;
