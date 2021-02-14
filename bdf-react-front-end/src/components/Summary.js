import React, { Component } from 'react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';
import { MDBTooltip, MDBBadge, MDBContainer,MDBBtn,MDBIcon } from "mdbreact";
import { setIndex, setData } from '../actions/action';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'


class Summary extends Component {

  state={
    users:[],
    isLoaded:false,
    index : 5,
  }

  OnClick = (num) =>{
    if(this.state.index < 6 && num < 0 ){
      num = 0;
    }
    
    this.setState({
      index: this.state.index + num,
    })
  }

  handleSetIndex = (index) =>{
    this.props.setIndex(index);
  }

  componentDidMount(){
    const name = {"name" : "tiger"}
    const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
    axios.post('http://localhost:8081/time/getTimeSheet',name)
    .then(function (response) {
      _this.setState({
        users:response.data,
        isLoaded:true
      });
      this.props.setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
      _this.setState({
        isLoaded:false,
        error:error
      })
    })
  }

  render() {
    return (
      <div>
         <MDBTable hover>
      <MDBTableHead>
        <tr>
          <th>WeekEnding</th>
          <th>Total Hours</th>
          <th>Submission Status</th>
          <th>Approval Status</th>
          <th>Option</th>
          <th>Comment</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {
          this.state.users.map((item,index)=>{
              if(index < this.state.index){
                    return(
                    <tr key={index}>
                      <td>{item.weekEnding} </td>
                      <td>{item.totalHour} </td>
                      <td>{item.submissionStatus}  {item.submissionStatus == 	"Incomplete" ?
                      <MDBTooltip
                        domElement
                        tag="span"
                        material
                        placement="top"
                        >               
                       <span><MDBBadge color="danger" className="ml-2">!</MDBBadge></span>
                       <span>Items due: Proof of Approved TimeSheet</span>
                       </MDBTooltip>

                       : ""  } </td> 
                      <td>{item.approvalStatus} </td> 
                      <td > <MDBBtn gradient="peach" onClick={()=>this.handleSetIndex(index)}>{item.submissionStatus == "Incomplete"|| item.submissionStatus == "Not Start" ? "edit":"view"}</MDBBtn></td>
                      <td>comment</td>
                    </tr>                                  
                    )
                  }
            })
        }
        
      </MDBTableBody>
    </MDBTable>
    <center><MDBBtn color="primary" onClick={() => this.OnClick(-5)}>Show Less</MDBBtn>
    <MDBBtn color="primary" onClick={()=>this.OnClick(5)}>Show More {this.props.index}</MDBBtn></center>

      </div>
    )
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
      setData: (payload) => dispatch(setData(payload)),
      setIndex: (payload) => dispatch(setIndex(payload)),
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Summary);