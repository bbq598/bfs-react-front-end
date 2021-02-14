import React, { Component } from 'react'
import TimeSheetDay from './TimeSheetDay'
import axios from 'axios';

// represents the inner content: B2,3,4,5
// TODO: expand functionalities
export default class TimeSheetInner extends Component {
    timesheetUrl = "http://localhost:8081/time" // gateway;
    state = {timesheets:null};
    componentDidMount() {
        // getting data from timesheet service
        var userName = "tiger";
        axios
            .post(this.timesheetUrl+"/getTimeSheet", {
                "name":userName
            })
          .then((resp) => {
            console.log("Axios: data received:", resp.data);
            this.setState({ timesheets: resp.data });
          })
          .catch((error) => {
            console.log(error);
          });
    }
    
    render() {
        // render first day
        console.log("timesheet id:", this.props.timesheetId);
        if (this.state.timesheets==null) {
          return <div></div>
        }
        const items = [];
        for (const x in this.state.timesheets[0].days[0]) {
            items.push(<th key={x}>{x}</th>);
        }
        items.splice(3,0,<th key={"hours"}>Hours</th>);
        const days = [];
        for (const [ind, day] of this.state.timesheets[0].days.entries()) {
            days.push(<TimeSheetDay dayInfo = {day} key={ind}></TimeSheetDay>);
        }
        return (
          <div>
            <span>Displaying: first timesheet</span>
            <table className="table table-default">
              <thead>
                <tr>{items}</tr>
              </thead>
              <tbody>{days}</tbody>
            </table>
          </div>
        )
    }

    updateTimesheet() {
        axios
            .post(this.timesheetUrl+"/updateWeekSheet", this.state)
            .then((resp) => {
                console.log(resp);
                console.log(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
