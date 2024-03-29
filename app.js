

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
const _ = require('lodash')


// Just dump content to put in the pages
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://127.0.0.1:27017/blogDB")

const itemsSchema = { 
  name: String,
  content: String
}

const Item = mongoose.model('Item', itemsSchema)



app.get("/", function (req, res){
  Item.find( {})
      .then (function (items) {
  res.render("home", {
    homeStartingContent,
    items:items,
  })
})
})

app.get("/about", function (req, res){
  res.render("about", {
    aboutContent
    
  })
})

app.get("/contact", function (req, res){
  res.render("contact", {
    contactContent
    
  })
})

app.get("/compose", function (req, res){
  res.render("compose", {
  })
})
/*this method takes information from a form in compose.ejs file
and turn possible to insert this into a database*/
app.post("/compose", function (req, res) {
  
  const item = new Item ({
    name:  req.body.newItemTitle,
    content: req.body.newItem
  })
    item.save()
    res.redirect("/");
   
})


app.get("/post/:topic", function (req, res){
  let topic = _.lowerCase(req.params.topic);
  
/*this method turn possible to take information from databse
and pass to post.ejs file*/
  Item.find( {})
      .then (function (items) {
    items.forEach(function(posts){
      let title = _.lowerCase(posts.name)
      let content = posts.content
      let articleTitle = posts.name
      
      if (title === topic){
        res.render("post", {
        content,
        articleTitle
        })
     } 
  })
})
})

app.listen(3000, function () {
  console.log("Servers started on port 3000")
})
