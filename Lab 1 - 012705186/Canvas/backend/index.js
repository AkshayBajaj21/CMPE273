var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require("mysql");
var session = require('express-session');
var currentuser = {};
const bcrypt = require('bcrypt');
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';
module.exports = app.listen(3000);

app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(cors({origin:"http://localhost:3000"}));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,    
    activeDuration:  5 * 60 * 1000
}));


var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Cricket2012@",
    database:"sjsu_canvas"
});


con.connect((err) => {
    if(err) console.log(err.code);
    else console.log("Database connection successful.");
});
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'Cricket2012@',
    database : 'sjsu_canvas',
    port	 : 3306
});
// var sel = "select * from test;",users;
// con.query(sel,(err,result)=>{
//     if(err) throw err;
//     users = result
//     console.log();
// });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// function encrypt(){
// bcrypt.genSalt(saltRounds, (err, salt) => {
//     if(err) throw err;
//     // console.log(salt);
//     bcrypt.hash(myPlaintextPassword,salt, (err, hashed) => {
//         if(err) throw err;
//         console.log(hashed);    
//         mypass = hashed;
//        // check();
//     });
// });
// }

var currentUser = {};
var currentuser = {};

app.post("/login", (req,res) => {
    console.log(req.body);
    let returnObj = {};
    var id = req.body.id;
    var password = req.body.password;
    let encrypted = "";
    let query = "select password,role,name from users where userid='"+id+"'";
    pool.getConnection(function(err,con){
    new Promise((resolve,reject)=>{
       
        con.query(query, (err,result) => {
            if(!result[0]){
                returnObj.message = "nouser";
                res.json(returnObj);
            }        
            // console.log(result);
            encrypted = result[0].password;
            resolve([encrypted,result[0].role,result[0].name]);
        }); 
       
    })
    .then((value)=>{
        new Promise((resolve, reject) => {
            bcrypt.compare(password, value[0], (err, result) => {
                if (err) throw err;
                resolve([result,value[1],value[2]]);
            });
        })
        .then((value) => {
            if (value[0]) {
                returnObj.message = "success";
                currentuser.id = id;
                currentuser.role = value[1];
                currentuser.name = value[2];
                returnObj.id = id;
                returnObj.role = value[1];
                returnObj.name = value[2];
                currentUser.id = id;
                currentUser.role = value[1];
                currentUser.name = value[2];
                returnObj.id = id;
                returnObj.role = value[1];
                returnObj.name = value[2];
            }
            else {
                returnObj.message = "error";
            }
            res.json(returnObj);
        });
    });
    console.log("\nConnection closed..");
    //connection.release();
});
});

app.post("/course/new", (req,res) => {
    console.log("Data for new courses in server side is :" +req.body.cid);
    let returnObj = {}
    var cid = req.body.cid;
    var email = req.body.eamil;
    var facultyid = currentuser.id;
    var cname = req.body.cname;
    var cdept = req.body.cdept;
    var cdes = req.body.cdes;
    var croom = req.body.croom;
    var ccap = req.body.ccap;
    var waitcap = req.body.waitcap;
    var cterm = req.body.cterm;
   // let returnObj = {};
   // INSERT INTO course` (`courseid`, `facultyid`, `coursename`, `coursedept`, `coursedescription`, `courseroom`, `coursecapacity`, `waitlistcapacity`, `courseterm`) VALUES ('213', '121', 'cpme281', 'CE', 'test', '189', '21', '2', 's');

    var query = "insert into course (courseid, facultyid, coursename, coursedept,coursedescription,courseroom,coursecapacity,waitlistcapacity,courseterm) values ('"+cid+"','"+facultyid+"','"+cname+"','"+cdept+"','"+cdes+"','"+croom+"','"+ccap+"','"+waitcap+"','"+cterm+"') ;"
  //  var query = "SELECT userid, password FROM users WHERE userid = '"+id+"' AND password = '"+password+"'";
   console.log(query);
   pool.getConnection(function(err,con) {

    con.query(query, (err, result) => {
        try{
            if(result.affectedRows === 1){
                console.log("success at backend cousradd starts");
                returnObj.message = "success";               
                returnObj.data = "signedup successfully!";
                console.log("success at backend cousradd end");
            }}
            catch{
                console.log("error at backend add");
                returnObj.message = "error";               
                returnObj.data = "signedup unsuccessfully!";
            }
            res.json(returnObj);
        });
    console.log("\nConnection closed..");
        con.release();
    });
});

