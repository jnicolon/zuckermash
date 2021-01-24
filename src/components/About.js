import React from 'react'
import './Rankings.css'

import {Link } from "react-router-dom";


function About() {

    return (
        
            
            <div className="rankings-main-container">
                <h1>About</h1>
                <p>Before Facebook, there was Facemash. Who knows what's next? But right now, there's ZuckerMash.</p>
                <Link className="link-rankings" to='/'>back to voting</Link>

            </div>


            
            
        
    )



}

export default About 