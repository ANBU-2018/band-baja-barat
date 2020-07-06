import React from 'react'
import {Route,BrowserRouter as Router} from 'react-router-dom'
import Home from './home'
import SimpleMap from './googlemap'
class Index extends React.Component{
    render(){
        return(
            <Router>
                <Route exact path='/' component={Home} />
                <Route path='/gmap' component={SimpleMap} />
            </Router>
        )
    }
}
export default Index;