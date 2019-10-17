import React, { Component } from 'react'
import { Navbar } from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {afterlogin} from "../../actions";
import {updateUser} from "../../actions";
import Cookies from 'js-cookie';
import "./Profile.css";
import {graphql,compose} from 'react-apollo';
import {getUserQuery} from '../../queries/queries';

export class Profile extends Component {
  constructor(){
    super();
    this.state={
      id:Cookies.get('id'),
      name:"unknown",
      email:"unknown",
      city:"unknown",
      phonenumber:"unknown",            
      about:"unknown",
      hometown:"unknown",
      country:"unknown",
      company:"unknown",
      school:"unknown",
      gender:"unknown",            
      profile : []
  }
  }
  loadHandler = (e) => {
    console.log("entered profile edit CDM and graphql props are ",this.props);  
    this.setState({
      name:this.props.getUserQuery.user[0].name,
      email:this.props.getUserQuery.user[0].email,
      city:this.props.getUserQuery.user[0].city,
      phonenumber:this.props.getUserQuery.user[0].phonenumber,
      about:this.props.getUserQuery.user[0].aboutme,
      country:this.props.getUserQuery.user[0].country,
      company:this.props.getUserQuery.user[0].company,
      school:this.props.getUserQuery.user[0].school,
      gender:this.props.getUserQuery.user[0].gender,
      hometown:this.props.getUserQuery.user[0].hometown

    })
}
  componentDidMount(){
    console.log("entered profile zzzzzzzzzCDM",this.props);
     axios.get('http://localhost:3001/profile')
     .then((response) => {
       console.log("response from server",response.data.data);
      //  this.props.afterlogin(response.data);
       console.log('email id retreived from redux' , this.props.userdata)
      //  this.setState({      
      //   profile : response.data.profile[0]    
      //   });
       // console.log("result of profile im frontend is  " , this.state.profile.userid);
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
                    <td>: {this.state.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>: {this.state.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>: {this.state.email}</td>
                  </tr>
                </tbody>
              </table><br/>
              <h4>Personal Info</h4>
              <table>
                <tbody>
                  <tr>
                    <td>Contact</td>
                    <td>: {this.state.phonenumber}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>: {this.state.city}</td>
                  </tr>
                  <tr>
                    <td>About Me</td>
                    <td>: {this.state.about}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>: {this.state.country}</td>
                  </tr>
                  <tr>
                    <td>Company</td>
                    <td>: {this.state.company}</td>
                  </tr>
                  <tr>
                    <td>School</td>
                    <td>: {this.state.school}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>: {this.state.gender}</td>
                  </tr>
                  <tr>
                    <td>Hometown</td>
                    <td>: {this.state.hometown}</td>
                  </tr>
                  <tr>
                  <td></td>
                            <td><input type="button" value="Load" className="btn btn-secondary" onClick={this.loadHandler.bind(this)}/></td>
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

function mapStateToProps(data) {
  console.log("lINE 113" , data)
  const userdata = data.userreducer;
      return {userdata};
  }
  
  function mapDispatchToProps(dispatch) {
      return {
          // updateUser : (data) => dispatch(updateUser(data)),
          // afterlogin : (data) => dispatch(afterlogin(data))
      };
  }
  
  export default compose(
    graphql(getUserQuery,{name:"getUserQuery"})
    )(Profile)


// export default Profile