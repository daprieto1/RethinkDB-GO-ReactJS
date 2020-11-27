import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MessageForm extends Component {

    constructor(props) {
        super(props);
        this.message = React.createRef();
    }

    onSubmit(e) {
        e.preventDefault();
        const node = this.message.current;
        const message = node.value;
        this.props.addMessage(message);
        node.value = '';
    }

    render() {
        let input;
        if (this.props.activeChannel.id !== undefined) {
            input = (<input
                ref={this.message}
                type="text"
                className="form-control"
                placeholder="Add Message..."
            />)
        }
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    {input}
                </div>
            </form>
        )

    }

}

MessageForm.propTypes = {
    activeChannel: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired
}

export default MessageForm;
