import { CommandInteraction, MessageEmbed } from 'discord.js';

export default class EasyResponse {
    interaction: CommandInteraction;
    responded: boolean;

    constructor(interaction: CommandInteraction) {
        this.interaction = interaction;
        this.responded = false;
    }

    async send(message: string, title: string = '') {
        const embed = new MessageEmbed().setDescription(message).setColor('#66c0dd');
        if(title != '') embed.setTitle(title);
        await this.sendEmbed(embed);
    }

    async sendEmbed(embed: MessageEmbed){
        if(!this.responded){
            await this.reply(embed);
            this.responded = true;
            return;
        }
        await this.interaction.followUp({
            embeds: [embed]
        });
    }

    async reply(embed: MessageEmbed) {
        await this.interaction.reply({
            embeds: [embed]
        });
    }

    async delay(time: number) : Promise<NodeJS.Timeout> {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}