import React, { Component } from 'react';
import '../styles/scss/questionnaire.scss';
import { ArrowBack, Clear } from '@material-ui/icons';
import Text from '../images/Group 459.svg';
import Mic from '../images/Group 582.svg';


class Questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serialNum: 1353468,
            questions: [
                {quest:'', answers:[{ans:''}, {ans:''}, {ans:''}]}
            ],
            records: [
                {record: '', answers:[{ans: ''}]}
            ]
        }
    }

    addQuestion = () => {

    }

    addAnswer = (index, e) => {
        let {questions} = this.state
        questions[index].answers.push({ans: ''})
        this.setState({questions});
    }

    addQuestSection = (e) => {
        console.log("event occurred", e.target);
        let {type} = e.target
        let {questions} = this.state

        if(type==="record"){
            questions.push({quest:'', answers:[{ans:''}]})
        }

        else{

        }
    }

    render() {
        let { state: { serialNum } } = this
        return (
            <div className="questionnaire">
                <div className="top-bar">
                    <ArrowBack />
                </div>
                <h1>Questionnaire name</h1>
                <hr />
                <div className="serial-num">
                    <p>:Serial Number </p>
                    <p>{serialNum}</p>
                </div>
                <Choose {...this} />
                <QuestionCard {...this} />

            </div>
        )
    }
}

export default Questionnaire;



export function Choose({
    addQuestSection
}) {
    return (
        <div className="choose">
            <p>Choose:</p>
            <div className="icons">
                <img
                    type="record"
                    src={Mic}
                    onClick={addQuestSection}
                />
                <img
                    type="text"
                    src={Text}
                    onClick={addQuestSection}
                />
            </div>
        </div>
    )
}

export function QuestionCard({
    addAnswer
}) {
    return (
        <div className="question-card">

        </div>
    )
}