import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Cookies from 'js-cookie';
//import './';

export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:"",
            password:""
        }
        this.idChangeHandler = this.idChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    idChangeHandler = (e) => {
        this.setState({
            id : e.target.value
        });
    }
    
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    componentDidMount(){
        if(Cookies.get('id')){
            this.props.history.push("/course"); 
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        const data = {
            id: this.state.id,
            password: this.state.password
            
        }
        
        console.log("Data in frontend send to server is" +data.id);
        axios.post("http://localhost:3001/login", data)
            .then(response => {
                if(response.data.message==="success"){
                    Cookies.set('id',response.data.id);
                    Cookies.set('role',response.data.role);
                    this.props.history.push("/course");
                }
                else if(response.data.message==="nouser"){
                    alert("No such user found.");
                    this.props.history.push("/");
                }
                else{
                    alert("Incorrect username or passowrd.");
                    this.props.history.push("/");
                }
            });
    }

    render() {
        return (
        <div className="login">
            <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7" alt="Logo" className="loginlogo" /><br/>
            <form onSubmit={this.submitHandler}>
                <input type="text" name="id" placeholder="SJSU ID" onChange={this.idChangeHandler} pattern="\d+" title="Enter a valid ID" required/><br/>
                <input type="password" name="password" placeholder="Password" onChange={this.passwordChangeHandler} required/><br/>
                <input type="submit" className="btn btn-primary" value="Sign In"/><br/><br/>
                Not a Member?  <Link to="/signup">Signup</Link>
            </form>
        </div>
        )
  }
}

export default Login
