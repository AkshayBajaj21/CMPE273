import React, { Component } from 'react'
import { Navbar } from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Profile.css";

export class Profile extends Component {
  constructor(){
    super();
    this.state =
    {
      profile : []
    }
  }
  componentDidMount(){
    console.log("entered profile CDM");
     axios.get('http://localhost:3001/profile')
     .then((response) => {
       console.log(response.data);
       this.setState({      
        profile : response.data.profile[0]    
        });
        console.log("result of profile im frontend is  " +this.state.profile.userid);
   });
  }
  render() {
    return (

      <div>
        <div><Navbar/></div>
        <div className="container profile">
          <h1 >My Profile</h1>
          <div className="row">
            <div className="col-3">
              <img src="https://cdn3.iconfinder.com/data/icons/fillies-small/64/id-card-512.png" alt="profilepic" className="profilepic" />
              <hr/>
            </div>
            <div className="col-7">
              <h4>Account Info</h4>
              <table>
                <tbody>
                  <tr>
                    <td>SJSU ID</td>
                    <td>: {this.state.profile.userid}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>: {this.state.profile.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>: {this.state.profile.email}</td>
                  </tr>
                </tbody>
              </table><br/>
              <h4>Personal Info</h4>
              <table>
                <tbody>
                  <tr>
                    <td>Contact Number</td>
                    <td>: {this.state.profile.phonenumber}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>: {this.state.profile.city}</td>
                  </tr>
                  <tr>
                    <td>About Me</td>
                    <td>: {this.state.profile.aboutme}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>: {this.state.profile.country}</td>
                  </tr>
                  <tr>
                    <td>Company</td>
                    <td>: {this.state.profile.company}</td>
                  </tr>
                  <tr>
                    <td>School</td>
                    <td>: {this.state.profile.school}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>: {this.state.profile.gender}</td>
                  </tr>
                  <tr>
                    <td>Hometown</td>
                    <td>: {this.state.profile.hometown}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div><div className="col-2">
              <Link to="/profile/edit"><button className="btn btn-primary">Edit Profile</button></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile