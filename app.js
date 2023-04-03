//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = {
  name: String
}

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todo list!"
});

const item2 = new Item({
  name: "✅ use the check box to delete an item"
});

const item3 = new Item({
  name: "Click the '+' to add an item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);



app.get("/", function(req, res) {

  Item.find({}).then(data => {
    if(data.length === 0) {
      Item.insertMany(defaultItems);
      res.redirect("/");
       } else {
        res.render("list", {listTitle: "Today", newListItems: defaultItems});
       }
    
  }) 

});
app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}).then(found => {
      found.items.push(item);
      found.save();
      res.redirect("/" + listName);
    })
  }



});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today") {
    Item.findByIdAndRemove(checkedItemId).then(() =>
    {
      res.redirect("/");
    }
  );
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}).then(found => {
      res.redirect("/" + listName);
    })
  }
  
})

app.get("/:customlistName", function(req, res) {
  const customListName = _.capitalize(req.params.customlistName);

  List.findOne({name: customListName}).then(found => {
    if(!found) {
      // create new list;
      const list = new List({
        name: customListName,
        items: defaultItems
      });
    
      list.save();
      res.redirect("/"+customListName)
    } else {
      // redirect to existing list;
      res.render("list", {listTitle: found.name, newListItems: found.items});
    }
  })



});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
