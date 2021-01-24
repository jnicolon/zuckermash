import React from 'react'
import './Rankings.css'

import {Link} from "react-router-dom";



function Rankings(props) {
        const zArrayRankings = [...props.zArray]

    return (
        <div className="chan">
        <h2 className='ranking-title'>Hottest Zuckerbers</h2>
            <div className="rankings-main-container">
            
                {zArrayRankings.sort((a,b) => b.points - a.points)
                             .slice(0,6)
                             .map((object, index) => 
                             <div className='rankings-cont' key={object.id}>
                             <h3>{index + 1}.</h3>
                                 <div className="rankings-img">  
                                    <img src={object.img} alt=""/>
                                 </div>
                            </div>)}
            </div>
            
            <Link className="link-rankings" to="/">Back to voting</Link>
        </div>
        
        

    )
}

export default Rankings 