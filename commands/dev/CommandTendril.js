//TODO: Base tendril

const Line = require(`../../utils/Line`);

class CommandTendril extends Line {

  /**
   * Create a new command
   * @param {String} name 
   */
  constructor(name) {
    super(`command.${name}`);
    this.initiated = false;
  }

  /**
   * Initiate the command tendril with client
   */
  init(client) {
    if (this.initiated) return;
    this.client = client;
    this.Inlog(`Initiated ${this.name}`);
    this.initiated = true;
  }

  /**
   * Call this command using said message
   */
  call(message) {

  }

}

module.exports = CommandTendril