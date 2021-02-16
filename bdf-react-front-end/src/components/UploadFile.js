import { MDBCol, MDBRow } from 'mdbreact'
import React, { Component } from 'react'

// represents section B8
export default class UploadFile extends Component {    
    render() {
      return (
        <MDBRow>
          <MDBCol size="6" middle>
            <select disabled>
              <option defaultValue>approved timesheet</option>
              <option>unapproved timesheet</option>
            </select>
          </MDBCol>
          <MDBCol size="6" middle>
            <input type="file" disabled/>
          </MDBCol>
        </MDBRow>
      )
    }
}
