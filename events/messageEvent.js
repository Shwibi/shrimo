const Cache = require(`../utils/Cache`);
const Line = require(`../utils/Line`);
const Log = require(`../utils/Log`);
const fs = require(`fs`);
const Discord = require(`discord.js`);

class MessageEvent extends Line {

  constructor() {
    super(`event.message`);
    this.initiated = false;
    this.cache.commands = [];
    this.commands = new Discord.Collection();
    this.config = require(`../storage/config.json`);
  }

  /**
   * Initialize the message event using client
   */
  init(client) {
    if (this.initiated) return;
    this.client = client;
    this.LoadCommands();
    this.initiated = true;
  }

  /**
   * Call a new message
   */
  call(message) {
    // A new message
    //TODO: Add new message stuff
  }

  /**
   * Load the commands
   */
  LoadCommands() {
    const commandFolders = fs.readdirSync(`./commands/`);
    for (const cat of commandFolders) {
      const commandFiles = fs.readdirSync(`./commands/${cat}`).filter(file => file.endsWith(`Command.js`));
      for (const file of commandFiles) {
        const command = require(`../commands/${cat}/${file}`);
        if (!command.ignore) {
          const commandName = command.name || file.split(`Command`)[0];
          this.commands.set(commandName, command);
          this.cache.commands.push({ name: commandName, command: command });
          this.Inlog(`Loaded command ${commandName} in category ${cat}`);
        }
      }
    }
  }

}

const message = new MessageEvent();

module.exports = (client) => {
  if (!message.initiated) message.init(client);
  message.call(message);
}