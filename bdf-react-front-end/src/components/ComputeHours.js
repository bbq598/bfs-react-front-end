import { MDBCol, MDBRow } from 'mdbreact'
import React, { Component } from 'react'

export default class ComputeHours extends Component {
    render() {
      return (
        <MDBRow>
          <MDBCol>Total Billing Hours</MDBCol>
          <MDBCol size="3">
            <input type="number" id="totalBilling" name="totalBilling" value={this.props.billing} readOnly/>
          </MDBCol>
          <MDBCol>Total Compensated Hours</MDBCol>
          <MDBCol size="3">
            <input type="number" id="totalCompensated" name="totalCompensated" value={this.props.compensated} readOnly/>
          </MDBCol>
        </MDBRow>
      )
    }
}
