import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { MDBTooltip, MDBBadge, MDBIcon } from "mdbreact";
import {connect} from 'react-redux'
import TimeSheetInner from './TimeSheetInner'
import WeekSelect from './WeekSelect'
import UploadFile from './UploadFile'
import ComputeHours from './ComputeHours'
import api from '../api'
import { setTimeSheet, setBilling, getData } from '../actions/action'

// represents the entire timesheet page
export class TimeSheet extends Component {
    // assume currentTimeSheet is set in redux
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
              <button id="defaultButton" onClick={(e)=>this.setDefault(e)} type="button" className="btn btn-primary">
                Set Default
                <MDBTooltip
                        domElement
                        tag="span"
                        material
                        placement="top"
                        >               
                  <span><MDBBadge className="ml-2">( i )</MDBBadge></span>
                  <span>Save daily hours as default; future weekly timesheet will show same hours</span>
                </MDBTooltip>
              </button>
            </MDBRow>
            <form onSubmit={(e)=>this.postTimeSheet(e)}>
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
      var updateUrl = "http://localhost:8081/time/updateWeekSheet";
      api
          .post(updateUrl, this.props.currentTimeSheet)
          .then((resp)=>{
            console.log(resp);
            window.alert("Save successful!");
            this.props.history.push('/'); // go to homepage, refresh and load data
            this.props.history.push('/timesheet'); // go to timesheet page
          })
          .catch((err)=>{
            console.log(err);
            window.alert("Error posting!");
          })
    }

    setDefault = (e) => {
      var currTimeSheet = this.props.currentTimeSheet;
      // api call
      var setDefaultUrl = "http://localhost:8081/time/setDefault";
      api
          .post(setDefaultUrl, currTimeSheet)
          .then((resp)=>{
            console.log(resp);
            window.alert("New default set successfully!");
          })
          .catch((err)=>{
            console.log(err);
            window.alert("Error posting!");
          });
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
      currTimeSheet.days[dayIdx][field] = value;
      
      // update other affected values
      if (e.target.type=="checkbox") {
        var isWeekend = (dayIdx==0 || dayIdx==6);
        currTimeSheet.days[dayIdx].start=value||isWeekend?"N/A":"09:00";
        currTimeSheet.days[dayIdx].end=value||isWeekend?"N/A":"17:00";
        currTimeSheet.days[dayIdx].hours=value||isWeekend?0:8;
      } else {
        currTimeSheet.days[dayIdx].floatingDate = false;
        currTimeSheet.days[dayIdx].holiday = false;
        currTimeSheet.days[dayIdx].vacation = false;
        if (field=="hours") {
          if (currTimeSheet.days[dayIdx].start=="N/A") currTimeSheet.days[dayIdx].start="09:00";
          currTimeSheet.days[dayIdx].end =
            reverseHourMap[Math.min(hourMap[currTimeSheet.days[dayIdx].start]+(value-0),23)];
        } else if (field=="start") {
          if (value=="N/A") {
            currTimeSheet.days[dayIdx].end = "N/A";
          } else if (currTimeSheet.days[dayIdx].end=="N/A") {
            currTimeSheet.days[dayIdx].end = "17:00";
            currTimeSheet.days[dayIdx].hours = Math.max(17-hourMap[value],0);
          } else {
            currTimeSheet.days[dayIdx].hours = hourMap[currTimeSheet.days[dayIdx].end]-hourMap[value];
          }
        } else if (field=="end") {
          if (value=="N/A") {
            currTimeSheet.days[dayIdx].start = "N/A";
          } else if (currTimeSheet.days[dayIdx].start=="N/A") {
            currTimeSheet.days[dayIdx].start = "09:00";
            currTimeSheet.days[dayIdx].hours = Math.max(hourMap[value]-9,0);
          } else {
            currTimeSheet.days[dayIdx].hours = hourMap[value]-hourMap[currTimeSheet.days[dayIdx].start];
          }
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
      currTimeSheet.totalHour = compensated;
      console.log(currTimeSheet);
      this.props.setBilling(-1); // force refresh
      this.props.setBilling(billing);
      this.props.setTimeSheet(currTimeSheet);
    }
}

const mapStateToProps = (state) =>{
  return{
      user : state.user,
      index : state.index,
      currentTimeSheet: state.currentTimeSheet,
      billingHours: state.billingHours,
  }
};

const mapDispatchToProps = (dispatch) =>{
  return{
      setTimeSheet: (payload) => dispatch(setTimeSheet(payload)),
      setBilling: (payload) => dispatch(setBilling(payload)),
      getData : () => dispatch(getData()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);