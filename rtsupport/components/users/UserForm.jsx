import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.userName = React.createRef();
    }

    onSubmit(e) {
        e.preventDefault();
        const node = this.userName.current;
        const userName = node.value;
        this.props.setUserName(userName);
        node.value = '';
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <input
                        ref={this.userName}
                        type="text"
                        className="form-control"
                        placeholder="Set your name..."
                    />
                </div>
            </form>
        )
    }
}

UserForm.propTypes = {
    setUserName: PropTypes.func.isRequired
}

export default UserForm;
