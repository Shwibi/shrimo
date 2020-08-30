
const { emoji } = require('../../config/config.json');

module.exports = {
    name: 'drink',
    help: '<prefix>drink @user \nDrink... users...?',
    async execute(message, client) {
        const user = message.mentions.users.first();
        if(!user) return message.channel.send(`${emoji.x} | Mention a user to.. drink...`);
        const name = user.displayName || user.username || user.user.username || user.user.displayName;
        const array = [
            `*drinks ${name}*`,
            `*rolls into ${name} and stick a straw down their* .. yeah no,`,
            `Why do you wanna drink ${name}? :smirk:`,
            `DRINK ZE ${name}!`
        ];
        const index = Math.floor(Math.random() * array.length);
        message.channel.send(array[index]);
    }
}