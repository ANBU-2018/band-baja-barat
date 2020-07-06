import React from 'react'
import {actionCreate} from './redux/action'
import {connect} from 'react-redux'
function Comp2(props){
    return(
        <div>
            <h1>Hello {props.name}</h1>
    <button onClick={props.dispatch}>Click me</button>
    {console.log(props)}
        </div>
    );
}
const mapStatetoProps=state=>{
    return{
        logIn:state.logIn,
        name:state.name
    }
};

const mapDispatch=dispatch=>({
    change: () => dispatch(actionCreate())
})
export default connect(mapStatetoProps,mapDispatch)(Comp2);