const { execute } = require("./settingsCommand");

module.exports = {
    name: 'ticket',
    help: '<prefix>ticket create | <prefix>ticket close #ticket \nMod Support tickets!',
    async execute(message, client) {

        const args = message.content.toLowerCase().split(" ");
        const GuildConfig = require('../models/GuildConfig');
        const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
        const ticket = await guildConfig.get('ticket_channel');
        const logs = await guildConfig.get('ticket_logs');

        if(!ticket || !logs) return message.delete().then(message.channel.send(" :x: | Ticketing not setup for this server!"))
        if(args[1] == 'create') {
            if(message.channel.id != ticket) return message.delete().then(message.channel.send(':x: | Please use the ticket channel for opening tickets.'))

            message.delete();

            const logChannel = message.guild.channels.cache.find(ch => ch.id == logs);

            message.guild.channels.create(`ticket-${message.author.username}`, {
                type: 'text',
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL'],
                    },
                    {
                        id: message.author.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                ],
            }).then(
                ch => {
                    // const ticketClaimChannel = message.guild.channels.cache.find(ch => ch.name == 'ticket-claiming');

                    const embed = {
                        author: {
                            name: message.author.tag,
                            icon_url: message.author.displayAvatarURL()
                        },
                        title: 'New ticket created!',
                        description: `Ticket created: <#${ch.id}>`,
                        color: 0x60f542,
                        fields: [
                            {
                                name: 'Ticket',
                                value: `<#${ch.id}>`
                            }
                        ]
                    };
                    logChannel.send({ embed: embed }).then(
                        m => {
                            m.react('🎯');
                        }
                    );
                }
            );


        }

    }
}