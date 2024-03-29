import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Accordion from 'react-bootstrap/Accordion'

import Card from 'react-bootstrap/Card'
import './comp1.css'
import UserHeader from '../UserHeader.js'
import { connect } from 'react-redux'
class Invite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            invitation: [],
            userName:props.userName
        }
    }
    //Hardcoded
    async componentDidMount() {
        const response = await fetch(`http://localhost:9000/userhome/invitationrecieved?userName=${this.state.userName}`);
        const data = await response.json();
        console.log(data)
        this.setState({
            invitation: data.data
        })

    }
    render() {
        return (
            <div>
                <UserHeader />
                <div id='inv'>
                    {Object.keys(this.state.invitation).map((keys) => {
                        return (<div style={{ paddingTop: '20px' }}>
                            <Accordion style={{ width: '600px' }}>
                                <Card>
                                    <Accordion.Toggle eventKey='0'>
                                        <Card.Header id='invit'>
                                            Name: {this.state.userName}
                                        </Card.Header>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey='0'>
                                        <Card.Body id='invite'><br/><br/>
                                        <strong> <h4>{this.state.invitation[keys].groomName} son of {this.state.invitation[keys].groomFather} and {this.state.invitation[keys].groomMother}</h4></strong>
                              <h2>Weds</h2>
                              <strong><h4> {this.state.invitation[keys].brideName} daughter of {this.state.invitation[keys].brideFather} and {this.state.invitation[keys].brideMother}</h4></strong> 
                                            <div className='invitationDraft__honorableMention'>
                                                <h2>Honorable Mention</h2>
                                                {this.state.invitation[keys].honorableMention1}<br/>
                                                {this.state.invitation[keys].honorableMention2}
                                                {console.log(this.state.invitation)}
                                            </div>
                                            <div className='invitationDraft__location'>
                                                Party Palace:{this.state.invitation[keys].hostName}<br />
                                                Date:{new Date(this.state.invitation[keys].eventDate.slice(0,4),this.state.invitation[keys].eventDate.slice(5,7)-1, parseInt(this.state.invitation[keys].eventDate.slice(8,10))+2).toString().slice(0,15)}
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>)
                    })}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userName: state.userData[0].userName
  });
export default connect(mapStateToProps)(Invite);