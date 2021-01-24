import React from 'react'
import MainHeader from './MainHeader'
import ChooseZuk from './ChooseZuk'
import Menu from './Menu'

import './Main.css'

function Main (props) {

    

    return (
        <div className="main-container">
            <MainHeader />
            <ChooseZuk 
                currentImgs={props.currentImgs}
                handleClick={props.handleClick}
                  
            />
            <Menu 
                toggleBtn={props.toggleBtn}
                btnObject={props.btnObject}
                previous={props.previous}  
                indexHistory={props.indexHistory}   
            />
        </div>
    )


}

export default Main