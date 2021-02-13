import React, { Component } from 'react'

export default class WeekSelect extends Component {
    render() {
      return (
        <div>
          Week Select
        </div>
      )
    }

    onChange = (e) => {
      e.preventDefault();
      // change timesheet fetched
    }
}