app.get("/course", (req,res) => {
    // console.log("etntered server course");
    // let returnObj = {}
    let returnObj = {};
    // console.log("User" + currentuser.id);
    var query = "SELECT courseid,coursename,facultyid,courseterm FROM course WHERE facultyid = "+currentuser.id;
    pool.getConnection(function(err,con) {

    con.query(query, (err, result) => {
            try {
                // console.log("entered try");
                var courses = [];
                for(let i=0;i<result.length;i++){
                    let info={};
                    info.courseid = result[i].courseid;
                    info.coursename = result[i].coursename;
                    info.facultyid = result[i].facultyid;
                    info.courseterm = result[i].courseterm;
                    courses.push(info);
                }
                console.log(courses);
                returnObj.courses = courses;
                returnObj.message = "success";               
                returnObj.data = "Login successfully!";
       
    } catch(err) {
        // console.log("entered catch");
        returnObj.message = "error";
        returnObj.data = "Login";
    }
    // console.log(returnObj.courses);
    res.json(returnObj);
    });
    // console.log("\nConnection closed..");
    con.release();
});
    
});

app.get("/profile", (req,res) => {
    let returnObj = {};
    var query = "SELECT * FROM users WHERE userid = "+currentuser.id;
    pool.getConnection(function(err,con) {

    con.query(query, (err, result) => {
            try {
               
                var profile = [];
               
                    let info={};
                    info.userid = result[0].userid;
                    info.email = result[0].email;
                    info.name = result[0].name
                    info.password = result[0].password;
                    info.role = result[0].role;
                    info.phonenumber = result[0].phonenumber;
                    info.aboutme = result[0].aboutme;
                    info.city = result[0].city;
                    info.country = result[0].country;
                    info.company = result[0].company;
                    info.school = result[0].school;
                    info.hometown = result[0].hometown;
                    info.language = result[0].language;
                    info.gender = result[0].gender;
                    profile.push(info);
                
           
                returnObj.profile = profile;
                returnObj.message = "success";               
                returnObj.data = "profile view successfully!";
       
    } catch(err) {
        // console.log("entered catch");
        returnObj.message = "error";
        returnObj.data = "Login";
    }
  //  console.log(returnObj.profile);
    res.json(returnObj);
    });
  //  console.log("\nConnection closed..");
        con.release();
    });
})

app.get("/course/:id/people", (req,res) => {
    console.log("entered server people");
    let returnObj = {};
    var query = "select studentname,studentid from studentcourse where courseid ='"+req.params.id+"'";
    pool.getConnection(function(err,con) {
    con.query(query, (err, result) => {
            try {
                console.log("entered people try");
                var people = [];                  
                for(let i=0;i<result.length;i++){
                    let info={};
                    info.studentname = result[i].studentname;
                    info.studentid = result[i].studentid;
                    people.push(info);
                }
               console.log(people);
                returnObj.people = people;
                returnObj.message = "success";               
                returnObj.data = "people view successfully!";
       
    } catch(err) {
        console.log("entered catch");
        returnObj.message = "error";
        returnObj.data = "Login";
    }
    console.log(returnObj.people);
    res.json(returnObj);
    });
    console.log("\nConnection closed..");
        con.release();
    });
})

app.post("/course/:id/people", (req,res) => {
    console.log("entered server people");
    let returnObj = {};
    var query = "delete from studentcourse where courseid='"+req.body.cid+"' and studentid='"+req.body.id+"'";
    console.log(query);
    pool.getConnection(function(err,con) {
    con.query(query, (err, result) => {
            try {console.log("entered remove student server try");
                if(result.affectedRows===1){
                    console.log("entered remove student server try success");
                    returnObj.message="success";
                }
                else
                { console.log("entered remove student server try fail");
                    returnObj.message = "error";
                }
               } 
    catch(err) {
        console.log("entered remove student server catch");
        returnObj.message = "error";
    }
  //  console.log(returnObj.people);
    res.json(returnObj);
    });
    console.log("\nConnection closed..");
        con.release();
    });
})
app.post("/course/:id/announcement", (req,res) => {
    console.log("Data for new courses in server side is :" +req.body.title);
    let returnObj = {}
    var cid = req.params.id;
    var title = req.body.title;
    var content = req.body.content;
  var query = "insert into announcement (title, content, courseid) values ('"+title+"','"+content+"','"+cid+"');"
  //  var query = "SELECT userid, password FROM users WHERE userid = '"+id+"' AND password = '"+password+"'";
   console.log(query);
   pool.getConnection(function(err,con) {

    con.query(query, (err, result) => {
        try{
            if(result.affectedRows === 1){
                console.log("success at backend announcement starts");
                returnObj.message = "success";               
                returnObj.data = "Added successfully!";
                console.log("success at backend announcement end");
            }}
            catch{
                console.log("error at backend add");
                returnObj.message = "error";               
                returnObj.data = "Added unsuccessfully!";
            }
            res.json(returnObj);
        });
    console.log("\nConnection closed..");
        con.release();
    });
});
app.get("/course/:id/announcement", (req,res) => {
    console.log("entered server announcement");
    let returnObj = {};
    var query = "select title,content from announcement where courseid ='"+req.params.id+"'";
    ;
    pool.getConnection(function(err,con) {
    con.query(query, (err, result) => {
            try {
                console.log("entered announcement try");
                var announcement = [];                  
                for(let i=0;i<result.length;i++){
                    let info={};
                    info.title = result[i].title;
                    info.content = result[i].content;
                    announcement.push(info);
                }
               console.log(announcement);
                returnObj.announcement = announcement;
                returnObj.message = "success";               
                returnObj.data = "people view successfully!";
       
    } catch(err) {
        console.log("entered announcement catch");
        returnObj.message = "error";
        returnObj.data = "Login";
    }
    console.log(returnObj.announcement);
    res.json(returnObj);
    });
    console.log("\nConnection closed..");
        con.release();
    });
})

