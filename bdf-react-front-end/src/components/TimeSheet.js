import React, { Component } from 'react'
import TimeSheetDay from './TimeSheetDay'
import WeekSelect from './WeekSelect'
import UploadFile from './UploadFile'
import ComputeHours from './ComputeHours'
import axios from 'axios';

export default class TimeSheet extends Component {
    // hardcoded: POST from {"name":"tiger"}, first entry
    state = {
        timesheetArray:[
            {
              "id": "6025c2e80804af4cba0a4622",
              "userName": "tiger",
              "weekEnding": "2021-02-13",
              "totalHour": 400,
              "submissionStatus": "close",
              "approvalStatus": "close",
              "comment": "eat meat",
              "days": [
                {
                  "date": "2021-02-30",
                  "start": "09:00",
                  "end": "17:00",
                  "floatingDate": false,
                  "vacation": false,
                  "holiday": false
                },
                {
                  "date": "2021-02-30",
                  "start": "09:00",
                  "end": "17:00",
                  "floatingDate": false,
                  "vacation": false,
                  "holiday": false
                }
              ]
            },
            {
              "id": "6026ab8afb238966cb5c7d05",
              "userName": "tiger",
              "weekEnding": "2021-02-13",
              "totalHour": 41,
              "submissionStatus": "close",
              "approvalStatus": "close",
              "comment": "eat meat",
              "days": [
                {
                  "date": "2021-02-30",
                  "start": "09:00",
                  "end": "17:00",
                  "floatingDate": false,
                  "vacation": false,
                  "holiday": false
                },
                {
                  "date": "2021-02-30",
                  "start": "09:00",
                  "end": "17:00",
                  "floatingDate": false,
                  "vacation": false,
                  "holiday": false
                }
              ]
            }
          ]
    };
    timesheetUrl = "localhost:8081/time" // gateway
    
    componentDidMount() {
        // // getting data from timesheet service
        // userName = "tiger"
        // axios
        //     .post(this.timesheetUrl+"/getTimeSheet", {
        //         "name":userName
        //     })
        //   .then((resp) => {
        //     console.log(resp);
        //     this.setState({ timesheet: resp.data });
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
    }
    
    render() {
        // render first day
        const items = [];
        for (const x in this.state.timesheetArray[0].days[0]) {
            items.push(<th key={x}>{x}</th>);
        }
        const days = [];
        for (const [ind, day] of this.state.timesheetArray[0].days.entries()) {
            days.push(<TimeSheetDay dayInfo = {day} key={ind}></TimeSheetDay>);
        }
        // need to refactor the inner timesheet component
        return (
            <div>
                <WeekSelect/>
                <ComputeHours/>
                <button>Set Default</button>
                <table className="table table-default">
                    <thead>
                        <tr>
                            {items}
                        </tr>
                    </thead>
                    <tbody>
                        {days}
                    </tbody>
                </table>
                <UploadFile/>
                <button>Save</button>
            </div>
        )
    }

    updateTimesheet() {
        axios
            .post(this.timesheetUrl+"/updateWeekSheet", this.state)
            .then((resp) => {
                console.log(resp);
                console.log(resp.status);
                console.log(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
