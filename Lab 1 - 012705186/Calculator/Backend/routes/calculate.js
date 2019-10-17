var express = require('express');
var router = express.Router();

router.post('/', function (req, res, err) {


    var input = req.body.input;
console.log(input)
    try {
        var result=eval(input);

        console.log("Result:"+result);

        res.send({status:201, "result":result});
    }
    catch (err) {
        console.log(err);
        res.send({status:401, "message":"Error"});
    }



});



module.exports = router;
