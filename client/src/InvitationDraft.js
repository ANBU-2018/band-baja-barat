import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Accordion from 'react-bootstrap/Accordion'

import Card from 'react-bootstrap/Card'
import './InvitationDraft.css'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
class InvitationDraft extends React.Component{
    constructor(props){
        console.log(props.eventData)
        super(props);
        this.state={
            GFather:'',
            GMother:'',
            BFather:'',
            BMother:'',
            eventData:props.eventData
        }
        this.eventDetails=this.eventDetails.bind(this);
    }
    async eventDetails() {
        
    }
    
    render(){
        return(
            <div>
                <input type='number' placeholder='eventID' value={this.state.eventData.eventId} onBlur={this.eventDetails} />
                <input type='text' placeholder="Groom's Father Name" onChange={(e)=>{this.setState({GFather:e.target.value})}} value={this.state.GFather}/>
                <input type='text' placeholder="Groom's Mother Name" onChange={(e)=>{this.setState({GMother:e.target.value})}} value={this.state.GMother} />
                <input type='text' placeholder="Bride's Father Name" onChange={(e)=>{this.setState({BFather:e.target.value})}} value={this.state.BFather} />
                <input type='text' placeholder="Bride's Mother Name" onChange={(e)=>{this.setState({BMother:e.target.value})}} value={this.state.BMother} />

            <div id='inv' style={{paddingLeft:'350px'}}>
                <Accordion style={{width:'600px'}}>
                    <Card>
                        <Accordion.Toggle eventKey='0'>
                            <Card.Header id='invit'>
                                Name: Babin Khatri
                            </Card.Header>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='0'>
                            <Card.Body id='invite'>
                              <p> {this.state.eventData.groomName} son of {this.state.GFather} and {this.state.GMother}</p>
                              <h4>Weds</h4>
                              <p> {this.state.eventData.brideName} son of {this.state.BFather} and {this.state.BMother}</p> 
                                <div>
                                    
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    eventData: state.eventData
  });
export default connect(mapStateToProps)(InvitationDraft);