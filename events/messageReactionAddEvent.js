module.exports = async (client, reaction) => {
    const message = reaction.message;
    if(message.embeds) {
        message.embeds.forEach(embed => {
            if(embed.description.includes('<#') && embed.description.includes('>')) {
                const channel = embed.description.substr(embed.description.indexOf('#'), embed.description.indexOf('>'));
                // console.log(channel);
                if(reaction.emoji.name == '🎯') {
                    // console.log("Claim");
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
}