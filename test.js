require('dotenv').config();
const Discord = require('discord.js');
const eat = new Discord.Client();
eat.login(process.env.TOKEN);

eat.on('ready', () => {
    console.log("TEST READY");
})

eat.on('messageReactionAdd', reaction => {

    console.log(reaction);

    const message = reaction.message;
    if(message.embeds) {
        message.embeds.forEach(embed => {
            if(embed.description.includes('<#') && embed.description.includes('>')) {
                const channel = embed.description.substr(embed.description.indexOf('#'), embed.description.indexOf('>'));
                console.log(channel);
                if(reaction.emoji.name == '🎯') {
                    console.log("Claim");
                    const channelId = channel.substr(1, 18);
                    const ticketChannel = message.guild.channels.cache.find(ch => ch.id == channelId);
                    if(!ticketChannel) return message.channel.send("No ticket found...");
                    reaction.users.cache.forEach(user => {
                        if(user.bot) {

                        } else {
                            ticketChannel.updateOverwrite(user, {
                                VIEW_CHANNEL: true
                            })
                        }
                        
                    })
                } else {
                    console.log("Not claim");
                }
            }

        })
    }

})

eat.on('message', message => {

    if(message.author.id !== '700328450270953503') return;

    const prefix = 's@';
    const msg = message.content.toLowerCase();
    if(!msg.startsWith(prefix)) return;
    
    const args = msg.split(" ");
    const command = args[0].slice(prefix.length);

    if(command == 'ticket') {

        console.log("ticket");

        if(args[1] == 'create') {

            console.log("create");

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
                    const ticketClaimChannel = message.guild.channels.cache.find(ch => ch.name == 'ticket-claiming');

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
                    ticketClaimChannel.send({ embed: embed }).then(
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
            if(!guildChannel) return message.channel.send("Please mention the channel to close (this channel)");
            if(guildChannel.id == message.channel.id) {
                if(message.channel.name.includes('ticket-')) {
                    message.channel.delete().then(
                        message.member.send(":white_check_mark: | Successfully closed ticket.")
                    );
                } else {
                    message.channel.send("You are not in a ticket channel!");
                }
            } else {
                message.channel.send("Channels dont match!");
            }
        }


    }

})