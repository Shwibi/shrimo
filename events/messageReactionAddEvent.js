module.exports = async (client, reaction, user) => {
    if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
    }
    
    console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`)

    if(reaction.message.embeds) {
        console.log('Yes');
        await reaction.message.embeds.forEach(embed => {
            console.log('yes'); 
            if(embed.description.includes('<#') && embed.description.includes('>')) {
                const channel = embed.description.substr(embed.description.indexOf('#'), embed.description.indexOf('>'));
                // console.log(channel);
                if(reaction.emoji.name == '🎯') {
                    // console.log("Claim");
                    const channelId = channel.substr(1, 18);
                    const ticketChannel = reaction.message.guild.channels.cache.find(ch => ch.id == channelId);
                    if(!ticketChannel) return reaction.message.channel.send("No ticket found...");
                    // reaction.users.cache.forEach(usert => {
                    //     if(usert.bot) {

                    //     } else {
                    //         ticketChannel.updateOverwrite(usert, {
                    //             VIEW_CHANNEL: true
                    //         }).then(
                    //             ticketChannel.send(`<@${usert.id}> has been assigned to assist you!`)
                    //         ).then(
                    //             reaction.remove(usert)
                    //         )
                    //     }
                        
                    // })
                    if(user.bot) {

                    } else {
                        ticketChannel.updateOverwrite(user, {
                            VIEW_CHANNEL: true,
                            SEND_MESSAGES: true
                        }).then(
                            ticketChannel.send(`<@${user.id}> has been assigned to assist you!`)
                        ).then(
                            reaction.remove(user)
                        )
                    }
                    
                } else {
                    console.log("Not claim");
                }
            }

        })
    }
		
    
    
}