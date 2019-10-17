import React, { Component } from 'react';
import { Navbar } from '../Navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {updateUser} from "../../actions";
import './Profile.css';
import {graphql,compose} from 'react-apollo';
import {updateUserMutation} from '../../queries/queries';
import {getUserQuery} from '../../queries/queries';


export class EditProfile extends Component {
    constructor(props){
        super(props);
       
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
        this.idHandler = this.idHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
       // this.passwordHandler = this.passwordHandler.bind(this);
        this.cnoHandler = this.cnoHandler.bind(this);
        this.cityHandler = this.cityHandler.bind(this);
        this.hometownHandler = this.hometownHandler.bind(this);
        this.countryHandler = this.countryHandler.bind(this);
        this.companyHandler = this.companyHandler.bind(this);
        this.schoolHandler = this.schoolHandler.bind(this);
        this.genderHandler = this.genderHandler.bind(this);
        this.aboutHandler = this.aboutHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount(){
        console.log("entered profile edit CDM and graphql props are ",this.props.getUserQuery);
        console.log("entered profile edit CDM and graphql props are ",this.props.getUserQuery);

        //  axios.get('http://localhost:3001/profile')
        //  .then((response) => {
        //    console.log(response.data);
        //    console.log('email id retreived from redux' , this.props.userdata.email)
        //    this.setState({      
        //     profile : response.data.profile[0]    
        //     });
        //     console.log("result of profile im frontend is  " +this.state.profile.userid);
            // this.setState({
            //     id : this.props.userdata.id,
            //     name : this.props.userdata.name,
            //     email : this.props.userdata.email,
            //     cno : this.props.userdata.phonenumber,
            //     city : this.props.userdata.city,
            //     hometown : this.props.userdata.hometown,
            //     country : this.props.userdata.country,
            //     company : this.props.userdata.company,
            //     school : this.props.userdata.school,
            //     gender : this.props.userdata.gender,
            //     about : this.props.userdata.aboutme,
            //     language : this.props.userdata.language,
            //     role : this.props.userdata.role            
            // })
    //    });

      }
    idHandler = (e) => {
        this.setState({
            id:e.target.value
        });
    }
    nameHandler = (e) => {
        console.log("entered profile edit CDM and graphql props are ",this.props);
;
        this.setState({
            name:e.target.value
        });
    }
    emailHandler = (e) => {
        this.setState({
            email:e.target.value
        });
    }
    cnoHandler = (e) => {
        this.setState({
            phonenumber:e.target.value
        });
    }
    cityHandler = (e) => {
        this.setState({
            city:e.target.value
        });
    }
    hometownHandler = (e) => {
        this.setState({
            hometown:e.target.value
        });
    }
    countryHandler = (e) => {
        this.setState({
            country:e.target.value
        });
    }
    schoolHandler = (e) => {
        this.setState({
            school:e.target.value
        });
    }
    companyHandler = (e) => {
        this.setState({
            company:e.target.value
        });
    }
    genderHandler = (e) => {
        this.setState({
            gender:e.target.value
        });
    }
    loadHandler = (e) => {
        console.log("entered profile edit CDM and graphql props are ",this.props.getUserQuery);  
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
    aboutHandler = (e) => {
        this.setState({
            about:e.target.value
        });
    }

    submitHandler = (e) =>{
        e.preventDefault();

        console.log("entered profile edit CDM and graphql props are ",this.props);
        this.props.updateUserMutation({
            variables: {
                userid: this.state.id,
                name: this.state.name,
                email: this.state.email,
                hometown: this.state.hometown,            
                city: this.state.city,
                country: this.state.country,
                school: this.state.school,
                company: this.state.company,
                gender: this.state.gender,
                cno: this.state.cno,
                about: this.state.about,   
            }
        });
        // var data = this.props.updateUserMutation;
        console.log("data for edit profile",this.props)
        if ("success" === "success") {
        alert("User edited profile successfully");
                    // this.props.updateUser(data); 
        this.props.history.push("/profile");
                }
                else {
                    this.props.history.push("/login");
                    alert("Please try again");
                }
        // const data = {
        //     id: this.state.id,
        //     name: this.state.name,
        //     email: this.state.email,
        //     password: this.state.password,
        //     hometown: this.state.hometown,            
        //     city: this.state.city,
        //     country: this.state.country,
        //     school: this.state.school,
        //     company: this.state.company,
        //     gender: this.state.gender,
        //     cno: this.state.cno,
        //     about: this.state.about,
        //     language: this.state.language,
        //     role: this.state.role
        // }
        // console.log('Data sent to server profile edit' ,data)       
        //  axios.post("http://localhost:3001/profile/edit", data)
        //     .then(response => {
        //         console.log("entered edit profile frontebnd",response.data);
        //         if ("success" === "success") {
        //             alert("User edited profile successfully");
        //             // this.props.updateUser(data); 
        //             this.props.history.push("/profile");
        //         }
        //         else {
        //             this.props.history.push("/login");
        //             alert("Please try again");
        //         }
        //     });
    }

  render() {
    return (
      <div>
        <div><Navbar/></div>
        <div className=" container profile">
        <h1 >My Profile</h1>
                <form onSubmit={this.submitHandler}>
                <div className="row">
                <div className="col-3">
                <img src="https://cdn3.iconfinder.com/data/icons/fillies-small/64/id-card-512.png" alt="profilepic" className="profilepic" /><br/><br/>
                <input type="file" name="fileToUpload" id="fileToUpload" /><hr/>
                </div>
                <div className="col-9">
                    <table>
                        <tbody>
                            
                        <tr>
                            <td>SJSU ID</td>
                            <td>: <input type="text" placeholder="id" value={this.state.id} pattern="\d+" title="Enter a valid ID" onChange={this.idHandler} readOnly/></td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>: <input type="text" name="name" placeholder={this.state.name}  onChange={this.nameHandler}  /></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>: <input type="email" name="email" placeholder={this.state.email}  onChange={this.emailHandler}  /></td>
                        </tr>

                        <tr>
                            <td>Contact</td>
                            <td>: <input type="text" name="cno" placeholder={this.state.phonenumber}   onChange={this.cnoHandler}  title="Enter a valid contact number" /></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>: <input type="text" name="city" placeholder={this.state.city}   onChange={this.cityHandler} /></td>
                        </tr>
                        <tr>
                            <td>Hometown</td>
                            <td>: <input type="text" name="hometown" placeholder={this.state.hometown}   onChange={this.hometownHandler} /></td>
                        </tr>
                        <tr>
                            <td>Country</td>
                            <td>: <input type="text" name="country" placeholder={this.state.country}  onChange={this.countryHandler}  /></td>
                        </tr>
                        <tr>
                            <td>Company</td>
                            <td>: <input type="text" name="company" placeholder={this.state.company}  onChange={this.companyHandler}  /></td>
                        </tr>
                        <tr>
                            <td>School</td>
                            <td>: <input type="text" name="school" placeholder={this.state.school} onChange={this.schoolHandler}  /></td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>: <label>
                            <input type="radio" name="gender" value="male" onChange={this.genderHandler} checked={this.state.gender ==="male"} />
                            Male&nbsp;</label>
                            <label>
                            <input type="radio" name="gender" value="female" onChange={this.genderHandler} checked={this.state.gender==="female"} />
                            Female&nbsp;</label>
                            <label>
                            <input type="radio" name="gender" value="other" onChange={this.genderHandler} checked={this.state.gender==="other"} />
                            Other&nbsp;</label>
                            </td>
                        </tr>
                        <tr>
                            <td>About</td>
                            <td><textarea name="about" placeholder={this.state.about} rows="4" cols="40" onChange={this.aboutHandler} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" value="Update" className="btn btn-primary" /></td>
                        
                            <td></td>
                            <td><input type="button" value="Load" className="btn btn-secondary" onClick={this.loadHandler.bind(this)}/></td>
                        </tr>    
                        </tbody>
                    </table>
                </div>
                </div>
            </form>
        </div>
      </div>
    )
  }
}

// function mapStateToProps(data) {
//     console.log("lINE 246" , data)
//     const userdata = data.userreducer;
//         return {userdata};
//     }
    
//     function mapDispatchToProps(dispatch) {
//         return {
//              updateUser : (data) => dispatch(updateUser(data)),
//             // afterlogin : (data) => dispatch(afterlogin(data))
//         };
//     }
    export default compose(
        graphql(updateUserMutation,{name:"updateUserMutation"}),
        graphql(getUserQuery,{name:"getUserQuery"})
        )(EditProfile)
    // export default (connect(mapStateToProps, mapDispatchToProps)(EditProfile),graphql(updateUserMutation)(EditProfile));
    
// export default EditProfile