app.get("/course/:id/quiz", (req,res) => {
    console.log("entered server quiz");
    let returnObj = {};
    var query = "select quizid,quizname,q1,q2,q3 from Quiz where courseid ='"+req.params.id+"'";
    ;
    pool.getConnection(function(err,con) {
    con.query(query, (err, result) => {
            try {
                console.log("entered quiz try");
                var quiz = [];                  
                for(let i=0;i<result.length;i++){
                    let info={};
                    info.quizid = result[i].quizid;
                    info.quizname = result[i].quizname;
                    info.q1 = result[i].q1;
                    info.q2 = result[i].q2;
                    info.q3 = result[i].q3;
                    quiz.push(info);
                }
               console.log(quiz);
                returnObj.quiz = quiz;
                returnObj.message = "success";               
                returnObj.data = "people view successfully!";
       
    } catch(err) {
        console.log("entered quiz catch");
        returnObj.message = "error";
        returnObj.data = "Login";
    }
    console.log(returnObj.quiz);
    res.json(returnObj);
    });
    console.log("\nConnection closed..");
        con.release();
    });
})

app.get("/course/:id/assignment", (req,res) => {
    console.log("entered server assignment");
    let returnObj = {};
    var query = "select cid,assignment from assignment where cid ='"+req.params.id+"'";
    ;
    pool.getConnection(function(err,con) {
    con.query(query, (err, result) => {
            try {
                console.log("entered assignment try");
                var assignment = [];                  
                for(let i=0;i<result.length;i++){
                    let info={};
                    info.assignment = result[i].assignment;
                    info.cid = result[i].cid;
                    assignment.push(info);
                }
               console.log(assignment);
                returnObj.assignment = assignment;
                returnObj.message = "success";               
                returnObj.data = "assignment view successfully!";
       
    } catch(err) {
        console.log("entered assignment catch");
        returnObj.message = "error";
        returnObj.data = "Login";
    }
    console.log("Json data sent to client"+returnObj);
    res.json(returnObj);
    });
    console.log("\nConnection closed..");
        con.release();
    });
})
app.get("/course/:id/information", (req,res) => {
   // console.log("entered server information");
    let returnObj = {};
    let uid = currentuser.id;
   // console.log(uid);

    var query1 = "select status from studentcourse where courseid = '"+req.params.id+"'and studentid  ="+uid;
   // console.log(query1);
    pool.getConnection(function(err,con) {
        con.query(query1, (err, result) => {
                try {console.log("entered status information try");  
               if(!result[0]){
                returnObj.status = "none";
               }
               else{
                 //  console.log("The status is "+ result[0].status)
                   returnObj.status = result[0].status;
               }
                } catch(err) {
                   // console.log("entered status information catch");
                   
                }    
                });
                console.log("\nConnection closed..");
                    con.release();
                });
    var query = "select * from information where cid = '"+req.params.id+"'";
  //  console.log(query);
    pool.getConnection(function(err,con) {
    con.query(query, (err, result) => {
            try {
               // console.log("entered information try");
                var information = [];                  
               
                    let info={};
                    info.cid = result[0].cid;
                    info.department = result[0].department;
                    info.faculty = result[0].faculty;
                    info.description = result[0].description;
                    info.classroom = result[0].classroom;
                    info.term = result[0].term;
                    info.totalcapacity = result[0].totalcapacity;
                    info.waitlist = result[0].waitlist;
                    // info.status = result[0].status;
                    information.push(info);
                
               //console.log(information);
                returnObj.information = information;
               
                returnObj.message = "success";               
               // returnObj.data = "people view successfully!";
       
    } catch(err) {
        console.log("entered information catch");
        returnObj.message = "error";
       // returnObj.data = "Login";
    }
    console.log(returnObj.message);
   // console.log(returnObj.status);
    res.json(returnObj);
    });
    console.log("\nConnection closed..");
        con.release();
    });
})

