/**
 * Template for commands
 */

const CommandTendril = require(`./CommandTendril`);
const commandName = 'CommandName';
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

    if (!this.initiated) {
      this.Inlog(`Invalid request! ${commandName} command not initiated!`);
      return `Invalid request! ${commandName} command not initiated!`;
    };

    const msgLow = message.content.toLowerCase();
    const args = msgLow.split(/\s/);
    const cmd = args.shift().slice(this.client.prefix.length);


  }

}

const command = new Command(); // Command instance
const cappedName = commandName.substr(0, 1).toUpperCase() + commandName.substr(1, commandName.length);
module.exports = {
  name: commandName, // Name of the command
  description: cappedName + ' command', // Command description
  cappedname: cappedName,
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