import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Coursemenu from '../Coursemenu/Coursemenu';

export class Announcement extends Component {
    constructor(props) {
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/login");
          }
        this.state = {
            cid: this.props.match.params.id,
            announcement: [],
            title : "",
            conetent : ""

        }
        this.titleHandler = this.titleHandler.bind(this);
        this.contentHandler = this.contentHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    componentDidMount(){
       console.log("entered announcement edit CDM " + this.props.match.params.id);
         axios.get(`http://localhost:3001/course/${this.state.cid}/announcement`)
         .then((response) => {
            console.log("peoples returned in frontend : " + response.data.announcement);
            this.setState({      
                announcement : response.data.announcement
             });
            console.log("result of profile im frontend is  " +this.state.announcement.content);
        });

      }
    titleHandler = (e) => {
        this.setState({
            title: e.target.value
        });
    }
    contentHandler = (e) => {
        this.setState({
            content: e.target.value
        });
    }

    submitHandler = (e) =>{
        e.preventDefault();
        const data = {title: this.state.title,
                      content: this.state.content};
        console.log(data);              
        axios.post(`http://localhost:3001/course/${this.state.cid}/announcement`,data)
        .then((response)=>{
          if(response.data.message==="success"){
            alert("Action completed.");
            this.props.history.index = 0;
            window.location.reload();
          }
        });
      }

    render() {
        const isFaculty = Cookies.get("role") === "student";
        return (
            <div>
                <div><Navbar /></div>
                <div className="container">
                    <h1>CMPE {this.state.cid} ENTERPRISE DISTRIBUTED SYSTEMS</h1>
                    <div className="row">
                        <div className="col-3"><Coursemenu cid= {this.state.cid}/></div>
                        <div className="col-9">
                            {this.state.announcement.map((announcement, index) => {
                                return <div key={index}>
                                    <h5>{announcement.title}</h5><p>{announcement.content}</p>
                                </div>
                            })}
                            <hr/>
                            
                            {(isFaculty)?  <h5>Make new announcement</h5>:null}
                            {(isFaculty)?
                            <form onSubmit={this.submitHandler}>
                                <input type="text" placeholder="title" onChange={this.titleHandler} required></input><br/>
                                <textarea rows="5" cols="50" placeholder="announcement" onChange={this.contentHandler} required></textarea><br/>
                                <input type="submit" value="Submit" className="btn btn-primary"></input>
                            </form> :null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Announcement
