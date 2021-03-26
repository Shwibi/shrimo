/**
 * Copyright @Shwi 2021
 */

const Cache = require('./Cache');

class Line {

  static AllLines = [];
  static Tendrils = [];

  /**
   * Create a new line from app central
   * @param {String} name 
   */
  constructor(name) {
    this.name = name;
    this.cache = { logs: [] };
    this.logs = [];
    this.cache.created = new Cache(`Created new line ${this.name}!`, { line: this });
  }

  /**
   * Log something to this line
   * @param {String} message 
   */
  Inlog(message) {
    this.logs.push({ msg: message, at: new Date() });
    this.cache.logs.push(new Cache(`Logged an invoice on line ${this.name}: ${message}`, { line: this, message: message }));
  }

}

module.exports = Line;