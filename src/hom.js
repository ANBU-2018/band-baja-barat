import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Card,Form,FormControl,Button,ButtonGroup} from 'react-bootstrap';
import './hom.css'
class Hom extends React.Component{
    render(){
        return(
        <div>
        <div class='wed'>
            <Card style={{width:'500px',marginTop:'80px',marginLeft:'15px'}}>
        <Card.Header style={{textAlign:'center'}}>Book Now</Card.Header>
        <Card.Body>
            <Form>
                <Form.Label>Where</Form.Label>
                <FormControl type="text" />
                <Form.Label style={{marginTop:'10px'}}>Date</Form.Label>
                <FormControl type="date" />
             
                <Button style={{marginTop:'20px'}} href="/" >Search</Button>
            </Form>
        </Card.Body>
    </Card>
    </div>
    <div>
        <Card className="cad1">
            <Card.Header>Explore BBB</Card.Header>
        <Card.Body>
        <ButtonGroup style={{width:"300px",marginLeft:'80px',backgroundColor:'grey',marginTop:'0'}}>
            <Button className="but1"></Button>
            <Button className="but2">Explore</Button>
        </ButtonGroup>
        <ButtonGroup style={{width:"300px",marginLeft:'80px',backgroundColor:'grey',marginTop:'0'}}>
            <Button className="but3"></Button>
            <Button className="but2">Explore</Button>
        </ButtonGroup>
        <ButtonGroup style={{width:"300px",marginLeft:'80px',backgroundColor:'grey',marginTop:'0'}}>
            <Button className="but4" ></Button>
            <Button className="but2">Explore</Button>
        </ButtonGroup>
        </Card.Body>
        </Card>
        </div>
    </div>
        )
    }
}
export default Hom;