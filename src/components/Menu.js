import React from 'react'
import './Menu.css'

import {Link} from "react-router-dom";


function Menu (props) {
    
    //Only display the previous button if there is something to go back to.
    function displayPrevious(){
        if (props.indexHistory.length > 1) {
        return <li onClick={props.previous} className="menuLink">Previous</li>
        }
    }

    return (
        <div className="menu-container">
            <ul onClick={props.toggleBtn} className="categories">
                <li id='smile' className={props.btnObject.smileBtn ? 'selected' : '' }>Smile</li>
                <li id='congress' className={props.btnObject.congressBtn ? 'selected' : '' }>Congress</li>
                <li id='casual' className={props.btnObject.casualBtn ? 'selected' : '' }>Casual</li>
                <li id='fun' className={props.btnObject.funBtn ? 'selected' : '' }>Fun</li>
                <li id='random' className={props.btnObject.randomBtn ? 'selected' : '' }>Random</li>
            </ul>
            <ul className="menu">
                <li><Link className="menuLink" to="/About">About</Link></li>
                <li><Link className="menuLink" to="/Rankings">Rankings</Link></li>
                {displayPrevious()}
            </ul>
        </div>
    )

}

export default Menu