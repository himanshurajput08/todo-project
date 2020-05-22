//jshint: eversion6
const express = require ('express');
const bodyParser = require('body-parser');

const date = require (__dirname + '/date.js');
// console.log(date());
const app = express();
let items =["First Item","Second item","Third item"];
let workItems=[];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  let day = date.getDate();
  res.render('app', {ListTitle: day, newListItems: items});
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
let item = req.body.newItem;
if(req.body.list === "work")
{
  workItems.push(item);
  res.redirect("/work");
} else
{
  items.push(item);
  res.redirect("/");
}


// console.log(req.body);
items.push(item);
  // console.log(item);
  // res.render('app',{newListItem: item });
  res.redirect("/");

});
app.get("/work",function(req,res){
  res.render("app",{ListTitle: "Work List", newListItems: workItems});
});
app.listen(3000,function(){
  console.log("server is started at port 3000");
});
