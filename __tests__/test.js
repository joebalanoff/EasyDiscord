const { EasyClient, EasyCommand } = require("../lib/index");

const client = new EasyClient({
    token: 'OTE4MzU2MTMxNDk4MzE1Nzg2.GCEB9z.cKCm94yfJH2pbTc1FLzPHd5ZFjcmkbsigeOwlE',
    guildId: '961333549133340732',
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