import { ApplicationCommandOptionType } from 'discord.js';
export default class EasyCommandOption {
    name: string;
    description: string;
    required: boolean;
    type: ApplicationCommandOptionType;
    constructor(name: string, description: string, type: ApplicationCommandOptionType, required?: boolean);
    getData(): {
        name: string;
        description: string;
        type: string;
        required: boolean;
    };
}
