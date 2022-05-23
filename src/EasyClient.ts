import { Client } from 'discord.js';
import events from 'events';

import EasyCommand from "./EasyCommand";
import EasyResponse from "./EasyResponse";

import { REST } from '@discordjs/rest';
import { Routes }  from 'discord-api-types/v9';
import {intents} from "./Enums";

export enum CommandModules {
    Moderation = "moderation",
    Music = "music"
}

export interface ClientEvents {
    'ready': (client: Client) => void;
}

export interface ClientOptions {
    token: string;
    guildId: string;

    modules?: CommandModules[] | string[];
}

export default class EasyClient {
    token: string;
    guildId: string;
    emitter: events.EventEmitter;

    client: Client;
    commands: EasyCommand[];
    private modules: string[];

    rest: REST;

    constructor(options: ClientOptions) {
        this.token = options.token;
        this.guildId = options.guildId;

        this.emitter = new events.EventEmitter();

        this.client = new Client({ intents });
        this.client.login(this.token).catch(e => console.error(e));
        this.client.on('ready', () => {
            this.emitter.emit('ready');
        })

        this.commands = [];

        if(options.modules === undefined) this.modules = [];
        else this.modules = options.modules;

        this.rest = new REST({ version: '9' }).setToken(this.token);

        this.manageCommands();
    }

    private manageCommands() {
        this.client.on('interactionCreate', async (interaction) => {
            if(!interaction.isCommand()) return;
            this.commands.forEach(command => {
                if(interaction.commandName == command.name){
                    command.emitter.emit('use', new EasyResponse(interaction));
                }
            })
        })

        this.client.on('messageCreate', async (message) => {
            if(this.modules.includes(CommandModules.Moderation)){
                if(message.channel.type != 'GUILD_TEXT') return;
                if(!message.member?.permissionsIn(message.channel).has("ADMINISTRATOR")) return;

                if(!message.content.startsWith('!')) return;
                const args = message.content.split('!')[1].toLowerCase().split(' ');
                const command = args.shift();
                if(!command) return;

                if(command == 'ban'){
                    console.log("CLEAR!")
                } else if (command == 'tempban'){

                } else if (command == 'mute') {

                } else if (command == 'tempmute') {

                } else if (command == 'unmute') {

                } else if (command == 'slowmode') {

                } else if (command == 'kick') {

                } else if (command == 'infractions') {

                } else if (command == 'warn') {

                } else if (command == 'clear') {
                    
                }
            }
        })
    }

    addCommand(command: EasyCommand) : EasyCommand | null {
        if(this.commands.find(c => c.name == command.name)) return null;
        this.commands.push(command);
        return command;
    }

    async registerCommands() {
        if(this.client.user == null) return;
        const commands = this.commands.map(c => {
            let data = c.getData();
            if(data.options.length == 0) return { name: c.name, description: c.description };
            return c.getData();
        });

        try {
            await this.rest.put(
                Routes.applicationGuildCommands(this.client.user.id, this.guildId), {
                    body: commands
                }
            )
        } catch (e) {
            console.error(e);
        }
    }

    on<K extends keyof ClientEvents>(event: K, listener: ClientEvents[K]){
        this.emitter.on(event, listener);
    }

    enableModule(module: CommandModules){
        if(this.modules.includes(module)) return;
        this.modules.push(module);
    }
}