app.post("/course/:id/information", (req,res) => {
    console.log("entered server delete information");
    let returnObj = {};
    if(req.body.action==="drop"){
    var query = "delete from studentcourse where courseid='"+req.params.id+"' and studentid ="+currentUser.id
    console.log(query);
    pool.getConnection(function(err,con) {
    con.query(query, (err, result) => {
            try {console.log("entered  delete information server try");
                if(result.affectedRows===1){
                    console.log("entered  delete information server try success");
                    returnObj.message="success";
                }
                else
                { console.log("entered  delete information server try fail");
                    returnObj.message = "error";
                }
               } 
    catch(err) {
        console.log("entered  delete information server catch");
        returnObj.message = "error";
    }
  //  console.log(returnObj.people);
    res.json(returnObj);
    });
    console.log("\nConnection closed..");
        con.release();
    });

}
else if(req.body.action==="enroll"||req.body.action==="waitlist"){
    new Promise((resolve,reject)=>{
        query1 = "select facultyid from course where courseid='"+req.params.id+"'"
        console.log(query1);
        con.query(query1,(err,result)=>{
            if(err){
                returnObj.message="error";
               // res.json(returnObj);
            }
            fid=result[0].facultyid;
            resolve([req.params.id,fid,req.body.action]);
        })
    })
    .then((value)=>{
        query = "insert into studentcourse (courseid,facultyid,studentid,studentname,status) values ('"+value[0]+"','"+value[1]+"','"+currentuser.id+"','"+currentuser.name+"','"+value[2]+"');";
       console.log(query);
        con.query(query,(err,result)=>{
            if(err){
                returnObj.message="error";
                res.json(returnObj);
            }
            returnObj.message="success";
            console.log("Enrol updated "+ returnObj.message)
            res.json(returnObj);
        })
    })
}
})

    app.post("/profile/edit", (req,res) => {
        console.log("Data for updated profile in server side is :" +req.body.id);
        let returnObj = {}
        var userid = req.body.id;
        var name = req.body.name;
        var userid = currentuser.id;
       // var password =saltHashPassword(currentuser.password);
        var email = req.body.email;
        var cno = req.body.cno;
        var city = req.body.city;
        var company = req.body.company;
        var hometown = req.body.hometown;
        var country = req.body.country;
        var school = req.body.school;
        var gender = req.body.gender;
        var about = req.body.about;
       // let returnObj = {};
       // INSERT INTO course` (`courseid`, `facultyid`, `coursename`, `coursedept`, `coursedescription`, `courseroom`, `coursecapacity`, `waitlistcapacity`, `courseterm`) VALUES ('213', '121', 'cpme281', 'CE', 'test', '189', '21', '2', 's');
    
        var query = "UPDATE sjsu_canvas.users SET name='"+name+"', email='"+email+"',phonenumber='"+cno+"', aboutme='"+about+"', city='"+city+"', country='"+country+"', company='"+company+"', school='"+school+"', hometown='"+hometown+"', gender='"+gender+"' WHERE userid='"+userid+"'";
      //  var query = "SELECT userid, password FROM users WHERE userid = '"+id+"' AND password = '"+password+"'";
       console.log(query);
       pool.getConnection(function(err,con) {

        con.query(query, (err, result) => {
            try{
                if(result.affectedRows === 1){
                    console.log("success at backend profile update");
                    returnObj.message = "success";               
                    returnObj.data = "profile updated successfully!";
                    console.log("profile update at backend cousradd end");
                }}
                catch{
                    console.log("error at backend add");
                    returnObj.message = "error";               
                    returnObj.data = "signedup unsuccessfully!";
                }
                res.json(returnObj);
            });
            console.log("\nConnection closed..");
            con.release();
        });
    }); 
app.post("/signup", (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    var status = false;
    let returnObj = {};
    console.log(id, name, email, password, role);

    new Promise((resolve, reject)=>{
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) throw err;
            // console.log(salt);
            bcrypt.hash(password,salt, (err, hashed) => {
                if(err) throw err;
                console.log(hashed);    
                resolve(hashed);
            });
        });
    })
    .then((val)=>{
        console.log(val);
        var check = val;  
    var query = "INSERT INTO users (userid, name, email, password, role) VALUES ('"+id+"', '"+name+"', '"+email+"', '"+check+"', '"+role+"')";
    pool.getConnection(function(err,con) {

        con.query(query, (err, result) => {
    try{
            if(result.affectedRows === 1){
                console.log("success at backend signup");
                returnObj.message = "success";               
                returnObj.data = "signedup successfully!";
            }}
            catch{
                console.log("error at backend signup");
                returnObj.message = "error";               
                returnObj.data = "signedup unsuccessfully!";
            }
            res.json(returnObj);
        });
        console.log("\nConnection closed..");
        con.release();
    });
    });
    
});

app.listen(3001,() =>
    console.log("Server started on port 3001")
);