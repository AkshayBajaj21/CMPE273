var assert = require('chai').assert;
var app = require('../index');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);
describe('User profile', function(){

    it('Get /profile',function(){
        agent.get('/profile').query({userid : 2121})
            .then(function(res){
             //   console.log(res);
                expect(res.status).equal(200);
            });
    });
})

describe('view courses', function(){

    it('Get /courses',function(){
        agent.get('/course').query({facultyid : 2121})
            .then(function(res){
             //   console.log(res);
                expect(res.status).equal(200);
            });
    });
})

describe('view courses info', function(){

    it('Get /courses/:id/information',function(){
        agent.get('/course/876/information').query({courseid : 876,studentid : 2121})
            .then(function(res){
             //   console.log(res);
                expect(res.status).equal(200);
            });
    });
})

describe('view assignment info', function(){

    it('Get /courses/:id/assignment',function(){
        agent.get('/course/876/information').query({cid : 876})
            .then(function(res){
             //   console.log(res);
                expect(res.status).equal(200);
            });
    });
})

describe('view announcement info', function(){

    it('Get /courses/:id/announcement',function(){
        agent.get('/course/876/announcement').query({cid : 876})
            .then(function(res){
             //   console.log(res);
                expect(res.status).equal(200);
            });
    });
})