import React from 'react'
import {useSpring,animated} from 'react-spring'

function Opac(){
    const opac=useSpring({
        opacity:1,
        from:{opacity:0}
    }
    );
    return(
        <animated.h1 style={opac}>Hello there</animated.h1>
    );
}
export default Opac;