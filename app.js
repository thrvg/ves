// Importing modules
const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const ejs = require("ejs");
const _ = require("lodash");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const path = require('path');

// Initializing and configuring Express, Passport, Mongoose (MongoDB) and global variables
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "secret-string",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


var allowed={"Jaguar":{"Jaguar House Captain":1, "Jaguar House Vice-Captain":2, "Head Prefect Boy":3, "Head Prefect Girl":4, "Sports Prefect Boy":5, "Sports Prefect Girl":6},
              "Cheetah":{"Cheetah House Captain":1, "Cheetah House Vice-Captain":2, "Head Prefect Boy":3, "Head Prefect Girl":4, "Sports Prefect Boy":5, "Sports Prefect Girl":6},
              "Sher":{"Sher House Captain":1, "Sher House Vice-Captain":2, "Head Prefect Boy":3, "Head Prefect Girl":4, "Sports Prefect Boy":5, "Sports Prefect Girl":6},
              "Puma":{"Puma House Captain":1, "Puma House Vice-Captain":2, "Head Prefect Boy":3, "Head Prefect Girl":4, "Sports Prefect Boy":5, "Sports Prefect Girl":6}};
var special_string = "";

mongoose.connect(process.env.MONGODB_URL, {'useNewUrlParser': true, 'useUnifiedTopology': true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  name: String,
  house: String,
  email: String,
  grno: Number,
  username: String,
  password: String,
  hasVoted: Boolean
});

userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema); //for Users

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const cSchema = {
  type: String,
  sort_id: Number,
  cdata: [{
    name: String,
    comp: String,
    desc: String,
    imgurl: String,
    votes: Number
  }]

};
const cModel = mongoose.model("cCandidate", cSchema); //for Candidates

const inputSchema = {
   name: String,
   grno: Number,
   email: String,
   house: String,
   specialtoken: String
};

const inputModel = mongoose.model("inputData", inputSchema); //for User Registration

  
  
var typelist=[]
cModel.find({}).sort({"sort_id": 1}).exec(function(err, allofthedata) {
  if(err){
    console.log(err);
  }
  else{
    allofthedata.forEach(function(element){
      typelist.push(element.type);
    });
  }
 });




app.get("/", function(req, res){
  return res.render("temp");

});
app.get("/letsvote", function(req, res){
  if(req.isAuthenticated()){
  return res.render("beforevoting", {house: req.user.house});
}
else{
return res.render("login");
}
});

app.get("/election", function(req, res){
  if(req.isAuthenticated()){
  return res.render("index");
}
else{
return res.render("login");
}
});
// app.get("/addcandidate", function(req, res){
//   return res.render("addcandidate");
// });

// Commenting out route for adding new candidate
// app.post("/addcandidate", function(req, res){

//   cModel.find(function(err, allofthedata){
//     if(err){
//       console.log(err);
//     }
//     else{
      

//     for(var i=0; i<allofthedata.length; i++){
//       if(_.lowerCase(allofthedata[i].type)===_.lowerCase(req.body.candidateComp)){
//         const person = {
//           name: req.body.candidateName,
//           desc: req.body.candidateDesc,
//           comp: req.body.candidateComp,
//           imgurl: req.body.candidateImg,
//           votes: 0

//         };
        
//         cModel.updateOne(
//               { type: allofthedata[i].type},
//               { $push: {cdata: person} },
//               function (error, success) {
//         if (error) {
//             console.log("Here");

//             return res.render("somethingswrong");
//         } else {
//             return res.render("successadded");
//         }
//     }
//           );
//       }

//   }

//   if(!(req.body.candidateComp2==="Not Applicable")){
//     for(var i=0; i<allofthedata.length; i++){
//       if(_.lowerCase(allofthedata[i].type)===_.lowerCase(req.body.candidateComp2)){
//         const person = {
//           name: req.body.candidateName,
//           desc: req.body.candidateDesc,
//           comp: req.body.candidateComp2,
//           imgurl: req.body.candidateImg,
//           votes: 0


//         };
//         console.log(allofthedata[i]);
//         cModel.updateOne(
//               { type: req.body.candidateComp2 },
//               { $push: { cdata: person } },
//               function (error, success) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(success);
//         }
//     }
//           );
//       }

