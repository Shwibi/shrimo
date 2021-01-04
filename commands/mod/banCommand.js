const { emoji } = require('../../config/config.json');
module.exports = {
  name: "ban",
  help: `<prefix>ban @user \nBans a user!`,
  async execute(message, client) {
    if (!message.member.hasPermission(`BAN_MEMBERS`)) return;

    const args = message.content.split(/ +/);
    const user = message.mentions.users.first();

    if (!user) return message.channel.send(`${emoji.x} Please mention a valid user in this server to ban!`);

    const guildUser = message.guild.members.cache.find(m => m.id == user.id);
    if (guildUser) {

      if (guildUser.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`${emoji.x} Can't ban a user with a higher role than yours!`);
      const reason = args.slice(2).join(" ") || "No reason provided";
      guildUser.ban().then(
        message.channel.send(`${emoji.ban} Banned <@${guildUser.id}>!`)
      );

    }
    else {
      message.channel.send(`Can't ban a user who is not in this guild, yet! Please contact Shwi#6569 to add that command :)`);
    }
  }
}