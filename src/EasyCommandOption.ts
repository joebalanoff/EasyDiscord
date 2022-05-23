import { ApplicationCommandOptionType } from 'discord.js';

export default class EasyCommandOption {
    name: string;
    description: string;
    required: boolean;
    type: ApplicationCommandOptionType;

    constructor(name: string, description: string, type: ApplicationCommandOptionType, required: boolean = true) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.required = required;
    }

    getData() : { name: string, description: string, type: string, required: boolean } {
        const { name, description, type, required } = this;
        return {
            name,
            description,
            type,
            required
        };
    }
}