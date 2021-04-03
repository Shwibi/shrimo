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
    //TODO: Add mongoose database

    const prefix = this.config.bot.prefix;
    const msgLow = message.content.toLowerCase(); // Lower case message
    const args = msgLow.split(/\s/); // Arguments
    let cmd = args.shift(); // Command called for
    this.client.prefix = prefix; // Set prefix for client

    if (!cmd.startsWith(prefix)) return;
    cmd = cmd.slice(prefix.length);
    if (cmd) {

      const fetchCommand = this.commands.get(cmd) || this.commands.find(c => c.aliases && c.aliases.includes(cmd)); // Fetch the command from collection
      if (fetchCommand) {

        if (fetchCommand.ignore) return;
        if (fetchCommand.guildOnly && !message.guild) return;
        if (fetchCommand.dmOnly && message.guild) return;

        const statusCheck = [];

        if (!message.guild) {

          const perms = fetchCommand.permissions;

          for (let i = 0; i < perms.length; i++) {

            // Permissions check
            if (perms[i] == 'DEV' && this.config.bot.devs.includes(message.author.id)) return statusCheck.push('DENIED');

            if (!message.member.hasPermission(perms[i])) return statusCheck.push('DENIED');

          }

        }

        if (statusCheck.includes('DENIED')) return;

        if (args[0] == 'help' && fetchCommand.defaultHelp) {
          // Help command
          const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`${fetchCommand.cappedName} Help` || `${fetchCommand.name} Help`)
            .setDescription(fetchCommand.description || 'No description provided')
            .setColor(fetchCommand.color || 'RANDOM')
            .addField(`Usage`, prefix + fetchCommand.usage || `${prefix}${fetchCommand.name}`)
            .addField(`Example`, prefix + fetchCommand.example || `No example provided.`)
            .addField(`Aliases`, fetchCommand.aliases.join(`, `) || 'No aliases provided!')
            .setFooter(fetchCommand.note || `Requested by ${message.author.tag}`)
            .setTimestamp();

          message.channel.send(helpEmbed);

          return;
        }

        fetchCommand.cmd(message, this.client);

      }

    }

  }

  /**
   * Load the commands
   */
  LoadCommands() {
    const commandFolders = fs.readdirSync(`./commands/`);
    for (const cat of commandFolders) {
      if (cat == 'dev') continue;
      this.Inlog('Doing stuff');
      const commandFiles = fs.readdirSync(`./commands/${cat}`).filter(file => file.endsWith(`.js`));
      for (const file of commandFiles) {
        const command = require(`../commands/${cat}/${file}`);
        if (!command.ignore) {
          const commandName = command.name || file.split(`.`)[0];
          this.commands.set(commandName, command);
          this.cache.commands.push({ name: commandName, command: command });
          this.Inlog(`Loaded command ${commandName} in category ${cat}`);
        }
      }
    }
  }

}

const messageTendril = new MessageEvent();

module.exports = (client, message) => {
  if (!messageTendril.initiated) messageTendril.init(client);
  messageTendril.call(message);
}