import React, { Component } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardUp,  MDBBtn, MDBCardBody, MDBAvatar, MDBRotatingCard, MDBIcon,MDBInput } from "mdbreact";
import axios from 'axios';
import {connect} from 'react-redux';
import {  setIncrease } from '../actions/action';

class Profile extends Component {

  // constructor(props){
  //   super(props);
  //   this.state={
  //     users:[],
  //     isLoaded:false,
  //     flipped1: false,
  //   }
  // }

  state={
      users:{
        phone : "1001001000",
        email : "test@test.com",
        homeAddress : "123 Fake Home Address, SomeCity, Some State 00000",
        eclFirstName : "Emer",
        eclLastName : "gency",
        eclPhone : "91191191111",
        ec2Firstname: "Another",
        ec2LastName: "Emergency",
        ec2Phone : "1191191119",
      },
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
                {this.state.users.phone}<br/>
                {this.state.users.email}<br/>
                {this.state.users.homeAddress}<br/>
                <br></br>
                <b>Emergency Contact 1:</b>
                <br></br>

                <b>Emergency Contact 2:</b>
                </p>
                <a href="#!" className="rotate-btn text-dark" data-card="card-1" onClick={this.handleFlipping(1)}>
                  <MDBIcon icon="redo" /> Edit
                </a>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="face back" style={{ height: "700px" }}>
              <MDBCardBody>
              <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
           <form>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
             Contact
            </label>
            <input type="text" id="defaultFormContactNameEx" className="form-control" defaultValue={this.state.value}/>
            <br />
            <input type="text" id="defaultFormContactNameEx" className="form-control" />
            <br />
            <input type="text" id="defaultFormContactNameEx" className="form-control" />
            <br />
        <label htmlFor="defaultFormContactEmailEx" className="grey-text">
             Emergency Contact 1: 
            </label>
           <input type="email" id="defaultFormContactEmailEx" className="form-control" />
            <br />
            <input type="email" id="defaultFormContactEmailEx" className="form-control" />
            <br />
            <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
            Emergency Contact 1:
           </label>
              <input type="text" id="defaultFormContactSubjectEx" className="form-control" />
              <br />
              <input type="text" id="defaultFormContactSubjectEx" className="form-control" />
              <br />
              <div className="text-center mt-4">
                  <MDBBtn color="warning" outline type="submit">
                    Send
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

                <a href="#!" className="rotate-btn text-dark" data-card="card-1" onClick={this.handleFlipping(1)}>
                  <MDBIcon icon="undo" /> Save
                </a>
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
      clickTimes : state.clickTimes
  }
};

const mapDispatchToProps = (dispatch) =>{
  return{
      increase: (payload) => dispatch(setIncrease(payload)),

  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
