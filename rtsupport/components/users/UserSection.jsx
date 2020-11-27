import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserList from './UserList.jsx';
import UserForm from './UserForm.jsx';


class UserSection extends Component {

    render() {
        return (
            <div className="support card text-white">
                <div className="card-header bg-primary">
                    <strong>Users</strong>
                </div>
                <div className="card-body text-primary channels">
                    <UserList {...this.props}/>
                    <UserForm {...this.props}/>
                </div>
            </div>
        )
    }

}

UserSection.propTypes = {
    users: PropTypes.array.isRequired,
    setUserName: PropTypes.func.isRequired
}

export default UserSection;
