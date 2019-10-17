const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://abajaj:' + encodeURIComponent('Cricket2012%40') + '@node-rest-canvas-rmxta.mongodb.net/test?retryWrites=true');
const Users = require('../models/users');
const Courses = require('../models/courses');
const Lectures = require('../models/lectures');
const Messages = require('../models/messages');
var cu = require('../api/data')
var currentuser = cu.getUser();

const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLIntGraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;
 
const UserType = new GraphQLObjectType({
name : 'User',
fields: () =>({
userid:    {type : GraphQLID},
name :     {type : GraphQLString},
email :    {type : GraphQLString},
password : {type : GraphQLString},
role :     {type : GraphQLString},
city :     {type : GraphQLString},
phonenumber:{type : GraphQLString},
country:{type : GraphQLString},
aboutme : {type : GraphQLString},
company:{type : GraphQLString},
school:{type : GraphQLString},
gender:{type : GraphQLString},
hometown:{type : GraphQLString}
// cid : {type : GraphQLString},
// course : {
//     type : CourseType,
//     resolve(parent,args){
//         console.log(parent);
//         // return _.find(courses,{courseid:parent.cid})
//         return courses.find({courseid : parent.cid})
//     }
// }
})
})

const CourseType = new GraphQLObjectType({
    name : 'Course',
    fields: () =>({
    courseid:             {type : GraphQLID},
    facultyid :           {type : GraphQLInt},
    coursename :          {type : GraphQLString},
    courseterm :          {type : GraphQLString},
    coursedept :          {type : GraphQLString}, 
    coursedescription :   {type : GraphQLString},
    courseroom :          {type : GraphQLString},
    coursecapacity :      {type : GraphQLString},
    waitlistcapacity :    {type : GraphQLString},
    // users:{
    //     type : new GraphQLList(UserType),
    //     resolve(parent,args){
    //         // return _.filter(users,{cid:parent.courseid})
    //         return users.find({cid : parent.courseid})
    //     }
    // }
    })
    })

const RootQuery = new GraphQLObjectType({
name : 'RootQueryType',
fields : {
 user : {
     type : new GraphQLList(UserType),
     args : {userid : {type: GraphQLID}},
     resolve(parent,args){
         console.log(args.userid)
         return Users.find({userid : args.userid})
        // return _.find(users, { userid: args.userid });
     }
 },
 course : {
    type : new GraphQLList(CourseType),
    args : {courseid : {type: GraphQLID}},
    resolve(parent,args){      
        return Courses.find({courseid : args.courseid})
    }
},
users: {
type : new GraphQLList(UserType),
resolve(parent,args){
    return Users.find({})
}
},
courses: {
    type : new GraphQLList(CourseType),
    resolve(parent,args){
        return Courses.find({})
    }
    }
}
});

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields:{
        addCourse:{
            type:CourseType,
            args:{
                coursename:          {type:new GraphQLNonNull(GraphQLString)},
                courseid:            {type:new GraphQLNonNull(GraphQLID)},
                facultyid:           {type:GraphQLString},
                courseterm:          {type:GraphQLString},
                coursedept:          {type:GraphQLString},
                coursedescription:   {type:GraphQLString},
                courseroom:          {type:GraphQLString},
                coursecapacity:      {type:GraphQLString},
                waitlistcapacity:    {type:GraphQLString}
            },
            resolve(parent,args){
                let courses = new Courses({
                    _id: new mongoose.Types.ObjectId(),
                    coursename : args.coursename,
                    courseid: args.courseid,
                    facultyid : args.facultyid,
                    courseterm : args.courseterm,
                    coursedept : args.coursedept,
                    coursedescription : args.coursedescription,
                    courseroom : args.courseroom,
                    coursecapacity : args.coursecapacity,
                    waitlistcapacity : args.waitlistcapacity,
                })
                return courses.save();
            }
        },
        addUser:{
            type:UserType,
            args:{
                userid:  {type:new GraphQLNonNull(GraphQLID)},
                name:    {type:new GraphQLNonNull(GraphQLString)},
                email:   {type:GraphQLString},
                password:{type:GraphQLString},
                role:    {type:GraphQLString},
                phonenumber: {type:GraphQLString},
                aboutme: {type:GraphQLString},
                city:    {type:GraphQLString},
                country: {type:GraphQLString},
                company: {type:GraphQLString},
                school:  {type:GraphQLString},
                hometown: {type:GraphQLString},
                language: {type:GraphQLString},
                gender:   {type:GraphQLString},
            },
            resolve(parent,args){
                let users = new Users({
                    _id: new mongoose.Types.ObjectId(),
                    userid : args.userid,
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    role: args.role,
                })
                return users.save();
            }
        },
        updateUser:{
            type:UserType,
            args:{
                userid:  {type:new GraphQLNonNull(GraphQLID)},
                name:    {type:GraphQLString},
                email:   {type:GraphQLString},
                password:{type:GraphQLString},
                role:    {type:GraphQLString},
                phonenumber: {type:GraphQLString},
                aboutme: {type:GraphQLString},
                city:    {type:GraphQLString},
                country: {type:GraphQLString},
                company: {type:GraphQLString},
                school:  {type:GraphQLString},
                hometown: {type:GraphQLString},
                language: {type:GraphQLString},
                gender:   {type:GraphQLString},
            },
            resolve(parent,args){
            Users.update({userid : args.userid },{name :args.name,email:args.email,phonenumber: args.phonenumber,aboutme: args.aboutme,country: args.country,company: args.company,school: args.school,hometown: args.hometown,language: args.language,gender: args.gender,city : args.city }).
                 exec().then( result => {
                        console.log("Entered update profile of mongoose db and result is ",result.nModified);
                        if (result.nModified ===1){
                          console.log("success at backend profile update");
                        }
                 })
                 return Users
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation 
});