//   }
//   }
//   if(!(req.body.candidateComp3==="Not Applicable")){

//     for(var i=0; i<allofthedata.length; i++){
//       if(_.lowerCase(allofthedata[i].type)===_.lowerCase(req.body.candidateComp3)){
//         const person = {
//           name: req.body.candidateName,
//           desc: req.body.candidateDesc,
//           comp: req.body.candidateComp3,
//           imgurl: req.body.candidateImg,
//           votes: 0

//         };
//         console.log(allofthedata[i]);
//         cModel.updateOne(
//               { type: req.body.candidateComp3 },
//               { $push: { cdata: person } },
//               function (error, success) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log(success);
//         }
//     }
//           );
//       }

//   }
//   }
//   }});
//   
//   


// });

// Commenting out route for deleting new candidate
// app.post("/removecandidate", function(req, res){
//    let rname = req.body.candidateNameR;
//    rname=rname.trim();
//    cModel.updateOne(
//      {type: req.body.candidateCompR},
//      { $pull: { cdata: {name: rname, comp: req.body.candidateCompR} }},
//      function (error, success) {
//            if (error) {
//                console.log(error);
//                //alert('Hi');
//            } else {
//                console.log(success);

//            }
//        }
//    );
//   return res.redirect("/removecandidate");
//  });


app.get("/candidates", function(req, res){
  return res.render("candidates", { typelist: typelist});

});
app.post("/vote", function(req, res){
  // Step 1: Convert votes string into array with validation
  cModel.find(function(err, allofthedata){
    if(err){
      console.log(err);
    }
    else{
      let stringtocut = req.body.textarea1;
      let firstparts = {};

      let stringstart = stringtocut.indexOf('!');
      stringtocut = stringtocut.substr(1, stringtocut.length);

      console.log(stringtocut);
      let counter=0;
      let votesarr = [];

      while(stringtocut.indexOf('!')!=-1){
        counter+=1;
        let first = stringtocut.substr(0, stringtocut.indexOf('!'));

        let second = stringtocut.substr(stringtocut.indexOf('!')+1, stringtocut.length);
        stringtocut=second;
        if(!(first in firstparts)){
        firstparts[first]=counter;
      }
      else{
        return res.render("somethingswrong");
      }
      if(counter>=7){
        return res.render("somethingswrong")
      }

      votesarr.push(first);

      }

      if(votesarr.length<6){
        return res.render("somethingswrong");
      }


      // Step 2: Increment vote count by 1 for candidates receiving votes
      let successes=0;
      let firstpart="";
      for (let v=0; v<votesarr.length; v++){
      
      firstpart = votesarr[v];
        allofthedata.forEach(function(element){
          if(_.lowerCase(element.type)===_.lowerCase(firstpart.substr(0,firstpart.indexOf(":")))){
            element.cdata.forEach(function(subelement){
                if(_.lowerCase(subelement.name)==_.lowerCase(firstpart.substr(firstpart.indexOf(":")+1,firstpart.length))){
                  successes+=1;
                  cModel.updateOne(
          { "type": element.type, "cdata.name": firstpart.substr(firstpart.indexOf(":")+1,firstpart.length) },
          {
              "$set": {
                  "cdata.$.votes": subelement.votes+1
              }
          },
          function(err,doc) {
            if(err){
            console.log(err);
          }
          }
      );
                }
            });

            console.log("Pushing "+firstpart.substr(firstpart.indexOf(":")+1, firstpart.length)+" to "+element.type);
          }
        });

      }
      // Step 3: If voting successful, set User to hasVoted
      if(successes===6){
      User.findOne({ username: req.user.username }).exec(function(err,result) {
            if (err) throw err;
            if (result) {
                 result.hasVoted = true;
                 result.save()
            } else {
                console.log("not found")
            }
        });
      return res.redirect("aftervoting");
    }
    else{
      console.log("Number wrong");
      return res.render("somethingswrong");
    }
    }
  });
});
app.get("/aftervoting", function(req, res){
  //req.body.textarea1);
  return res.render("aftervoting");
  //console.log(req.user.hasVoted);
});
app.get("/vote", function(req, res){
  if(!req.isAuthenticated()){
  return res.render("whyucheat");
}
else if(req.isAuthenticated&&req.user.hasVoted){
  return res.render("alreadyvoted")
}
else{

  cModel.find(function(err, allofthedata){
    if(err){
      console.log(err);
    }
    else{
    let election_choices = [];
    let temp=[];
    special_string=req.user.house;
    let allowedelections = allowed[special_string];

    allofthedata.forEach(function(element){


      if(element.type in allowedelections){
          temp.push(element.type);
          for(var k=0;k<element.cdata.length;k++){
            temp.push(element.cdata[k].name);
          }
          election_choices.push(temp);
      }
      temp = [];



    });
console.log(election_choices);
return res.render("vote",{choices: election_choices});

  }
  });
}
});

