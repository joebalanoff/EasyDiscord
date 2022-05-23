"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class EasyResponse {
    constructor(interaction) {
        this.interaction = interaction;
        this.responded = false;
    }
    send(message, title = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.MessageEmbed().setDescription(message).setColor('#66c0dd');
            if (title != '')
                embed.setTitle(title);
            yield this.sendEmbed(embed);
        });
    }
    sendEmbed(embed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.responded) {
                yield this.reply(embed);
                this.responded = true;
                return;
            }
            yield this.interaction.followUp({
                embeds: [embed]
            });
        });
    }
    reply(embed) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.interaction.reply({
                embeds: [embed]
            });
        });
    }
    delay(time) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, time));
        });
    }
}
exports.default = EasyResponse;
