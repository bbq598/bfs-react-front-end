import React, { Component } from 'react'
import TimeSheetDay from './TimeSheetDay'
import {connect} from 'react-redux'
import axios from 'axios';

import { setIndex, setData,getData } from '../actions/action';

// represents the inner content: B2,3,4,5
// TODO: expand functionalities
export class TimeSheetInner extends Component {
    // state = {};
    componentDidMount() {
        // this.props.getData();
        console.log("Inner mounting");
    }
    
    render() {
        if (!this.props.currentTimeSheet) {
          return <div></div>
        }
        const days = [];
        for (const [ind, day] of this.props.currentTimeSheet.days.entries()) {
            days.push(<TimeSheetDay
                        dayInfo = {day}
                        dayOfWeek = {ind} key={ind}
                        approvalStatus = {this.props.currentTimeSheet.approvalStatus}
                        onChangeHandler= {(e)=>this.props.onChangeHandler(e)}
                        ></TimeSheetDay>);
        }
        return (
            <table className="table table-default">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Date</th>
                  <th>Starting Time</th>
                  <th>Ending Time</th>
                  <th>Total Hours</th>
                  <th>Floating Day</th>
                  <th>Holiday</th>
                  <th>Vacation</th>
                </tr>
              </thead>
              <tbody>{days}</tbody>
            </table>
        )
    }
}

const mapStateToProps = (state) =>{
  return{
      user : state.user,
      index : state.index,
      currentTimeSheet: state.currentTimeSheet
  }
};

const mapDispatchToProps = (dispatch) =>{
  return{
      setData: (payload) => dispatch(setData(payload)),
      setIndex: (payload) => dispatch(setIndex(payload)),
      getData : () => dispatch(getData()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheetInner);