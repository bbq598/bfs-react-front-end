import React, { Component } from 'react'

export default class TimeSheetDay extends Component {
    state = {};
    render() {
        const items = [];
        var arr = Object.values(this.props.dayInfo);
        for (const [ind,val] of arr.entries()) {
          items.push(<td key={ind}>
            {""+val}
          </td>);
        }
        return (
            <tr>
              {items}
            </tr>
        )
    }
}
