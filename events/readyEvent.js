module.exports = client => {
    console.log('Online!');
    const activities = [
        "s?help",
        "Discord | s?help",
        "*bounce bounce bounce* | s?help",
        "If your name is Joe, your name is Joe. Who's Joe?",
        "If you make a smoothie, you are a smooth criminal",
        "Be dead",
        "Don't be dead",
        `Woah ${client.guilds.cache.size} servers!`,
        `1 is more than 2`,
        `I can maths`,
        `Stay inside`,
        `Don't be a person who's not a person`,
        `REEEEEEEEEEEEEEEEEE`,
        `Weeeeeeeeeeeeeeeeeeeeeeeeeeeeee`,
        `I love you <3`,
        `Are you a toaster? Because I wanna forcefully insert 2 breads inide of your holes and burn you.`,
        `Are you a magnet? Because all the metal junk seems to be attracted to you.`,
        `DUDE DID YOU SEE? YOU'RE AN IDIOT! (not really, forgive meh)`,
        `Some stars burn out and die, some stars burn out and die with *p a s s i o n*`,
        `SPACE DUSTTTT`,
        `Hi, thanks for checking in im still a piece of GARABAAAGAEGAE`,
        `The Sun is a Deadly Laser`,
        `${client.channels.cache.size} is a lot of channels.`,
        `Are you my homework? Because I don't wanna do you.`,
        `Discord is good.`
    ];
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities.length - 1));
        client.user.setActivity(activities[index]);
    }, 30000);

    
}