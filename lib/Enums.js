"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intents = void 0;
const discord_js_1 = require("discord.js");
exports.intents = [
    discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
    discord_js_1.Intents.FLAGS.GUILDS,
    discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
    discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
    discord_js_1.Intents.FLAGS.GUILD_PRESENCES,
    discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    discord_js_1.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    discord_js_1.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    discord_js_1.Intents.FLAGS.GUILD_BANS,
    discord_js_1.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    discord_js_1.Intents.FLAGS.GUILD_INTEGRATIONS,
    discord_js_1.Intents.FLAGS.GUILD_INVITES,
    discord_js_1.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES,
    discord_js_1.Intents.FLAGS.GUILD_WEBHOOKS,
];
