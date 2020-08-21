module.exports = client => {
    console.log('Online!');
    const activities = [
        "Discord",
        "DISCORDO!",
        "dIsCoRd"
    ];
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities.length - 1) + 1);
        client.user.setActivity(activities[index]);
    }, 10000);
}