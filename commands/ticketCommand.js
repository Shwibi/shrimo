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
        const Tickets = require('../models/Tickets');
        const userTickets = await Tickets.findOne({ userId: message.author.id, guildId: message.guild.id })
        if(!userTickets) {
            const userTicket = new Tickets({
                userTag: message.author.tag,
                userId: message.author.id,
                guildId: message.guild.id,
                count: 1
            });
        } else {
            const x = userTickets.get('count')
            if(x == 3) return message.channel.send(" :x: | Maximum tickets reached! ").then(m => m.delete({ timeout: 5000 }));
            userTickets.updateOne({
                count: x + 1
            })
        }

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
        else if(args[1] == 'close') {
            if(!message.member.hasPermission("KICK_MEMBERS")) return;
            const channel = args[2].substr(2, 18);
            const guildChannel = message.guild.channels.cache.find(ch => ch.id == channel);
            if(!guildChannel) return message.channel.send(":x: | Please mention the channel to close (this channel)");
            if(guildChannel.id == message.channel.id) {
                if(message.channel.name.includes('ticket-')) {
                    message.channel.delete().then(
                        message.member.send(":white_check_mark: | Successfully closed ticket.")
                    );
                } else {
                    message.channel.send(":x: | You are not in a ticket channel!");
                }
            } else {
                message.channel.send(":x: | Channels dont match!");
            }
        }

    }
}