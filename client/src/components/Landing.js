import React from 'react';
import background from './background.png'

const Landing = () => {
    return(
        <div style = {{textAlign: 'center', fontSize:30, fontFamily: 'Georgia', color: 'red'}}>
            
                Easily collect feedback from your users!
            
    <img src={background}/>
        </div>
    );
};

export default Landing;