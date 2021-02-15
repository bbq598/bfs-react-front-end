import { MDBCol, MDBRow } from 'mdbreact';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setIndex, setTimeSheet } from '../actions/action'

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
            <select onChange={(e)=>this.selectWeek(e)} value={this.props.index[0]}>
              {items}
            </select>
          </MDBCol>
        </MDBRow>
      )
    }

    selectWeek = (e) => {
      e.preventDefault();
      if (window.confirm("Unsaved changes will be discarded!")) {
        this.props.setIndex(e.target.value);
        this.props.setTimeSheet(this.props.user[e.target.value]);
      }
      // change index in store
    }
}

const mapStateToProps = (state) =>{
  return{
      user : state.user,
      index : state.index,
  }
};

const mapDispatchToProps = (dispatch) =>{
  return{
      setIndex: (payload) => dispatch(setIndex(payload)),
      setTimeSheet: (payload) => dispatch(setTimeSheet(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WeekSelect);