import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import {connect} from 'react-redux'
import TimeSheetInner from './TimeSheetInner'
import WeekSelect from './WeekSelect'
import UploadFile from './UploadFile'
import ComputeHours from './ComputeHours'
import axios from 'axios'
import { setTimeSheet, setBilling, toggleFlag } from '../actions/action'

// represents the entire timesheet page
export class TimeSheet extends Component {
    componentDidMount() {
      this.props.setTimeSheet(this.props.user[this.props.index]);
      if (this.props) console.log(this.props.currentTimeSheet);
    }
    render() {
        // use MDBootstrap grid system
        return (
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <WeekSelect/>
              </MDBCol>
              <MDBCol size="8">
                <ComputeHours billing={this.props.billingHours} compensated={this.props.currentTimeSheet.totalHour}/>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <button id="defaultButton" type="button" className="btn btn-primary">Set Default</button>
            </MDBRow>
            <form onSubmit={(e)=>this.postTimeSheet(e)}> // form component for inputs
            <MDBRow>
              <TimeSheetInner onChangeHandler = {(e)=>this.onChangeHandler(e)}/>
            </MDBRow>

            <MDBRow around>
              <MDBCol size="5">
                <UploadFile/>
              </MDBCol>
              <MDBCol size="4">
                <button id="#postTimesheet" type="submit" className="btn btn-primary">Save</button>
              </MDBCol>
            </MDBRow>
            </form>
          </MDBContainer>
        )
    }

    postTimeSheet(e) {
      e.preventDefault();
      console.log(this.state);
      // var updateUrl = "http://localhost:8081/time/updateTimesheet";
      var updateUrl = "";
      axios
          .post(updateUrl, this.props.currentTimeSheet)
          .then((resp)=>{
            console.log(resp);
          })
          .catch((err)=>{
            console.log(err);
          })
    }

    onChangeHandler = (e) => {
      const hourMap = {"N/A": NaN}
      for (var i=0; i<10; i++) { hourMap["0"+i+":00"]=i; }
      for (var i=10; i<24; i++) { hourMap[i+":00"]=i; }
      const reverseHourMap = {};
      for (var k in hourMap) {reverseHourMap[hourMap[k]]=k;}
      // update value on local before setting it back;
      var currTimeSheet = this.props.currentTimeSheet;
      const [field, dayIdx] = e.target.id.split('_');
      const value = (e.target.type=="checkbox")?e.target.checked:e.target.value;
      if (field!="totalHours") currTimeSheet.days[dayIdx][field] = value;
      // update other affected values
      if (e.target.type=="checkbox" && dayIdx!=0 && dayIdx!=6) {
        currTimeSheet.days[dayIdx].start=value?"N/A":"09:00";
        currTimeSheet.days[dayIdx].end=value?"N/A":"17:00";
      } else {
        currTimeSheet.days[dayIdx].floatingDate = false;
        currTimeSheet.days[dayIdx].holiday = false;
        currTimeSheet.days[dayIdx].vacation = false;
        if (field=="totalHours") {
          if (currTimeSheet.days[dayIdx].start=="N/A") currTimeSheet.days[dayIdx].start="09:00";
          currTimeSheet.days[dayIdx].end =
            reverseHourMap[Math.min(hourMap[currTimeSheet.days[dayIdx].start]+(value-0),23)];
        } else if (field=="start" && currTimeSheet.days[dayIdx].end=="N/A") {
          currTimeSheet.days[dayIdx].end = "18:00";
        } else if (field=="end" && currTimeSheet.days[dayIdx].start=="N/A") {
          currTimeSheet.days[dayIdx].start = "09:00";
        }
      }

      // update total hours
      
      var billing=0, compensated=0;
      for (var day=0; day<7; day++) {
        if (currTimeSheet.days[day].floatingDate) {
          compensated+=8; // add 8 for floating days
        } else if (!currTimeSheet.days[day].holiday && !currTimeSheet.days[day].vacation){
          // compute work hours
          var hr = hourMap[currTimeSheet.days[day].end]-hourMap[currTimeSheet.days[day].start];
          if (isNaN(hr) || hr<0) hr=0;
          billing+=hr; compensated+=hr;
        }
      }
      console.log("billing: ", billing, ", compensated: ", compensated);
      currTimeSheet.totalHour = compensated;
      console.log(currTimeSheet);
      this.props.setBilling(billing);
      this.props.setTimeSheet(currTimeSheet);
      console.log(this.props.billingHours);
      this.props.toggleFlag();
    }
}

const mapStateToProps = (state) =>{
  return{
      user : state.user,
      index : state.index,
      currentTimeSheet: state.currentTimeSheet,
      billingHours: state.billingHours,
      flag: state.flag
  }
};

const mapDispatchToProps = (dispatch) =>{
  return{
      setTimeSheet: (payload) => dispatch(setTimeSheet(payload)),
      setBilling: (payload) => dispatch(setBilling(payload)),
      toggleFlag: (payload) => dispatch(toggleFlag(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);