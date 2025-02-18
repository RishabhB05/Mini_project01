const express = require("express")
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post")
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const e = require("express");

app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/', (req, res)=>{
    res.render("index")
});
app.get('/login', (req, res) => {
    res.render("login");
});

app.post('/register', async (req, res)=>{
    let{email , password , username, name , age} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("User is already registered");

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(req.body.password , salt ,(err, hash)=>{
         let user =    userModel.create({
                username,
                email,
                name,
                age,
                password:hash
            });
          let token = jwt.sign({email: email , userid: user._id}, "secret")
          res.cookie("token",token);
          res.send("registered");


        })
    })

});

app.get('/login', async (req, res)=>{
    let{email , password } = req.body;

    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("incorrect credentials");

    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            //to send token
            let token = jwt.sign({email: email , userid: user._id}, "secret")
            res.cookie("token",token);
            res.status(200).redirect("/profile");
       

      }   
         else res.redirect("/login")   
    })  


});


app.get('/logout', async (req, res)=>{
    res.cookie("token" ,"")
    res.redirect("login")
});

//middleware: to stay loggin
function isLoggedIn(req, res,next ){
    if(req.cookies.token ==="") res.redirect("/login")
    else{
       let data = jwt.verify(req.cookies.token , "secret")
       req.user = data;
       next();

    }
}

app.get("/profile", isLoggedIn, async(req,res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate("posts");
    //to show the posts we populate
    
    res.render("/profile",{user})
});


app.get("/post", isLoggedIn, async(req,res)=>{
    let user = await userModel.findOne({email: req.user.email});
    let {content} = req.body;

   let post = await postModel.create({
        user: user._id,
        content
    })

    //we send the post id to user 
    user.posts.pus(post._id);
   await user.save();
   res.redirect("profile");
    
});


app.listen(4000);