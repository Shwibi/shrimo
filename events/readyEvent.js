const Line = require(`../utils/Line`);
const Log = require(`../utils/Log`);
const Cache = require(`../utils/Cache`);

class Ready extends Line {

  /**
   * Ready event
   */
  constructor() {
    super(`event.ready`);
    this.initiated = false;
    this.utils = {
      Line: Line, Log: Log, Cache: Cache
    };

  }

  /**
   * Initialise the ready event using client
   */
  init(client) {
    if (this.initiated) return;
    this.client = client;
    this.initiated = true;
    this.Inlog(`Ready event initialised!`);
  }

  call() {
    if (!this.initiated) return `Invalid call to ready event; Event not initialised!`;
    Log.LogG(`Client logged in and online as ${this.client.user.tag}!`);
    this.Inlog(`${this.client.user.tag} online!`);
  }

}

const ready = new Ready();
module.exports.evt = (client) => {
  if (!ready.initiated) ready.init(client);
  ready.call();
}

module.exports.line = ready;