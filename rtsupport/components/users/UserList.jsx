import React, {Component} from 'react';
import PropTypes from 'prop-types';
import User from './User.jsx'

class UserList extends Component {

    render() {
        return (
            <ul>
                {this.props.users.map(u => <User key={u.id} user={u}/>)}
            </ul>
        )
    }

}

UserList.propTypes = {
    users: PropTypes.array.isRequired
}

export default UserList;
