/**
 * Copyright @Shwi 2021
 */

const Line = require('./utils/Line');
const log = require(`./utils/Log`);
require('dotenv').config();

class Main extends Line {

  constructor() {
    super('index');
    this.utils = {
      Cache: require('./utils/Cache'),
      Line: Line,
      Log: log
    };
    this.discord = require('discord.js');
    this.initiated = false;
  }

  init() {
    if (this.initiated) return;
    this.client = new this.discord.Client();
  }

  Login() {
    if (!this.initiated) return 'Invalid request to login!';
    this.client.login(process.env.TOKEN);
  }

  Start() {
    // Start the bot
    if (!this.initiated) this.init();
    this.Login();
  }

  LoadEvents() {
    const fs = require('fs');
    fs.readdir('./events/', "utf-8", (err, files) => {
      files.forEach(file => {
        if (!file.endsWith('Event.js')) return;
        const event = require(`./events/${file}`);
        const eventName = file.split(`Event.js`)[0];
        this.client.on(eventName, event.bind(null, this.client));
        this.Inlog(`Loaded event ${eventName}!`);
      })
    })
  }

}

const main = new Main();
main.Start();
module.exports = main;