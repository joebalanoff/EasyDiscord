/// <reference types="node" />
import { CommandInteraction, MessageEmbed } from 'discord.js';
export default class EasyResponse {
    interaction: CommandInteraction;
    responded: boolean;
    constructor(interaction: CommandInteraction);
    send(message: string, title?: string): Promise<void>;
    sendEmbed(embed: MessageEmbed): Promise<void>;
    reply(embed: MessageEmbed): Promise<void>;
    delay(time: number): Promise<NodeJS.Timeout>;
}
