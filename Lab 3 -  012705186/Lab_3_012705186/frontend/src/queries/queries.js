import {gql} from 'apollo-boost';

const getUserQuery = gql`
query ($userid:ID!,$Password:String!)
{
    user(userid : $userid,Password : $Password ){
        userid
        password
        name
        role
        email
        city
        aboutme
        phonenumber
        country
        company
        school
        gender
        hometown
    }
}
`

const getCourseQuery = gql`
query($facultyid:String!)
{
    course(facultyid:$facultyid){
        courseid
        facultyid
        coursename
        courseterm
    }
}
`
const getCoursesQuery = gql`
query
{
    courses{
        courseid
        facultyid
        coursename
        courseterm
    }
}
`
// const addCourseMutation = gql`
// mutation($facultyid:Int,$courseid:ID!,$coursename:String!,$courseterm:String,$coursedept:String,
//     $coursedescription:String,$courseroom:String,$coursecapacity:String,$waitlistcapacity:String ) {
//     addUser(courseid:$courseid,facultyid:$facultyid,coursename:$coursename,courseterm:$courseterm,courseterm:$courseterm,
//         coursedept:$coursedept,coursedescription:$coursedescription,courseroom:$courseroom,  
//         coursecapacity:$coursecapacity, waitlistcapacity:$waitlistcapacity ){
//             courseid
//             coursename
//     }
//   }
// `

const addCourseMutation = gql`
mutation($courseid:ID!,$coursename:String!, $facultyid:String!,$courseterm:String!,$coursedept:String,$coursedescription:String,$courseroom:String,$coursecapacity:String,$waitlistcapacity:String){
    addCourse (courseid:$courseid,coursename:$coursename,facultyid:$facultyid,courseterm:$courseterm,coursedept:$coursedept,coursedescription:$coursedescription,courseroom:$courseroom,  
              coursecapacity:$coursecapacity, waitlistcapacity:$waitlistcapacity){
            courseid
            coursename
    }
  }
`



const addUserMutation = gql`
mutation($name:String!,$userid:ID!,$email:String!,$password:String!,$role:String!) {
    addUser(userid:$userid,name:$name,email:$email,password:$password,role:$role){
      userid
      name
    }
  }
`

const updateUserMutation = gql`
mutation($name:String!,$userid:ID!,$email:String,$hometown:String,$country:String,$city:String,$school:String,$gender:String,$cno:String,$about:String) {
updateUser(name:$name,userid:$userid,email:$email,hometown:$hometown,country:$country,city:$city,school:$school,gender:$gender,phonenumber:$cno,aboutme:$about){
      name
    }
  }
`

// const updateUserMutation = gql`
// mutation($name:String!,$userid:ID!,$email:String,$hometown:String,$country:String,$city:String,$school:String,$company:String,$gender:String,$cno:String,$about:String,$language:String,$role:String) {
// updateUser(name:$name,userid:$userid,email:$email,hometown:$hometown,country:$country,city:$city,school:$school,company:$company,gender:$gender,cno:$cno,about:$about,language:$language,role:$role){
//       name
//     }
//   }
// 
export {getUserQuery,addUserMutation,getCoursesQuery,addCourseMutation,updateUserMutation,getCourseQuery}