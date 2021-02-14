import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import TimeSheetInner from './TimeSheetInner'
import WeekSelect from './WeekSelect'
import UploadFile from './UploadFile'
import ComputeHours from './ComputeHours'

// represents the entire timesheet page
export default class TimeSheet extends Component {    
    render() {
        var timesheetId = 0;
        // use MDBootstrap grid system
        return (
          <MDBContainer>
            <MDBRow>
              <MDBCol>
                <WeekSelect/>
              </MDBCol>
              <MDBCol size="8">
                <ComputeHours/>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <button id="defaultButton" type="button" className="btn btn-primary">Set Default</button>
            </MDBRow>

            <MDBRow>
              <TimeSheetInner timesheetId = {timesheetId}/>
            </MDBRow>

            <MDBRow>
              <MDBCol>
                <UploadFile/>
              </MDBCol>
              <MDBCol>
                <button id="#postTimesheet" type="button" className="btn btn-primary">Save</button>
              </MDBCol>
            </MDBRow>
            
          </MDBContainer>
        )
    }

    updateTimesheet() {
    }
}
