import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Coursemenu from '../Coursemenu/Coursemenu';
import Cookies from 'js-cookie';
import Person from './Person';
import './People.css';

export class People extends Component {
  constructor(props) {
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/login");
    }
    this.state = {
      cid: this.props.match.params.id,
      people:""
    }
  }
    componentDidMount(){
      console.log("entered people CDM");
       axios.get(`http://localhost:3001/course/${this.state.cid}/people`)
       .then((response) => {
         console.log("peoples returned in frontend : " + response.data.people);
         this.setState({      
          people : response.data.people
          });
        //  console.log("result of profile im frontend is  " +this.state.people.studentname);
     });
    }
  render() {
    let people = [];
    Object.assign(people,this.state.people)
    return (
      <div>
          <div><Navbar/></div>
          <div className="container">
          <h1>CMPE {this.state.cid} ENTERPRISE DISTRIBUTED SYSTEMS</h1>
              <div className="row">
                <div className="col-3"><Coursemenu cid={this.state.cid}/></div>
                <div className="col-9">
                    {people.map((ppl,index)=>{
                      return <Person key={index} name={ppl.studentname} cid={this.state.cid} id = {ppl.studentid}/>
            //          return <div key={index}>{ppl.studentname}<button className="removestudent">Remove Student</button><hr /> </div>
                    })}
                </div>
              </div>
          </div>
      </div>
    )
  }
}

export default People
