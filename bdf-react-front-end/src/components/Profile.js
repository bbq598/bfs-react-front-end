import React, { Component } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardUp,  MDBBtn, MDBCardBody, MDBAvatar, MDBRotatingCard, MDBIcon,MDBInput } from "mdbreact";
import axios from 'axios';
import {connect} from 'react-redux';
import {  getContact, setContact, setIncrease,setContact1,setContact2,setContact3,setContact4,setContact5,setContact6,setContact7,setContact8,setContact9,changeData  } from '../actions/action';
import api from '../api';

class Profile extends Component {

  constructor(props){
    super(props);
    this.state={
      users:[],
      isLoaded:false,
      flipped1: false,
    }
  }

  state={
    cont:null,
      isLoaded:false,
      flipped1: false,
      value: "ok",
    }


      handleFlipping = id => () => {
        this.props.changeData();
        console.log(this.props.contact)
        console.log(this.props.contactTemp)
        const cardId = `flipped${id}`;
        this.setState({ [cardId]: !this.state[cardId] });
      }


      getValue = (value) =>{
        console.log(value);
      }

      

      setCont(){
        if(this.state.cont == null){
            this.setState({
              cont : this.props.contact
            })
        }
      }

    componentDidMount(){
        console.log("did mount");
        this.props.setContact();
      }


    handleInput = (obj)=>{
      this.props.setContact1(obj.target.value);
    }

    handleInput2 = (obj)=>{
      this.props.setContact2(obj.target.value);
  }


  handleInput3 = (obj)=>{
    this.props.setContact3(obj.target.value);
}

handleInput4 = (obj)=>{
  this.props.setContact4(obj.target.value);
}
    
handleInput5 = (obj)=>{
  this.props.setContact5(obj.target.value);
}
handleInput6 = (obj)=>{
  this.props.setContact6(obj.target.value);

}

handleInput7 = (obj)=>{
  this.props.setContact7(obj.target.value);

}
handleInput8 = (obj)=>{
  this.props.setContact8(obj.target.value);
}
handleInput9 = (obj)=>{
  this.props.setContact9(obj.target.value);

}

onSubmit = () =>{
  this.setCont(); 
  api.post('http://localhost:8081/employee/updateContactById',this.props.contactTemp).then(res => {
    const { data } = res;
    console.log(data);
    this.props.setContact();
    window.location.reload(true);
})
.catch( (error) =>{
  if(error.response.status === 2200){
      window.location.href = 'http://localhost:9999/auth?redirect=http://localhost:3000';
  }
})
}


    onClick = ()=>{
      // this.setCont(); 
      // console.log("this . state . contact " + typeof this.state.cont)
      // console.log(this.state.cont);
      // console.log("this . props . contact " + typeof this.props.cont)
      // console.log(this.props.contact);
      console.log(this.props.contactTemp)
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
            <MDBCard className="face back" style={{ height: "850px" }}>
              <MDBCardBody>
              <MDBContainer>
          <MDBRow>
            <MDBCol md="12">
           <form>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
             Contact
            </label>
            <input type="text" id="defaultFormContactNameEx" className="form-control" defaultValue={this.props.contactTemp.phone} onInput={this.handleInput}/>
            <br />
            <input type="text" id="defaultFormContactNameEx" className="form-control" defaultValue={this.props.contactTemp.email} onInput={this.handleInput2}/>
            <br />
            <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="3" defaultValue={this.props.contactTemp.homeAddress} onInput={this.handleInput3}/>
            <br />
        <label htmlFor="defaultFormContactEmailEx" className="grey-text">
             Emergency Contact 1: 
            </label>
           <input type="text" id="defaultFormContactEmailEx" className="form-control" defaultValue={this.props.contactTemp.ec1FirstName} onInput={this.handleInput4}/>
            <br />
            <input type="text" id="defaultFormContactEmailEx" className="form-control" defaultValue={ this.props.contactTemp.ec1LastName} onInput={this.handleInput5}/><br/>

            <input type="text" id="defaultFormContactEmailEx" className="form-control" defaultValue={this.props.contactTemp.ec1Phone} onInput={this.handleInput6}/>
            <br />
            <label htmlFor="defaultFormContactSubjectEx" className="grey-text" >
            Emergency Contact 2:
           </label>
              <input type="text" id="defaultFormContactSubjectEx" className="form-control" defaultValue={this.props.contactTemp.ec2FirstName } onInput={this.handleInput7}/>
              <br />
              <input type="text" id="defaultFormContactSubjectEx" className="form-control" defaultValue={ this.props.contactTemp.ec2LastName} onInput={this.handleInput8}/> <br/>

              <input type="text" id="defaultFormContactSubjectEx" className="form-control" defaultValue={this.props.contactTemp.ec2Phone} onInput={this.handleInput9}/>
              <br />
              <div className="text-center mt-4">
                  <MDBBtn color="warning" onClick={this.handleFlipping(1)}>
                    Back
                  </MDBBtn>
                  <MDBBtn color="warning" onClick={this.onSubmit}>
                    Send
                  </MDBBtn>
                  {/* <MDBBtn color="warning" onClick={this.onClick}>
                    click
                  </MDBBtn> */}
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
      contactTemp : state.contactTemp
  }
};

const mapDispatchToProps = (dispatch) =>{
  return{
      increase: (payload) => dispatch(setIncrease(payload)),
      setContact : ()=>dispatch(getContact()),
      setContact1 : (payload) =>dispatch(setContact1(payload)),
      setContact2 : (payload) =>dispatch(setContact2(payload)),
      setContact3 : (payload) =>dispatch(setContact3(payload)),
      setContact4 : (payload) =>dispatch(setContact4(payload)),
      setContact5 : (payload) =>dispatch(setContact5(payload)),
      setContact6 : (payload) =>dispatch(setContact6(payload)),
      setContact7 : (payload) =>dispatch(setContact7(payload)),
      setContact8 : (payload) =>dispatch(setContact8(payload)),
      setContact9 : (payload) =>dispatch(setContact9(payload)),
      changeData: ()=> dispatch(changeData()),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
