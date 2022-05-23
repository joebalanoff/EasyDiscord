/// <reference types="node" />
import { Client } from 'discord.js';
import events from 'events';
import EasyCommand from "./EasyCommand";
import { REST } from '@discordjs/rest';
export declare enum CommandModules {
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
    private modules;
    rest: REST;
    constructor(options: ClientOptions);
    private manageCommands;
    addCommand(command: EasyCommand): EasyCommand | null;
    registerCommands(): Promise<void>;
    on<K extends keyof ClientEvents>(event: K, listener: ClientEvents[K]): void;
    enableModule(module: CommandModules): void;
}
