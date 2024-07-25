const express =require("express");
const app=express();
const path =require("path");
let port=8080;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { v4: uuidv4 } = require('uuid');
let methodOverride=require('method-override');
app.use(methodOverride('__method'))





let posts=[
    {
        id:uuidv4(),
        username:"teja",
        content:"i love coding",
    },
    {
        id:uuidv4(),
        username:"tarun",
        content:"i love gaming",
    },
    {
        id:uuidv4(),
        username:"swamy",
        content:"i love fighting",
    },
    


];

app.get("/",(req,res)=>{
//res.render("index.ejs");
res.send("hello");
});

app.get("/posts",(req,res)=>{

res.render("index.ejs",{posts});
});


app.get("/posts/new",(req,res)=>{

    res.render("new.ejs");
});
app.get("/posts/:id",(req,res)=>{
     let id=req.params.id;
     console.log(id);
   let t=posts.find(function(p){
    if(p.id==id)
    {
        
        return p;
    }

   });
   
   console.log(t);
    res.render("show.ejs",{t});
});

app.patch("/posts/:id/edit",(req,res)=>{
    let id=req.params.id;
    let newcont=req.body.content;
     
   let t=posts.find(function(p){
    if(p.id==id)
    {
        
        return p;
    }

   });
   t.content=newcont;
   res.redirect("/posts");
   
   
});


app.post("/posts",(req,res)=>{
   let id=uuidv4();
   let {username,content}=req.body;
   posts.push({id,username,content});
   res.redirect("/posts");
   
});

app.get("/posts/:id/edit",(req,res)=>{
    let id=req.params.id;
     console.log(id);
   let t=posts.find(function(p){
    if(p.id==id)
    {
        
        return p;
    }

   });
   
   console.log(t);
    res.render("edit.ejs",{t});
});

app.delete("/posts/:id", (req,res)=>{
console.log("delete");
   let id=req.params.id;
    posts=posts.filter((p)=>id !==p.id) ;
  /* posts=posts.filter(function(p){
    if(p.id!=id)
    {
        
        return p;
    }

   });*/
    
    res.redirect("/posts");

});


app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
});


