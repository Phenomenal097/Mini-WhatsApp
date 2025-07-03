const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require('method-override')

app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.listen("8080", () => {
    console.log("The server is running at port 8080");
});

main().then((res) => {console.log("Connection to db established")})
.catch(err => console.log("Error establishing connection to db"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/chats/new", (req,res) => {
    res.render("new.ejs");
});

app.post("/chats", (req,res) => {
    let {from, to, msg} = req.body;
    let newChat = new Chat(
        {
            from: from,
            to: to,
            msg: msg,
            created_at: new Date()
        }
    );

    newChat.save().then((res) => {console.log(res)}).catch((err) => {console.log(err)});
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req,res) => {
    let {id} = req.params;
    let chatDetails = await Chat.findById(id);
    res.render("edit.ejs",{chatDetails});
});

app.put("/chats/:id", async (req,res) => {
    let {id} = req.params;
    let  {msg} = req.body;
    await Chat.findByIdAndUpdate(id, {msg: msg}, {runValidators:true, new:true});
    res.redirect("/chats");
});

app.get("/chats", async (req,res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});

//Destroy route
app.delete("/chats/:id", async(req,res) => {
    let {id} = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

app.get("/",(req,res) => {
    res.send("Data sent at root");
});



