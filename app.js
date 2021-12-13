const express = require("express")
const request = require("request")
const https = require("https");
const bodyParser = require("body-parser")


const app = express()


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){
  var firstname = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  console.log(firstname+" "+lastName+" "+email);


  var data={
    members:[
      {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME: lastName

      }
      }
    ]
  };

  var jsonData= JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/c50c211d7b";
  const options = {
    method:"POST",
    auth:"sudarshan:e966cbe17eb5f59375eb209a20c2a7e9-us20"
  }

  const request = https.request(url,options,function(response){
    if(response.statusCode ===200){
      res.sendFile(__dirname+"/success.html")
    }else{
      res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })



  request.write(jsonData);
  request.end()


});


app.post("/success",function(req,res){
  res.redirect('/');
})

app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("The newseltter app started");
});


//api e966cbe17eb5f59375eb209a20c2a7e9-us20
//c50c211d7b
