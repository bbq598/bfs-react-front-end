import React, { Component } from 'react'

// represents a single day on the timesheet table.
export default class TimeSheetDay extends Component {
    state = {};
    render() {
        const items = [];
        // var arr = Object.values(this.props.dayInfo);
        // for (const [ind,val] of arr.entries()) {
        //   items.push(<td key={ind}>
        //     {""+val}
        //   </td>);
        // }
        for (var key in this.props.dayInfo) {
          items.push(<td key={key}>
            {""+this.props.dayInfo[key]}
          </td>);
        }
        items.splice(3,0,<td key="hours">placeholder</td>);
        return (
            <tr>
              {items}
            </tr>
        )
    }
}
