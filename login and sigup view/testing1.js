var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "MYDB"
});
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.post('/submit',function(req,res){

  var name=req.body.name;
  var email=req.body.email;
  var username=req.body.username;
  var password = req.body.password;

  if(req.body.name == '' || req.body.email == '' || req.body.username == '' || req.body.password == ''){
   return res.write("Enter all details correctly");
  } else{
    res.write("signup sucess")
   };

  // res.write('You sent the name "' + req.body.name+'".\n');
  // res.write('You sent the email "' + req.body.email+'".\n');
  // res.write('You sent the username "' + req.body.username+'".\n');
  // res.write('You sent the password "'+ req.body.password+'".\n');
  //res.write("signup sucess");

  con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO data (name, email,description,password) VALUES ('"+name+"', '"+email+"','"+username+"','"+password+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
     res.end();
  });
  });
})





app.post('/submit1',function(req,res){

  var username=req.body.username;
  var password = req.body.password;

  if(req.body.username == '' || req.body.password == ''){
   return res.write("Enter all details correctly");
  }else{
    res.write("login sucuss")
  } 


  con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO data1 (description,password) VALUES ('"+username+"','"+password+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
     res.end();
  });
  });
})
app.listen(8000);
console.log("Running at Port 8000");
