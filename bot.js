require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.login(process.env.TOKEN);
const mongoose = require('mongoose');


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://shwi:IwasbB4nw&21@cluster0.l2gro.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const c = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// c.connect(err => {
//   const collection = c.db("test").collection("devices");
//   // perform actions on the collection object
//   c.close();
// });

const URL = 'mongodb+srv://shwi:shwishwi@cluster0.2q4wh.gcp.mongodb.net/ShwiConfigs?retryWrites=true&w=majority';
mongoose.connect(URL, { 
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
}
)
fs.readdir('./events/', (err, files) => {
    if(err) return console.error;
    files.forEach(file => {
        if(!file.endsWith('.js')) return;
        const event = require(`./events/${file}`);
        const eventName = file.split("Event.")[0];
        console.log(`Loaded ${eventName}`);
        client.on(eventName, event.bind(null, client));
    })
})

var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }