//jshint: eversion6
const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const date = require (__dirname + '/date.js');
// console.log(date());
const app = express();
// let items =["First Item","Second item","Third item"];
// let workItems=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todoDB", { useNewUrlParser: true, useUnifiedTopology: true });
const itemsSchema = {
  name: String
};
const Item = mongoose.model("Item",itemsSchema);
const item1 = new Item ({
  name: "Welcome to todo list"
});
const item2 = new Item ({
  name: "Hit + to add new items"
});
const item3 = new Item ({
  name: "<-- hit this to delete an item"
});
const defaultItem = [item1, item2, item3];
app.get("/",function(req,res){
  // let day = date.getDate();
  Item.find({},function(err,founditems){
    if(founditems.length === 0)
    {
      Item.insertMany(defaultItem,function(err){
        if(err)
        {
          console.log(err);
        }else{
          console.log("successfully inserted")
        }
      });

    }else
      {
        res.render('app', {ListTitle: "Today", newListItems: founditems});
      }

    // console.log(founditems);

  });

});

  // res.send("welcome");

  // var currnetDay = today.getDay();
  // var day ="";
// switch (currnetDay) {
//   case 0:
//     day = "Sunday";
//     break;
//     case 1:
//       day = "Monday";
//       break;
//       case 2:
//         day = "Tuesday";
//         break;
//         case 3:
//           day = "Wednesday";
//           break;
//           case 4:
//             day = "Thursday";
//             break;
//             case 5:
//               day = "Friday";
//               break;
//               case 6:
//                 day = "Saturday";
//                 break;
//   default:
//   console.log("Error! invalid day");

// }
  // res.send(day);

app.post("/",function(req,res){
const itemName = req.body.newItem;
const item = new Item({
  name: itemName
});
item.save();
res.redirect("/");
// if(req.body.list === "work")
// {
//   workItems.push(item);
//   res.redirect("/work");
// } else
// {
//   items.push(item);
//   res.redirect("/");
// }


// console.log(req.body);
// items.push(item);
  // console.log(item);
  // res.render('app',{newListItem: item });
  // res.redirect("/");

});
app.get("/work",function(req,res){
  res.render("app",{ListTitle: "Work List", newListItems: workItems});
});
app.listen(3000,function(){
  console.log("server is started at port 3000");
});
