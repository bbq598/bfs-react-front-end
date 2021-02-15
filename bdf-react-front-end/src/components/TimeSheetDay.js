import { MDBInput } from 'mdbreact';
import React, { Component } from 'react'

// represents a single day on the timesheet table.
export default class TimeSheetDay extends Component {
    componentDidMount() {
      console.log("checking rerender");
    }

    refreshChangeHandler(e) {
      this.props.onChangeHandler(e);
    }
    render() {
        const dayInfo = this.props.dayInfo;
        
        // mongodb key to displayed option
        const hourMap = {
          "N/A": [NaN,"N/A"],
          "00:00":[0, "12:00 A.M."]
        }
        for (var i=1; i<10; i++) {
          hourMap["0"+i+":00"]=[i, i+":00 A.M."];
        }
        for (var i=10; i<12; i++) {
          hourMap[i+":00"]=[i, i+":00 A.M."];
        }
        hourMap["12:00"]=[12,"12:00 P.M."];
        for (var i=1; i<12; i++) {
          hourMap[(12+i)+":00"]=[12+i, i+":00 P.M."];
        }
        const hourSelectMaker = () => {
          const hourItems = []; // array of options
          for (const [k,v] of Object.entries(hourMap)) {
            hourItems.push(<option key={k} value={k}>{v[1]}</option>);
          }
          return hourItems;
        }
        const dayOfWeek = this.props.dayOfWeek;
        const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const isWeekend = (dayOfWeek == 0 || dayOfWeek == 6);
        const selectedStart = (dayInfo.start=="N/A")?(isWeekend)?"N/A":"09:00":dayInfo.start;
        const selectedEnd = (dayInfo.end=="N/A")?(isWeekend)?"N/A":"18:00":dayInfo.end;
        const floatingCheckId = "floatingDate_"+dayOfWeek;
        const holidaysCheckId = "holiday_"+dayOfWeek;
        const vacationCheckId = "vacation_"+dayOfWeek;
        const totalHourItems = []; // array of options
        for (var i=0; i<=24; i++) {
          totalHourItems.push(<option key={i} value={i}>{i}</option>);
        }
        const hourDiff = (dayInfo.end!="N/A" && dayInfo.start!="N/A")
                            ?Math.max(hourMap[dayInfo.end][0]-hourMap[dayInfo.start][0],0)
                            :0.00;
        return (
            <tr>
              <td>{dayMap[this.props.dayOfWeek]}</td>
              <td>{dayInfo.date}</td>
              <td>
                <select
                  id={"start_"+dayOfWeek}
                  value={selectedStart}
                  onChange={(e)=>this.refreshChangeHandler(e)}
                  >
                  {hourSelectMaker()}
                </select>
              </td>
              <td>
                <select
                  id={"end_"+dayOfWeek}
                  value={selectedEnd}
                  onChange={(e)=>this.refreshChangeHandler(e)}
                  >
                  {hourSelectMaker()}
                </select>
              </td>
              <td>{
                <select
                  id={"totalHours_"+dayOfWeek}
                  value={hourDiff}
                  onChange={(e)=>this.refreshChangeHandler(e)}
                  >
                  {totalHourItems}
                </select>
              }</td>
              <td>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                  id={floatingCheckId}
                  defaultChecked={dayInfo.floatingDate}
                  onChange={(e)=>this.refreshChangeHandler(e)}
                  />
                  <label className="custom-control-label" htmlFor={floatingCheckId}></label>
                </div>
              </td>
              <td>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                  id={holidaysCheckId}
                  defaultChecked={dayInfo.holiday}
                  onChange={(e)=>this.refreshChangeHandler(e)}
                  disabled
                  />
                  <label className="custom-control-label" htmlFor={holidaysCheckId}></label>
                </div>
              </td>
              <td>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                  id={vacationCheckId}
                  defaultChecked={dayInfo.vacation}
                  onChange={(e)=>this.refreshChangeHandler(e)}
                  />
                  <label className="custom-control-label" htmlFor={vacationCheckId}></label>
                </div>
              </td>
            </tr>
        )
    }
}
