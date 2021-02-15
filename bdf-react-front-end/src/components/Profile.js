import React, { Component } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardUp,  MDBBtn, MDBCardBody, MDBAvatar, MDBRotatingCard, MDBIcon,MDBInput } from "mdbreact";
import axios from 'axios';
import {connect} from 'react-redux';
import {  getContact, setContact, setIncrease } from '../actions/action';

class Profile extends Component {

  constructor(props){
    super(props);
    this.state={
      users:[],
      isLoaded:false,
      flipped1: false,
      cont:{
        phone : "1001001000",
        email : "test@test.com",
        homeAddress : "123 Fake Home Address, SomeCity, Some State 00000",
        ec1FirstName : "Emer",
        ec1LastName : "gency",
        ec1Phone : "91191191111",
        ec2Firstname: "Another",
        ec2LastName: "Emergency",
        ec2Phone : "1191191119",
      },
    }
  }

  state={

      isLoaded:false,
      flipped1: false,
      value: "ok",

    }


      handleFlipping = id => () => {
        const cardId = `flipped${id}`;
        this.setState({ [cardId]: !this.state[cardId] });
      }


      getValue = (value) =>{
        console.log(value);
      }

      




      componentDidMount(){
        console.log("did mount");
        this.props.setContact();
        this.setState({
          cont : this.props.contact
        });
        console.log(this.state.cont);
      }


    handleInput = (obj)=>{
        const data = Object.assign({},this.state.cont,{phone:obj.target.value});
        this.setState({
          cont : data
        });
    }

    handleInput2 = (obj)=>{
      const data = Object.assign({},this.state.cont,{email:obj.target.value});
      this.setState({
        cont : data
      });
  }


  handleInput3 = (obj)=>{
    const data = Object.assign({},this.state.cont,{homeAddress:obj.target.value});
    this.setState({
      cont : data
    });
}

handleInput4 = (obj)=>{
  const data = Object.assign({},this.state.cont,{ec1FirstName:obj.target.value});
  this.setState({
    cont : data
  });
}
    
handleInput5 = (obj)=>{
  const data = Object.assign({},this.state.cont,{ec1LastName:obj.target.value});
  this.setState({
    cont : data
  });
}
handleInput6 = (obj)=>{
  const data = Object.assign({},this.state.cont,{ec1Phone:obj.target.value});
  this.setState({
    cont : data
  });
}

handleInput7 = (obj)=>{
  const data = Object.assign({},this.state.cont,{ec2FirstName:obj.target.value});
  this.setState({
    cont : data
  });
}
handleInput8 = (obj)=>{
  const data = Object.assign({},this.state.cont,{ec2LastName:obj.target.value});
  this.setState({
    cont : data
  });
}
handleInput9 = (obj)=>{
  const data = Object.assign({},this.state.cont,{ec2Phone:obj.target.value});
  this.setState({
    cont : data
  });
}
    onClick = ()=>{
      console.log(this.state.cont);
    }


    render() {
        return (

    <MDBContainer>
        <br></br>
      <MDBRow between>
        <MDBCol style={{ minHeight: '29rem', maxWidth: "22rem" }}>
          <MDBRotatingCard flipped={this.state.flipped1} className="text-center h-100 w-100">
            <MDBCard className="face front">
              <MDBCardBody>
                
                <p align ="left"> 
                <b>Contact:</b>
                <br></br>
                {this.props.contact.phone}<br/>
                 {this.props.contact.email}<br/>
                 {this.props.contact.homeAddress}<br/> 
                <br></br>
                <b>Emergency Contact 1:</b>
                <br></br>
                {this.props.contact.ec1FirstName}<br/>
                {this.props.contact.ec1LastName}<br/>
                {this.props.contact.ec1Phone}<br/>
                <b>Emergency Contact 2:</b>
                <br></br>
                {this.props.contact.ec2FirstName}<br/>
                {this.props.contact.ec2LastName}<br/>
                {this.props.contact.ec2Phone}<br/>
                </p>
                <a href="#!" className="rotate-btn text-dark" data-card="card-1" onClick={this.handleFlipping(1)}>
                  <MDBIcon icon="redo" /> Edit
                </a>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="face back" style={{ height: "900px" }}>
              <MDBCardBody>
              <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
           <form>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
             Contact
            </label>
            <input type="text" id="defaultFormContactNameEx" className="form-control" defaultValue={this.props.contact.phone} onInput={this.handleInput}/>
            <br />
            <input type="text" id="defaultFormContactNameEx" className="form-control" defaultValue={this.props.contact.email} onInput={this.handleInput2}/>
            <br />
            <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" defaultValue={this.props.contact.homeAddress} onInput={this.handleInput3}/>
            <br />
        <label htmlFor="defaultFormContactEmailEx" className="grey-text">
             Emergency Contact 1: 
            </label>
           <input type="text" id="defaultFormContactEmailEx" className="form-control" defaultValue={this.props.contact.ec1FirstName} onInput={this.handleInput4}/>
            <br />
            <input type="text" id="defaultFormContactEmailEx" className="form-control" defaultValue={ this.props.contact.ec1LastName} onInput={this.handleInput5}/><br/>

            <input type="text" id="defaultFormContactEmailEx" className="form-control" defaultValue={this.props.contact.ec1Phone} onInput={this.handleInput6}/>
            <br />
            <label htmlFor="defaultFormContactSubjectEx" className="grey-text" >
            Emergency Contact 2:
           </label>
              <input type="text" id="defaultFormContactSubjectEx" className="form-control" defaultValue={this.props.contact.ec2FirstName } onInput={this.handleInput7}/>
              <br />
              <input type="text" id="defaultFormContactSubjectEx" className="form-control" defaultValue={ this.props.contact.ec2LastName} onInput={this.handleInput8}/> <br/>

              <input type="text" id="defaultFormContactSubjectEx" className="form-control" defaultValue={this.props.contact.ec2Phone} onInput={this.handleInput9}/>
              <br />
              <div className="text-center mt-4">
                  <MDBBtn color="warning" onClick={this.handleFlipping(1)}>
                    Back
                  </MDBBtn>
                  <MDBBtn color="warning" outline type="submit">
                    Send
                  </MDBBtn>
                  <MDBBtn color="warning" onClick={this.onClick}>
                    click
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
              </MDBCardBody>
            </MDBCard>
          </MDBRotatingCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
        )
    }
}



const mapStateToProps = (state) =>{
  return{
      counter: state.counter,
      init: state.init,
      counter : state.counter,
      clickTimes : state.clickTimes,
      contact : state.contact,
  }
};

const mapDispatchToProps = (dispatch) =>{
  return{
      increase: (payload) => dispatch(setIncrease(payload)),
      setContact : ()=>dispatch(getContact()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
