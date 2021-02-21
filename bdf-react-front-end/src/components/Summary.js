import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';
import { MDBTooltip, MDBBadge, MDBContainer,MDBBtn,MDBIcon } from "mdbreact";
import { setIndex, setData,getData, setTimeSheet, setBilling } from '../actions/action';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import storage from 'redux-persist/lib/storage';
import getStoredState from 'redux-persist/es/getStoredState';
import Cookies from 'js-cookie';



class Summary extends Component {


  state={
    // users:[],
    isLoaded:false,
    index : 5,
    username: Cookies.get('JWT-TOKEN')
  }

  OnClick = (num) =>{
    if(this.state.index < 6 && num < 0 ){
      num = 0;
    }
    if(this.state.index + num > this.props.user.length + 5 && num > 0){
      num = 0;
    }
    this.setState({
      index: this.state.index + num,
    })
  }

  handleSetIndex = (index) =>{
    this.props.setIndex(index);
    this.props.setTimeSheet(this.props.user[index]);
    
    // recompute billing hours upon loading new timesheet
    var currTimeSheet = this.props.user[index];
    var billing=0;
    const hourMap = {"N/A": NaN}
    for (var i=0; i<10; i++) { hourMap["0"+i+":00"]=i; }
    for (var i=10; i<24; i++) { hourMap[i+":00"]=i; }
    for (var day=0; day<7; day++) {
      if (!currTimeSheet.days[day].floatingDate && !currTimeSheet.days[day].holiday && !currTimeSheet.days[day].vacation){
        // compute work hours
        var hr = hourMap[currTimeSheet.days[day].end]-hourMap[currTimeSheet.days[day].start];
        if (isNaN(hr) || hr<0) hr=0;
        billing+=hr;
      }
    }
    this.props.setBilling(billing);
    console.log(this.state.username);
    this.props.history.push('/timesheet'); // go to timesheet page
  }

  componentDidMount(){
    this.props.getData();
    this.props.setTimeSheet(this.props.user[this.props.index]);

    // Cookies.set('name', 'value');
    // const name = {"name" : "tiger"}
    // const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    // axios.post('http://localhost:8081/time/getTimeSheet',name)
    // .then(function (response) {
    //   _this.setState({
    //     users:response.data,
    //     isLoaded:true
    //   });
    //   this.props.setData(response.data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    //   _this.setState({
    //     isLoaded:false,
    //     error:error
    //   })
    // })
  }

  render() {
    return (
      <div>
         <MDBTable hover>
      <MDBTableHead>
        <tr>
          <th>WeekEnding</th>
          <th>Total Hours</th>
          <th>Submission Status</th>
          <th>Approval Status</th>
          <th>Option</th>
          <th>Comment</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {
          this.props.user.map((item,index)=>{
              if(index < this.state.index){
                    return(
                    <tr key={index}>
                      <td>{item.weekEnding} </td>
                      <td>{item.totalHour} </td>
                      <td>{item.submissionStatus}  {item.submissionStatus == 	"Incomplete" ?
                      <MDBTooltip
                        domElement
                        tag="span"
                        material
                        placement="top"
                        >               
                       <span><MDBBadge color="danger" className="ml-2">!</MDBBadge></span>
                       <span>Items due: Proof of Approved TimeSheet</span>
                       </MDBTooltip>

                       : ""  } </td> 
                      <td>{item.approvalStatus} </td> 
                      <td > <MDBBtn gradient="peach" onClick={()=>this.handleSetIndex(index)}>{item.submissionStatus == "Incomplete"|| item.submissionStatus == "Not Start" ? "edit":"view"}</MDBBtn></td>
                      <td>{item.floatingDay > 0 && item.submissionStatus == "Incomplete"?<MDBTooltip
                        domElement
                        tag="span"
                        material
                        placement="top"
                        >        
                       <span><MDBBadge color="danger" className="ml-2">{item.floatingDay} floating day required !</MDBBadge></span>
                       <span>you only have {item.floatDayLeft} floating day left this year</span>
                       </MDBTooltip>
                        : " " }</td>
                    </tr>                                  
                    )
                  }
            })
        }
        
      </MDBTableBody>
    </MDBTable>
    <center><MDBBtn color="primary" onClick={() => this.OnClick(-5)}>Show Less</MDBBtn>
    <MDBBtn color="primary" onClick={()=>this.OnClick(5)}>Show More</MDBBtn></center>

      </div>
    )
  }
}


const mapStateToProps = (state) =>{
  return{
      init : state.init,
      user : state.user,
      index : state.index
  }
};

const mapDispatchToProps = (dispatch) =>{
  return{
      setData: (payload) => dispatch(setData(payload)),
      setIndex: (payload) => dispatch(setIndex(payload)),
      getData : () => dispatch(getData()),
      setTimeSheet: (payload) => dispatch(setTimeSheet(payload)),
      setBilling: (payload) => dispatch(setBilling(payload)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Summary);