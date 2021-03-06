import React, { Component } from 'react';
import './add-new-student.scss';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Menu, Search, Star, Share, Clear } from '@material-ui/icons';
import { Navbar } from '../PageTools';
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

    componentDidMount() {
        this.createSerialNum()
    }

    createSerialNum = () => {
        const num = Math.floor(1000 + Math.random() * 9000);
        let { details } = this.state;
        details.code = num;

        this.setState({ details })
    }

    handleValue = (event) => {
        let { details } = this.state
        let { value } = event.target
        let name = event.target.getAttribute("name");
        details[name] = value;
        this.setState({ details });
    }

    navIconFn = () => {
        this.props.history.goBack()
    }

    render() {
        let details = this.state.details
        return (
            <div className="add-new-student">
                <Navbar mode={3} iconFn={this.navIconFn} />
                <h1>New Student</h1>

                <div className="student-details">
                    <p>First Name</p>
                    <input
                        name="firstName"
                        value={details.firstName}
                        onChange={this.handleValue} />
                    <p>Last Name</p>
                    <input
                        name="lastName"
                        value={details.lastName}
                        onChange={this.handleValue} />
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
                <div
                    className="save-btn"
                    onClick={this.props.TeacherStore.StudentsStore.addNewStudent}
                >
                    Save
                </div>
            </div>
        )

    }
}


export default inject('TeacherStore')(observer(AddNewStudent));