app.get("/candidates/:category/:cname", function(req, res){
  let cname = req.params.cname;
  let category = req.params.category;
  cModel.find(function(err, allofthedata){
    if(err){
      console.log(err);
    }
    else{
    let found=0;
      allofthedata.forEach(function(element){
        if(_.lowerCase(element.type)===_.lowerCase(category)){

          element.cdata.forEach(function(subelement){

            if(_.lowerCase(subelement.name)===_.lowerCase(cname)){
              console.log(subelement.name)
              found =1;

              return res.render("description", {ptype:element.type, pname: subelement.name, pdesc: subelement.desc, pcomp: subelement.comp, pimg: subelement.imgurl, typelist: typelist});
             }
          });



        }
      });
      if(found===0){
        return res.render("oops", {pt: "We're sorry", pc: "There is no candidate with that title/name.", typelist: typelist});
      }
    }

  });
});

// app.get("/removecandidate", function(req, res){

//  return res.render("removecandidate");
  
//  });




app.post("/letsvote", function(req, res){
  special_string=req.body.grouptype;
  return res.redirect("vote");
});

app.get("/candidates/:category", function(req, res){
  cModel.find(function(err, allofthedata){
    if(err){
      console.log(err);
    }
    else{
    let found=0;
    console.log(allofthedata)

    allofthedata.forEach(function(element){
      if(_.lowerCase(element.type)===_.lowerCase(req.params.category)){
        found=1;


        return res.render("categories", {data: element.cdata, type: element.type, typelist: typelist});
      }
    });
    if(found===0){
      return res.render("oops", {pt: "We're sorry", pc: "There is no candidate with that title/name.", typelist: typelist});
    }
  }
  });
});



app.get("/register?", function(req,res){

  let found=0;
  inputModel.find(function(e, validusers){
    if(e){
      console.log(e);
    }

      for(var i = 0; i<validusers.length; i++){
        if(validusers[i].specialtoken===req.query.q){
          let element = validusers[i];
          found=1;
          return res.render("registration", {username: element.email, name: element.name, email: element.email, grno: element.grno, house: element.house});

        }

      }

      if(found===0){
        return res.render("wronglink");
      }
    });


});
 app.get("/alreadyregistered", function(req, res){

   return res.render("alreadyregistered");

   }
 );

app.post("/register", function(req, res){
  let registered=0;
  User.find(function(err, currentusers){
    if(err){
      console.log(err);
    }
    for(var j = 0; j<currentusers.length; j++){

          if(req.body.username===currentusers[j].username){

             registered=1;

             return res.render("alreadyregistered");
          }

      }
      if(registered===0){
      User.register({username: req.body.username, name: req.body.name, email: req.body.email, grno: req.body.grno, house: req.body.house, hasVoted: false}, req.body.password, function(err, user){
        if (err) {
          console.log(err);
          return res.render("somethingswrong");

        }
        else{
        
            return res.redirect("success");
          
        }
      }
    );
}
  });




});

app.get("/login", function(req, res){

  return res.render("login");
  }
);
app.get("/failedlogin", function(req, res){

  return res.render("failedlogin");
  }
);
app.post('/login', function(req, res, next) {
  if(req.isAuthenticated()){
      return res.render("alreadyloggedin");
  }
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/failedlogin'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect("/election");
    });
  })(req, res, next);
});


app.get("/success", function(req, res){
  if(req.isAuthenticated()){
    console.log(req.user);
  }

  return res.render("success");
  }
);

let port=process.env.PORT;
if(port==null||port==""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
