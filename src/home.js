import React from 'react';
import {Route,Link,BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import './home.css'
import Invite from './invite';
import Comp2 from './comp2';
import Pop from './pop'
import Pop2 from './pop2'
import { actionCreate } from './redux/action';
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Hom from './hom';

class Home extends React.Component{
  
  constructor(props){
    super(props);
    this.props=props;
  }
 
  render(){
    
    return (
      <Router>

        <div class='home'>
          <div style={{opacity:'100%',position:'relative',width:'100%',paddingTop:'10px',paddingLeft:'5px',paddingRight:'5px',}}>
          <NavBar id='bob'>
            <NavBar.Brand style={{color:'orange'}}>BBB</NavBar.Brand>
            <div id='nice'>
            <Nav.Link onClick={this.props.signup}> <Button style={{color:'black',backgroundColor:'white',borderRadius:'50px',border:'1',borderColor:'grey'}}>Sign Up</Button></Nav.Link>
            <Nav.Link onClick={this.props.login} style={{color:'black'}}> Log In</Nav.Link>
            <Nav.Link><Link to='/comp2' style={{color:'black'}}>Comp2</Link></Nav.Link>
            <Nav.Link><Link to='/' style={{color:'black'}}>Bobo</Link></Nav.Link>
            </div>
          </NavBar>
          </div>
        <div>
          <Route exact path="/" component={Hom} />
          <Route exact path="/comp2" component={Comp2} />
          {this.props.logIn?<Pop />:''}
          {this.props.signUp?<Pop2/>:''}
        </div>
       
        </div>
        {console.log(this.state)}
    </Router>
    );
  }
  
}
const mapStatetoProps=state=>{
  return{
      logIn:state.logIn,
      name:state.name,
      signUp:state.signUp
  }
};

const mapDispatch=dispatch=>{
  return{login:()=>
      dispatch(actionCreate()),
      signup:()=>dispatch({type:'SignUp'})
  }
}

export default connect(mapStatetoProps,mapDispatch)(Home);