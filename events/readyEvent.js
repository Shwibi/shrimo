module.exports = client => {
    console.log('Online!');
    const activities = [
        "Discord",
        "DISCORDO!",
        "dIsCoRd",
        "Eat yourself!",
        "Make the world a better place",
        "Be nice",
        "Don't die",
        "*sizzling smell*",
        "WEEE WILL WEEE WILL ROCK YOUUU",
        "some legends are born, some turn to dust or to gold",
        "but you will remember me, remember me for centuries",
        "but just one mistake, is all it would take",
        "will go down in history, remember me for centuries",
        "HEEyeEyeyEyEyEyeyeyeyeyeeyEYEEEYY"
    ];
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities.length - 1));
        client.user.setActivity(activities[index]);
    }, 10000);

    
}