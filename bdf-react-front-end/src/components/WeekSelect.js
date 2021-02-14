import { MDBCol, MDBRow } from 'mdbreact';
import React, { Component } from 'react'

// represents the week select part: section B1
export default class WeekSelect extends Component {
    render() {
      var day = new Date();
      var saturdayIdx = 6;
      day.setDate(day.getDate()-day.getDay()+saturdayIdx);
      var saturdayString = day.toISOString().slice(0,10);
      return (
        <MDBRow>
          <MDBCol>
            Week Ending
          </MDBCol>
          <MDBCol>
            <input type="date" id="weekEnding" value={saturdayString} onChange={this.onChange}/>
          </MDBCol>
        </MDBRow>
      )
    }

    onChange = (e) => {
      e.preventDefault();
      console.log(e.target.value)
      // change timesheet fetched
    }
}
