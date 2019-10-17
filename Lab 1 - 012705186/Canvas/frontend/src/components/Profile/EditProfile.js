import React, { Component } from 'react';
import { Navbar } from '../Navbar/Navbar';
import axios from 'axios';
import './Profile.css';

export class EditProfile extends Component {
    constructor(props){
        super(props);
       
        this.state={
            id:"",
            name:"",
            email:"",
            password:"",
            cno:"",
            city:"",
            hometown:"",
            country:"",
            company:"",
            school:"",
            gender:"",
            about:"",
            profile : []
        }
        this.idHandler = this.idHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
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
        console.log("entered profile edit CDM");
         axios.get('http://localhost:3001/profile')
         .then((response) => {
           console.log(response.data);
           this.setState({      
            profile : response.data.profile[0]    
            });
            console.log("result of profile im frontend is  " +this.state.profile.userid);
            this.setState({
                id : this.state.profile.userid,
                name : this.state.profile.name,
                email : this.state.profile.email,
                password : this.state.profile.password,
                cno : this.state.profile.phonenumber,
                city : this.state.profile.city,
                homewtown : this.state.profile.hometown,
                country : this.state.profile.country,
                company : this.state.profile.company,
                school : this.state.profile.school,
                gender : this.state.profile.gender,
                about : this.state.profile.about,
                hometown : this.state.profile.hometown

                
            })
       });

      }
    idHandler = (e) => {
        this.setState({
            id:e.target.value
        });
    }
    nameHandler = (e) => {
        this.setState({
            name:e.target.value
        });
    }
    emailHandler = (e) => {
        this.setState({
            email:e.target.value
        });
    }
    passwordHandler = (e) => {
        this.setState({
            password:e.target.value
        });
    }
    cnoHandler = (e) => {
        this.setState({
            cno:e.target.value
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
    aboutHandler = (e) => {
        this.setState({
            about:e.target.value
        });
    }

    submitHandler = (e) =>{
        e.preventDefault();
        console.log("entered submit handler of edir profile frontend");
        const data = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            cno: this.state.cno,
            city: this.state.city,
            country: this.state.country,
            school: this.state.school,
            company: this.state.company,
            gender: this.state.gender,
            about: this.state.about
        }
        console.log(data)       
         axios.post("http://localhost:3001/profile/edit", data)
            .then(response => {
                console.log("entered edit profile frontebnd");
                if (response.data.message === "success") {
                    this.props.history.push("/profile");
                    alert("User edited profile successfully");
                }
                else {
                    this.props.history.push("/login");
                    alert("Please try again");
                }
            });
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
                            <td>: <input type="text" placeholder="id" value={this.state.profile.userid} pattern="\d+" title="Enter a valid ID" onChange={this.idHandler} readonly/></td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>: <input type="text" name="name" placeholder={this.state.profile.name}  onChange={this.nameHandler}  /></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>: <input type="email" name="email" placeholder={this.state.profile.email}  onChange={this.emailHandler}  /></td>
                        </tr>

                        <tr>
                            <td>Contact number</td>
                            <td>: <input type="text" name="cno" placeholder={this.state.profile.phonenumber}   onChange={this.cnoHandler} pattern="\d{10}" title="Enter a valid contact number" /></td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>: <input type="text" name="city" placeholder={this.state.profile.city}   onChange={this.cityHandler} /></td>
                        </tr>
                        {/* <tr>
                            <td>Hometown</td>
                            <td>: <input type="text" name="hometown" placeholder={this.state.profile.hometown}   onChange={this.hometownHandler} />FZR</td>
                        </tr> */}
                        <tr>
                            <td>Country</td>
                            <td>: <input type="text" name="country" placeholder={this.state.profile.country}  onChange={this.countryHandler}  /></td>
                        </tr>
                        <tr>
                            <td>Company</td>
                            <td>: <input type="text" name="company" placeholder={this.state.profile.company}  onChange={this.companyHandler}  /></td>
                        </tr>
                        <tr>
                            <td>School</td>
                            <td>: <input type="text" name="school" placeholder={this.state.profile.school} onChange={this.schoolHandler}  /></td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>: <label>
                            <input type="radio" name="gender" value="male" onChange={this.genderHandler} checked={this.state.profile.gender ==="male"} />
                            Male&nbsp;</label>
                            <label>
                            <input type="radio" name="gender" value="female" onChange={this.genderHandler} checked={this.state.profile.gender==="female"} />
                            Female&nbsp;</label>
                            <label>
                            <input type="radio" name="gender" value="other" onChange={this.genderHandler} checked={this.state.profile.gender==="other"} />
                            Other&nbsp;</label>
                            </td>
                        </tr>
                        <tr>
                            <td>About</td>
                            <td><textarea name="about" placeholder={this.state.profile.about} rows="4" cols="40" onChange={this.aboutHandler} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit" value="Update" className="btn btn-primary" /></td>
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

export default EditProfile
