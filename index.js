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
    this.fs = require('fs');
    this.initiated = false;
    this.events = {};
  }

  init() {
    if (this.initiated) return;
    this.client = new this.discord.Client();
  }

  /**
   * Login through token
   */
  Login() {
    if (!this.initiated) return 'Invalid request to login!';
    this.client.login(process.env.TOKEN);
  }

  /**
   * Start the bot app
   */
  Start() {
    // Start the bot
    if (!this.initiated) this.init();
    this.Login();

    const mongoose = require('mongoose');
    // Connect to mongoose database using url
    mongoose.connect(process.env.URL, {
      useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true
    }
    )
  }

  /**
   * Load events
   */
  LoadEvents() {
    const fs = require('fs');

    fs.readdir('./events/', "utf-8", (err, files) => {
      files.forEach(file => {
        if (!file.endsWith('Event.js')) return;
        const event = require(`./events/${file}`);
        const eventName = file.split(`Event.js`)[0];
        this.client.on(eventName, event.evt.bind(null, this.client));
        this.Inlog(`Loaded event ${eventName}!`);
        this.cache.events.push({ name: eventName, event: event, time: new Date() });
        this.events[eventName] = event;
      })
    })

  }

}

const main = new Main();
main.Start();
module.exports = main;