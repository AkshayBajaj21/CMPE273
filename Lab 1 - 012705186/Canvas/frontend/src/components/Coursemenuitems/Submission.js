import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Coursemenu from '../Coursemenu/Coursemenu';
export class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cid: this.props.match.params.id,
        assignment: [],
        files: [],
        toupload: ""
    }
    this.touploadHandler = this.touploadHandler.bind(this);
}

componentDidMount(){
  //  console.log("entered announcement edit CDM " + this.props.match.params.id);
      axios.get(`http://localhost:3001/course/${this.state.cid}/assignment`)
      .then((response) => {
         console.log("peoples returned in frontend : " + response.data.assignment);
         this.setState({      
            assignment : response.data.assignment
          });
         console.log("result of profile im frontend is  " +this.state.assignment.assignment);
     });

   }

touploadHandler = (e) => {

}

render() {
    let files = ['Assignment 1', 'Assignment 2', 'Assignment 3'];
    let assignment = [];
    Object.assign(assignment,this.state.assignment)
    return (
        <div>
            <div><Navbar /></div>
            <div className="container">
                <h1>CMPE {this.state.cid} ENTERPRISE DISTRIBUTED SYSTEMS</h1>
                <div className="row">
                    <div className="col-3"><Coursemenu cid = {this.state.cid}/></div>
                    <div className="col-9">
                        {assignment.map((assignment, index) => {
                            return <div key={index}><h5>{assignment.assignment}<hr /></h5></div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
}
export default Submission
