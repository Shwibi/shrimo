/**
 * Copyright @Shwi 2021
 */
const log = require('./Log');
class Cache {

  static All = [];
  static LogByDefault = true;

  constructor(message, object) {
    object = object || { at: new Date() };
    object.at = new Date();
    object.message = message;
    this.message = message;
    this.object = object;
    this.id = Cache.All.length + 1;
    this.PushToAll();
    if (Cache.LogByDefault) this.Log();
  }

  PushToAll() {
    Cache.All.push(this.info);
  }

  Log() {
    log.Log(`(Cache/${this.id}) ${this.message}`);
  }

  get info() {
    return {
      id: this.id,
      message: this.message,
      object: this.object,
      class: this
    }
  }

}

module.exports = Cache;