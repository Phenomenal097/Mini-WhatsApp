const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

main().then((res) => {console.log("Connection to db established")})
.catch(err => console.log("Error establishing connection to db"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

Chat.insertMany([
        {   
            from: "Ram",
            to: "Shyam",
            msg:"Lets move out",
            created_at: new Date()},
        {
            from: "Ghanshyam",
            to: "Sita",
            msg:"Please don't move anywhere",
            created_at: new Date()
        },
        {
            from: "Jatin",
            to: "Virat",
            msg:"Lets win the game tonight",
            created_at: new Date()
        },
        {
            from: "Rohit",
            to: "Gill",
            msg:"Use your feet more",
            created_at: new Date()
        }
]);
