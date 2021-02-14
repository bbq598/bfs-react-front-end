import React, { Component } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardUp, MDBCardBody, MDBAvatar, MDBRotatingCard, MDBIcon } from "mdbreact";
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
      users:[],
      isLoaded:false,
      flipped1: false,
    }


      handleFlipping = id => () => {
        const cardId = `flipped${id}`;
        this.setState({ [cardId]: !this.state[cardId] });
      }


      componentDidMount(){
        const name = {"name" : "tiger"}
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        axios.post('http://localhost:8081/time/getTimeSheet',name)
        .then(function (response) {
          _this.setState({
            users:response.data,
            isLoaded:true
          });
        })
        .catch(function (error) {
          console.log(error);
          _this.setState({
            isLoaded:false,
            error:error
          })
        })
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
                <h4 className="font-weight-bold mb-3">Marie Johnson</h4>
                <p className="font-weight-bold blue-text">Web developer</p>
                <a href="#!" className="rotate-btn text-dark" data-card="card-1" onClick={this.handleFlipping(1)}>
                  <MDBIcon icon="redo" /> Click here to rotate
                </a>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="face back" style={{ height: "400px" }}>
              <MDBCardBody>
               <ul>
                  {
                    this.state.users.map((item,index)=>{
                      if(index < 10){
                        return(<li key={index}>{item.weekEnding}</li>)
                      }
                    })
                  }

               </ul>

                <a href="#!" className="rotate-btn text-dark" data-card="card-1" onClick={this.handleFlipping(1)}>
                  <MDBIcon icon="undo" /> Click here to rotate back
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
