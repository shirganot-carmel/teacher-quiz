import React, { Component } from 'react';
import '../styles/scss/add-new-student.scss';
import { Link } from 'react-router-dom';
import { Menu, Search, Star, Share, Clear } from '@material-ui/icons';
// import Social from '../images/social.svg';
// import Upload from '../images/upload.svg';


class AddNewStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {
                firstName: '',
                lastName: '',
                phone: '',
                code: ''
            }
        }
    }

    handleValue = (event) =>{
        let {details} = this.state
        let {value} = event.target
        let name = event.target.getAttribute("name");
        details[name] = value;
        this.setState({details});

    }

    render() {
        let details = this.state.details
        
        return (
            <div className="add-new-student">
                <div className="top-bar">
                    <Clear />
                </div>
                    <h1>New Student</h1>
                <div className="student-details">
                    <p>First Name</p>
                    <input
                    name="firstName"
                    value={details.firstName}
                    onChange={this.handleValue}
                    >
                    </input>
                    <p>Last Name</p>
                    <input
                    name="lastName"
                    value={details.lastName}
                    onChange={this.handleValue}
                    ></input>
                    <div className="personal-code">
                        <p>Personal Code</p>
                        <div className="code-input">
                            <Share />
                            <input
                            name="code"
                            value={details.code}
                            onChange={this.handleValue}
                            ></input>
                        </div>
                    </div>
                </div>
                <div className="save-btn">
                    Save
                </div>
            </div>
        )

    }
}

export default AddNewStudent;