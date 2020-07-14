import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/PageTools.scss';
import { Menu, ArrowBack, Clear, Add, Star } from '@material-ui/icons';
import Conversation from '../images/conversation-blue.svg';


export const Navbar = ({ icon }) => {
    const dIcon = (() => {
        switch (icon) {
            case 'menu': return <Menu />;
            case 'x': return <Clear />;
            case 'back': return <ArrowBack />;
            default: console.log('icon wasnt found'); return;
        }
    })()

    return (<div className='pageTools_navbar'>{dIcon}</div>);
}


export const ListUnit = ({
    mode,//1-quiz, 2-student
    info: { title, subTitle, numInfo },
    onClick
}) => {
    const niIcon = (() => {
        switch (mode) {
            case 1: return <img src={Conversation} />
            case 2: return <Star />
            default: return;
        }
    })()
    return (
        <div className="pageTools_listUnit" onClick={onClick} >
            <div className='stInfo' >
                <h3>{title}</h3>
                {mode === 1 && subTitle && <h4>{subTitle}</h4>}
            </div>

            <div className="numInfo">
                <p>{numInfo}</p>
                {niIcon}
            </div>
        </div>
    );
}


export const PlusBtn = ({ redirect }) => {
    return (
        <Link
            className="pageTools_plusBtn"
            to={redirect}>
            <Add />
        </Link>
    );
}