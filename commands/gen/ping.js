/**
 * Template for commands
 */

const Discord = require("discord.js");
const CommandTendril = require(`../dev/CommandTendril`);
const commandName = 'ping';
class Command extends CommandTendril {

  /**
   * Commit command
   */
  constructor() {
    super(commandName)
  }

  /**
   * Call this command using message 
   */
  call(message) {

    if (!this.initiated) return 'Invalid request! Command not initiated!';

    const msgLow = message.content.toLowerCase();
    const args = msgLow.split(/\s/);
    const cmd = args.shift().slice(this.client.prefix.length);

    let pingEmbed = new Discord.MessageEmbed()
      .setTitle(`Ping!`)
      .setDescription(`Pingu`)
      .addField(`Client API`, `${this.client.ws.ping}ms`)
      .setColor('RANDOM')
      .setTimestamp();
    message.channel.send(pingEmbed).then(
      msg => {
        pingEmbed.addField(`Latency`, `${msg.createdTimestamp - message.createdTimestamp}ms`);
        msg.edit(pingEmbed);
      }
    );


  }

}

const command = new Command(); // Command instance
const cappedName = commandName.substr(0, 1).toUpperCase() + commandName.substr(1, commandName.length);
module.exports = {
  name: commandName, // Name of the command
  description: `Know the latency of the bot.`, // Command description
  cappedName: cappedName,
  usage: commandName, // How to use the command, prefix added automatically
  example: commandName, // Example on how to use, prefix added auto
  defaultHelp: true, // Whether to use the default help
  aliases: [], // Aliases, aka, how else to use the command apart from name
  ignore: false, // Whether to ignore this command
  guildOnly: false, // Only allowed in servers
  dmOnly: false, // Only allowed in dms
  permissions: ["SEND_MESSAGES"], // Permissions required
  cmd: (message, client) => {

    // Runs whenever the command is called

    if (!command.initiated) command.init(client); // Initiate command

    command.call(message); // Call the command

  }
}