import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import Coursemenu from '../Coursemenu/Coursemenu';

export class Files extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            toupload: ""
        }
        this.touploadHandler = this.touploadHandler.bind(this);
    }

    touploadHandler = (e) =>{

    }

  render() {
      let files = ['Lecture 1','Lecture 2','Lecture 3'];
    return (
      <div>
            <div><Navbar /></div>
            <div className="container">
                <h1>CMPE 273 ENTERPRISE DISTRIBUTED SYSTEMS</h1>
                <div className="row">
                    <div className="col-3"><Coursemenu /></div>
                    <div className="col-9">
                        {files.map((file, index) => {
                            return <a href="" key={index} ><h5>{file}<hr /></h5></a>
                        })}
                        <form>
                            <h3>Add lecture note:   </h3><input type="file" name="lecturenote" onChange={this.touploadHandler} />
                            <input type="submit" value="Upload" />
                        </form>
                    </div>
                </div>
            </div>
      </div>
    )
  }
}

export default Files
