const { EasyClient, EasyCommand } = require("../lib/index");

const client = new EasyClient({
    token: 'your_token',
    guildId: 'your_guild',
    modules: [
        'moderation',
    ]
});

client.on('ready', async () => {
    const command = client.addCommand(new EasyCommand('ping', 'Ping Command'));

    command.on('use', async (response) => {
        await response.send('Pong!');
        await response.delay(1000);
        await response.send('Pong 2!?!');
    })

    await client.registerCommands();
})
