import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Coursemenu from '../Coursemenu/Coursemenu';

export class Quizinfo extends Component {
    constructor(props){
        super(props);
        if (!Cookies.get('id')) {
            alert("Please login first.");
            this.props.history.push("/login");
          }
        this.state = {
            cid: this.props.match.params.id,
            quiz: []
        } 
        this.submithandler = this.submithandler.bind(this);
    }

componentDidMount(){
       console.log("entered quiz edit CDM " + this.props.match.params.id);
         axios.get(`http://localhost:3001/course/${this.state.cid}/quiz`)
         .then((response) => {
            console.log("quiz returned in frontend : " + response.data.quiz);
            this.setState({      
                quiz : response.data.quiz,
                display : response.data.quiz[0]
             });
            console.log("result of quiz im frontend is  " +this.state.quiz.quizid);
        });

      }
      
      submithandler = (e)=>{
        e.preventDefault();
         alert("Thanks for submitting your answers!! and your score is 2/2");  
         this.props.history.push(`/course/${this.state.cid}/info`);
        }
  render() {
      let quiz = [];
      Object.assign(quiz,this.state.quiz); 
      let display = [];
      Object.assign(display,this.state.display);     
    return (
      <div>
            <div><Navbar /></div>
            <div className="container">
                <h1>CMPE {this.state.cid} ENTERPRISE DISTRIBUTED SYSTEMS</h1>
                <div className="row">
                    <div className="col-3"><Coursemenu cid = {this.state.cid}/></div>
                    <div className="col-9">
                        <h5> {display.quizname}</h5><br/>
                        {quiz.map((q,index)=>{
                            return <div>
                                
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><b>Question{index+1}&nbsp;&nbsp;&nbsp;&nbsp;{q.q1}</b></td>
                                        </tr>
                                        <tr>
                                            <td><label><input type="radio" name="ans1" value="a"required/></label>&nbsp;{q.q2}</td>
                                         </tr>
                                        <tr> 
                                             <td><label><input type="radio" name="ans2" value="b"required/></label>&nbsp;{q.q3}</td>
                                        </tr> 
                                    </tbody>
                                </table>
                             
                            </div>
                        })}
                        <form onSubmit={this.submithandler}>
                        <br/><br/>
                        {(Cookies.get('role')==='student')?<tr><td><button type="submit" name="submit" className="btn btn-primary" >Submit</button></td></tr>:null}
                      </form>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}

export default Quizinfo
