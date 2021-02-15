import { MDBCol, MDBRow } from 'mdbreact';
import React, { Component } from 'react'
import { connect } from 'react-redux'

// represents the week select part: section B1
export class WeekSelect extends Component {
    render() {
      if (!this.props.user) {
        return "";
      }
      const items = this.props.user.map((timesheet, idx) => {
        return <option key={timesheet.id}
          value={idx}>
          {timesheet.weekEnding}
        </option>
      });
      return (
        <MDBRow>
          <MDBCol>
            Week Ending
          </MDBCol>
          <MDBCol>
            <select onChange={(e)=>this.selectWeek(e)}>
              {items}
            </select>
          </MDBCol>
        </MDBRow>
      )
    }

    selectWeek = (e) => {
      e.preventDefault();
      console.log(e.target.value)
      // change index in store
    }
}

const mapStateToProps = (state) =>{
  return{
      user : state.user,
      index : state.index
  }
};

const mapDispatchToProps = (dispatch) =>{
  return{
      setTimesheet: (payload) => dispatch(console.log(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WeekSelect);