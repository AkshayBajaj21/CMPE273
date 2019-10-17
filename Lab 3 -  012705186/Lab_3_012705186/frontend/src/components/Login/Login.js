import React, { PropTypes,Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Cookies from 'js-cookie';
import {connect} from 'react-redux';
import {afterlogin} from "../../actions";
import {updateUser} from "../../actions";
// import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import {getUserQuery} from '../../queries/queries';


export class Login extends Component {
    checkUser(){
        var data = this.props.data;
        if(data.loading){
            return(<div>Checking User Details.........</div>)
        }
        // else{
        //     return data.user
        // }
    }
    constructor(props){
        super(props);
        this.state = {
            id:"",
            password:"",
            count : 0
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
        this.props.getUserQuery({
            variables: {
                userid: this.state.id,
                password: this.state.password,    
            }
        });

        var data = this.props.data;
        console.log("props for login handler graphql ",this.props)
        if(data.user[0])
        {   Cookies.set('id',data.user[0].userid);
            Cookies.set('role',data.user[0].role); 
            this.props.history.push("/course");

        }
        else{
            alert("Incorrect username or passowrd.");
            this.props.history.push("/");
        }
        
        
        // console.log("Data in frontend send from login to server is" +data.id);
        // axios.post("http://localhost:3001/login", data)
        //     .then(response => {
        //         console.log("Data in frontend after kafka",response.data.data )
        //         if(response.data.data.message==="success"){
        //             console.log("token received is ",response.data.data)

        //             console.log("props sent to action are "+ response.data.data.id)
        //             console.log("props sent to action are "+ response.data.data.name)
        //             console.log("props sent to action are "+ response.data.data.email)
        //             console.log("props sent to action are "+ response.data.data.phonenumber)
        //             console.log("props sent to action are "+ response.data.data.city)
        //             console.log("props sent to action are "+ response.data.data.aboutme)
        //             console.log("props sent to action are "+ response.data.data.country)
        //             console.log("props sent to action are "+ response.data.data.company)
        //             console.log("props sent to action are "+ response.data.data.school)
        //             console.log("props sent to action are "+ response.data.data.gender)
        //             console.log("props sent to action are "+ response.data.data.hometown)

        //             this.props.afterlogin(response.data.data);
        //             this.props.history.push("/course");
        //         }
        //         else{
        //             alert("Incorrect username or passowrd.");
        //             this.props.history.push("/");
        //         }
        //     });
    }

    render() {
        console.log("props for login graphql ",this.props)
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
function mapDispatchToProps(dispatch) {
   console.log("mapDispatchToProps of login page")
    return {
        
        afterlogin : (data) => dispatch(afterlogin(data))
    };
}
export default (connect(null, mapDispatchToProps)(Login),graphql(getUserQuery)(Login));
// export default graphql(getUserQuery)(Login);
