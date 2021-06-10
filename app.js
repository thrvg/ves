
//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectID;
const ejs = require("ejs");
const _ = require("lodash");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static("public"));
app.use('/static', express.static(path.join(__dirname, 'public')));

var allowed={"Jaguar":{"Jaguar House Captain":1, "Jaguar House Vice-Captain":2, "Head Prefect Boy":3, "Head Prefect Girl":4, "Sports Prefect Boy":5, "Sports Prefect Girl":6},
              "Cheetah":{"Cheetah House Captain":1, "Cheetah House Vice-Captain":2, "Head Prefect Boy":3, "Head Prefect Girl":4, "Sports Prefect Boy":5, "Sports Prefect Girl":6},
              "Sher":{"Sher House Captain":1, "Sher House Vice-Captain":2, "Head Prefect Boy":3, "Head Prefect Girl":4, "Sports Prefect Boy":5, "Sports Prefect Girl":6},
              "Puma":{"Puma House Captain":1, "Puma House Vice-Captain":2, "Head Prefect Boy":3, "Head Prefect Girl":4, "Sports Prefect Boy":5, "Sports Prefect Girl":6}};
var special_string = "";

app.use(session({
  secret: "secret-string",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-ves:VVSadmin!123@cluster0.v9zcs.mongodb.net/cDB", {'useNewUrlParser': true, 'useUnifiedTopology': true});
//mongoose.connect("mongodb://localhost:27017/userDB", {'useNewUrlParser': true, 'useUnifiedTopology': true});
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
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const cSchema = {
  type: String,
  cdata: [{
    name: String,
    comp: String,
    desc: String,
    imgurl: String,
    votes: Number
  }]

};
 const cModel = mongoose.model("cCandidate", cSchema);

 const inputSchema = {
   name: String,
   grno: Number,
   email: String,
   house: String,
   specialtoken: String
 };

  const inputModel = mongoose.model("inputData", inputSchema);

  const newuser1 = new inputModel({
    name: "Test User",
    grno: 1122,
    email: "test@email.com",
    house: "Jaguar",
    specialtoken: "test1122"

  });
  const newuser2 = new inputModel({
    name: "Another User",
    grno: 1123,
    email: "another@email.com",
    house: "Puma",
    specialtoken: "another1123"

  });

//
const cRaceJHC = new cModel({
  type: "Jaguar House Captain",
  cdata: []
});
const cRaceJHVC = new cModel({
  type: "Jaguar House Vice-Captain",
  cdata: []
});
const cRaceCHC = new cModel({
  type: "Cheetah House Captain",
  cdata: []
});
const cRaceCHVC = new cModel({
  type: "Cheetah House Vice-Captain",
  cdata: []
});
const cRaceSHC = new cModel({
  type: "Sher House Captain",
  cdata: []
});
const cRaceSHVC = new cModel({
  type: "Sher House Vice-Captain",
  cdata: []
});
const cRacePHC = new cModel({
  type: "Puma House Captain",
  cdata: []
});
const cRacePHVC = new cModel({
  type: "Puma House Vice-Captain",
  cdata: []
});
const cRaceHPB = new cModel({
  type: "Head Prefect Boy",
  cdata: []
});
const cRaceHPG = new cModel({
  type: "Head Prefect Girl",
  cdata: []
});
const cRaceSPB = new cModel({
  type: "Sports Prefect Boy",
  cdata: []
});
const cRaceSPG = new cModel({
  type: "Sports Prefect Girl",
  cdata: []
});

const cRaceHP = new cModel({
  type: "headPrefect",
  subc1: "Head Prefect Girl",
  subc2: "Head Prefect Boy",
  cdata: []
});
//const cTempArray = [cRaceHPB, cRaceHPG]
//cModel.collection.drop();
//const cTempArray = [cRaceHPB, cRaceHPG, cRaceSPB, cRaceSPG, cRaceJHC, cRaceJHVC, cRaceCHC, cRaceCHVC, cRacePHC, cRacePHVC, cRaceSHC, cRaceSHVC];
const cTempArray = [newuser1, newuser2];
// inputModel.insertMany(cTempArray, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("S");
//   }
// });
// User.deleteMany({}, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("S");
//   }
// });
var typelist=[]
cModel.find(function(err, allofthedata){
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
return res.render("login");
});
app.get("/addcandidate", function(req, res){
  return res.render("addcandidate");
});


app.post("/addcandidate", function(req, res){

  cModel.find(function(err, allofthedata){
    if(err){
      console.log(err);
    }
    else{
      //console.log(allofthedata);

    for(var i=0; i<allofthedata.length; i++){
      if(_.lowerCase(allofthedata[i].type)===_.lowerCase(req.body.candidateComp)){
        const person = {
          name: req.body.candidateName,
          desc: req.body.candidateDesc,
          comp: req.body.candidateComp,
          imgurl: req.body.candidateImg,
          votes: 0

        };
        //console.log(allofthedata[i].type);
        cModel.updateOne(
              { type: allofthedata[i].type},
              { $push: {cdata: person} },
              function (error, success) {
        if (error) {
            //console.log(error);
            console.log("Here");

            return res.render("somethingswrong");
        } else {
            return res.render("successadded");
            //console.log(success);
        }
    }
          );
      }

  }

  if(!(req.body.candidateComp2==="Not Applicable")){
    for(var i=0; i<allofthedata.length; i++){
      if(_.lowerCase(allofthedata[i].type)===_.lowerCase(req.body.candidateComp2)){
        const person = {
          name: req.body.candidateName,
          desc: req.body.candidateDesc,
          comp: req.body.candidateComp2,
          imgurl: req.body.candidateImg,
          votes: 0


        };
        console.log(allofthedata[i]);
        cModel.updateOne(
              { type: req.body.candidateComp2 },
              { $push: { cdata: person } },
              function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    }
          );
      }

  }
  }
  if(!(req.body.candidateComp3==="Not Applicable")){

    for(var i=0; i<allofthedata.length; i++){
      if(_.lowerCase(allofthedata[i].type)===_.lowerCase(req.body.candidateComp3)){
        const person = {
          name: req.body.candidateName,
          desc: req.body.candidateDesc,
          comp: req.body.candidateComp3,
          imgurl: req.body.candidateImg,
          votes: 0

        };
        console.log(allofthedata[i]);
        cModel.updateOne(
              { type: req.body.candidateComp3 },
              { $push: { cdata: person } },
              function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    }
          );
      }

  }
  }
  }});
  //console.log(person);
  //


});


 app.post("/removecandidate", function(req, res){
   let rname = req.body.candidateNameR;
   rname=rname.trim();
   cModel.updateOne(
     {type: req.body.candidateCompR},
     { $pull: { cdata: {name: rname, comp: req.body.candidateCompR} }},
     function (error, success) {
           if (error) {
               console.log(error);
               //alert('Hi');
           } else {
               console.log(success);

           }
       }
   );
return res.redirect("/removecandidate");
 });


function getstuff(astring){
  var partofastring=astring.split(' ').slice(0,2).join(' ');
  let what = "";
  if(partofastring==="Head Prefect"){
    what = "headPrefect";
  }
  else if(partofastring==="Sports Prefect"){
    what = "sportsPrefect";
  }
  else if(partofastring==="Jaguar House"){
    what = "jaguar";
  }
  else if(partofastring==="Cheetah House"){
    what = "cheetah";
  }
  else if(partofastring==="Sher House"){
    what = "sher";
  }
  else if(partofastring==="Puma House"){
    what = "puma";
  }
  return what;
}

app.get("/candidates", function(req, res){
  return res.render("candidates", { typelist: typelist});

});
app.post("/vote", function(req, res){

  User.findOne({ username: req.user.username }).exec(function(err,result) {
        if (err) throw err;
        if (result) {
             result.hasVoted = true;
             result.save()
            //console.log("found")
        } else {
            console.log("not found")
        }
    });

  //res.send(req.body.textarea1);
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
      while(stringtocut.indexOf('!')!=-1){
        counter+=1;
        firstpart = stringtocut.substr(0, stringtocut.indexOf('!'));
        secondpart = stringtocut.substr(stringtocut.indexOf('!')+1, stringtocut.length);
        // console.log(firstpart);
        stringtocut=secondpart;
        if(!(firstpart in firstparts)){
        firstparts[firstpart]=counter;
      }
      else{
        return res.render("somethingswrong");
      }
      if(counter>=7){
        return res.render("somethingswrong")
      }
        allofthedata.forEach(function(element){
          if(_.lowerCase(element.type)===_.lowerCase(firstpart.substr(0,firstpart.indexOf(":")))){
            element.cdata.forEach(function(subelement){
                if(_.lowerCase(subelement.name)==_.lowerCase(firstpart.substr(firstpart.indexOf(":")+1,firstpart.length))){
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
      return res.redirect("aftervoting");
    }
  });
  //res.redirect("aftervoting");
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

    //console.log(allowed);
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
    //console.log(allofthedata);
    let found=0;
      allofthedata.forEach(function(element){
        if(_.lowerCase(element.type)===_.lowerCase(category)){

          element.cdata.forEach(function(subelement){

            if(_.lowerCase(subelement.name)===_.lowerCase(cname)){
              console.log(subelement.name)
          // //
              found =1;

              //res.render("description")
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
app.get("/removecandidate", function(req, res){

 return res.render("wronglink");
  // cModel.find(function(err, allofthedata){
  //   if(err){
  //     console.log(err);
  //   }
  //   else{
  //     return res.render("removecandidate", {data: allofthedata});
  //   }
  // });
 });
// app.get("/register?", function(req, res){
//   res.render("alreadyregistered");
//   console.log(req.query.q);
//});
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


// app.get("/register?", function(req, res){
//
//   if(req.query.q===""){
//     res.render("wronglink");
//
//   }
//   inputModel.find(function(err, allofthedata){
//     if(err){
//       console.log(err);
//     }
//     else{
//     let found=0;
//     let registered=0;
//     allofthedata.forEach(function(element){
//       if(element.specialtoken===req.query.q){
//         found=1;
//
// //         User.find(function(e, otherdata){
// //           if(err){
// //             console.log(err);
// //           }
// //           else{
// //
// //
// //         for(var i=0; i<otherdata.length; i++){
// //           if(element.name===otherdata[i].name){
// //             res.redirect("alreadyregistered");
// //             registered=1;
// //             //  console.log("ho");
// //           }
// //         }
// //
// //
// //
// // }});
// // if(registered===0){
//
//         res.render("registration", {username: element.email, name: element.name, email: element.email, grno: element.grno, house: element.house});
// //      }
//       }
//     });
//     if(found===0){
//       res.render("wronglink");
//
//     }
//   }
//   });
// });
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
              //console.log("Found:"+found);
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
        //  passport.authenticate("local")(req, res, function(){
            return res.redirect("success");
          //});
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
// app.post("/login",
//   passport.authenticate("local"),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     console.log(req.user);
//   });
// app.post("/login", function(req, res){
//
//   // const user = new User({
//   //   username: req.body.username,
//   //   password: req.body.password
//   // });
//   //
//   // req.login(user, function(err){
//   //   if(err){
//   //     console.log(err);
//   //   }
//   //   else{
//   //     passport.authenticate("local")(req, res, function(err1, user1, info){
//   //       console.log(user1.name);
//   //       res.redirect("success");
//   //     });
//   //   }
//   // });
//   //
//
//
//
// });

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
