module.exports = {
    name: 'ticket',
    help: '<prefix>ticket create | <prefix>ticket close #ticket | <prefix>ticket closed @user\nMod Support tickets! Create, close, and remove!' + 
    "<prefix>ticket create: Create a ticket in the mod support channel, max 3 \n" + 
    "<prefix>ticket close #ticket-channel @user: To be used by a mod, in the ticket channel, to close the ticket \n" +
    "<prefix>ticket closed @user: To be used to remove a ticket from user database, so that user can now create another ticket.",
    async execute(message, client) {

        const args = message.content.toLowerCase().split(" ");
        const GuildConfig = require('../../models/GuildConfig');
        const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
        const ticket = await guildConfig.get('ticket_channel');
        const logs = await guildConfig.get('ticket_logs');
        const Tickets = require('../../models/Tickets');
        const userTickets = await Tickets.findOne({ userId: message.author.id, guildId: message.guild.id })
        const maxtickets = await guildConfig.get('maxTickets');


        const logChannel = message.guild.channels.cache.find(ch => ch.id == logs);
        
        let x;

        if(!ticket || !logs) return message.delete().then(message.channel.send(" <a:no:748782299667234966> | Ticketing not setup for this server!"))
        if(args[1] == 'create') {
            if(!userTickets) {
                const userTicket = await Tickets.create({
                    userTag: message.author.tag,
                    userId: message.author.id,
                    guildId: message.guild.id,
                    count: 1
                });
                x = 1;
                message.guild.channels.create(`ticket-${message.author.username}-${x}`, {
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
                                },
                                {
                                    name: 'User',
                                    value: `<@${message.author.id}>`
                                }
                            ]
                        };
                        logChannel.send({ embed: embed }).then(
                            m => {
                                m.react('🎯');
                            }
                        );
                        ch.send(`<@${message.author.id}> Support will be right with you!`)
                    }
                );
            } else {
                x = await userTickets.get('count');
                // console.log(x);
                const newCount = x + 1;
                // console.log(newCount);
                if(x == maxtickets) return message.channel.send(" <a:no:748782299667234966> | Maximum tickets reached! ").then(m => m.delete({ timeout: 5000 }));
                x = x + 1;
                await userTickets.updateOne({
                    count: newCount
                })
            if(message.channel.id != ticket) return message.delete().then(message.channel.send('<a:no:748782299667234966> | Please use the ticket channel for opening tickets.').then(m => m.delete({ timeout: 5000 })))

            message.delete();


            message.guild.channels.create(`ticket-${message.author.username}-${newCount}`, {
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
                    ch.send(`<@${message.author.id}> Support will be right with you!`)
                }
            );
            }
            


        }
        else if(args[1] == 'close') {
            if(!message.member.hasPermission("KICK_MEMBERS")) return;
            const channel = args[2].substr(2, 18);
            const guildChannel = message.guild.channels.cache.find(ch => ch.id == channel);
            if(!guildChannel) return message.channel.send("<a:no:748782299667234966> | Please mention the channel to close (this channel)");
            const user = message.mentions.users.first();
            if(!user) return message.channel.send("<a:no:748782299667234966> | Please mention the user in this ticket to successfully close the ticket!");
            if(guildChannel.id == message.channel.id) {
                
                if(message.channel.name.includes('ticket-')) {
                    const chID = message.channel.id;
                    const chName = message.channel.name;
                    logChannel.send(`Closing ticket <#${chID}>`).then(
                        m => {
                            message.channel.delete().then(
                                message.member.send(":white_check_mark: | Successfully closed ticket.")
                            ).then(m.edit(`:white_check_mark: | Successfully closed <#${chID}> [#${chName}]`))
                        }
                    )
                    const closeTicket = await Tickets.findOne({ userId: user.id, guildId: message.guild.id});
                    if(!closeTicket) return message.channel.send(" <a:no:748782299667234966> | User tickets not found!");
                    let userTicketCount = await closeTicket.get('count');
                    let newTicketCount = userTicketCount - 1;
                    if(newTicketCount == -1) return message.channel.send(" <a:no:748782299667234966> | User has no tickets!");
                    await closeTicket.updateOne({
                        count: newTicketCount
                    }).then(
                        logChannel.send(" :white_check_mark: | Succesfully closed a ticket from database! User Ticket Count: " + newTicketCount)
                    )
                    
                    
                } else {
                    message.channel.send("<a:no:748782299667234966> | You are not in a ticket channel!");
                }
            } else {
                message.channel.send("<a:no:748782299667234966> | Channels dont match!");
            }
        }

        else if(args[1] == 'closed') {
            if(!message.member.hasPermission("KICK_MEMBERS")) return;
            let user = message.mentions.users.first();
            
            const closeTicket = await Tickets.findOne({ userId: user.id, guildId: message.guild.id});
            if(!closeTicket) return message.channel.send(" <a:no:748782299667234966> | User tickets not found!");
            let userTicketCount = await closeTicket.get('count');
            let newTicketCount = userTicketCount - 1;
            if(newTicketCount == -1) return message.channel.send(" <a:no:748782299667234966> | User has no tickets!");
            await closeTicket.updateOne({
                count: newTicketCount
            }).then(
                message.channel.send(" :white_check_mark: | Succesfully closed a ticket from database! User Ticket Count: " + newTicketCount)
            )

        }
        else {
            return message.channel.send(" <a:no:748782299667234966> | Could not recognise that command, please use create/close/closed").then(m => m.delete({ timeout: 5000 }));
        }

    }
}