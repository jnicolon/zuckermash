import React from 'react'

import './ChooseZuk.css'



function ChooseZuk (props) {

    console.log()

    return (
        <div className="zuck-main-container">
            <div 
                className="zuck-container" 
                onClick={props.handleClick}
            >
                <img 
                    className="zuck-img" 
                    zuckid={props.currentImgs.zuckObjLeft.id} 
                    src={props.currentImgs.zuckObjLeft.img} 
                    alt=''
                />
            </div>
            <h3>or</h3>
            <div 
                className="zuck-container" 
                onClick={props.handleClick}
            >
                <img 
                    className="zuck-img" 
                    zuckid={props.currentImgs.zuckObjRight.id} 
                    src={props.currentImgs.zuckObjRight.img} 
                    alt=''
                />
            </div>
        </div>
    )
}

export default ChooseZuk