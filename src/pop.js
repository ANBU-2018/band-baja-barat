import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import { actionCreate } from './redux/action'
import SimpleMap from './googlemap'

function Pop(props){
    return(
        <div>
            <Modal show={true} onHide={props.change} style={{textAlign:'center'}}>
                <Modal.Header closeButton>
                    <h1 style={{width:'100%',color:'blue'}}>Log In</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <br/><br/><br/>
                    <div style={{textAlign:'start'}}><Form.Label>Email</Form.Label></div>

                        <FormControl type='text'  />
                        <br/><br/><br/>
                        <p>
                            <div style={{textAlign:'start',paddingLeft:'10px'}}>Password</div>
                        </p>
                        <FormControl type='password'/>
                        <Button href='/gmap'> Log In</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
const mapStatetoProps=state=>{
    return{
        logIn:state.logIn,
        name:state.name
    }
  };
  
  const mapDispatch=dispatch=>{
    return{change:()=>
        dispatch(actionCreate())
    }
  }
export default connect(mapStatetoProps,mapDispatch)(Pop);