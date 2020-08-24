module.exports = client => {
    console.log('Online!');
    const activities = [
        "s?help",
        "Discord | s?help",
        "*bounce bounce bounce* | s?help"
    ];
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities.length - 1));
        client.user.setActivity(activities[index]);
    }, 10000);

    
}