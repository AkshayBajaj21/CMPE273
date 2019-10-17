import React, { Component } from 'react'
import { Navbar } from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Cookies from 'js-cookie';
import Coursecard, { Cardtemplate } from '../CardTemplate/Cardtemplate';
import './Courses.css';
import axios from 'axios';

export class Courses extends Component {
  constructor(props){
    super(props);
    if (!Cookies.get('id')) {
      alert("Please login first.");
      this.props.history.push("/");
    }
    this.state = {
        id: Cookies.get('id'),
        role: Cookies.get('role'),
        courses:""
    }
}

  componentDidMount(){
   console.log("entered CDM");
    axios.get('http://localhost:3001/course')
    .then((response) => {
      this.setState({
        courses : response.data.courses})
    })
  }
  render() {
   // console.log("name of course is" +courses.coursename[0]);
    let cous = [];
    const isStudent = Cookies.get("role") === 'faculty';
    Object.assign(cous,this.state.courses)
   console.log("entered frontend course")
    console.log(this.state.courses)
    //let courses = [{"cid":"202","cname":"SSS"},{"cid":"202","cname":"SSS"},{"cid":"202","cname":"SSS"}]

    let images = "https://www.sanjac.edu/sites/default/files/blue-color.jpg";
    return (
      <div>
        <div><Navbar/></div>
        <div className="container courses">
            <h1>Courses</h1>
            <div className="studcourses">
            <div className="row mycourses"> 
              {cous.map((course,index)=>{
                return <Cardtemplate key = {index} id = {course.courseid} name = {course.coursename} term = {course.courseterm}    />
          })}
          </div>
              <hr/>
              {isStudent
              ?<Link to="course/new"><button className="btn btn-primary">Add Course</button></Link>:
              <Link to="course/search"><button className="btn btn-primary">Search Course</button></Link>}
            </div>
        </div>
      </div>
    )
  }
}

export default Courses
