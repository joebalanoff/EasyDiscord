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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandModules = void 0;
const discord_js_1 = require("discord.js");
const events_1 = __importDefault(require("events"));
const EasyResponse_1 = __importDefault(require("./EasyResponse"));
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const Enums_1 = require("./Enums");
var CommandModules;
(function (CommandModules) {
    CommandModules["Moderation"] = "moderation";
    CommandModules["Music"] = "music";
})(CommandModules = exports.CommandModules || (exports.CommandModules = {}));
class EasyClient {
    constructor(options) {
        this.token = options.token;
        this.guildId = options.guildId;
        this.emitter = new events_1.default.EventEmitter();
        this.client = new discord_js_1.Client({ intents: Enums_1.intents });
        this.client.login(this.token).catch(e => console.error(e));
        this.client.on('ready', () => {
            this.emitter.emit('ready');
        });
        this.commands = [];
        if (options.modules === undefined)
            this.modules = [];
        else
            this.modules = options.modules;
        this.rest = new rest_1.REST({ version: '9' }).setToken(this.token);
        this.manageCommands();
    }
    manageCommands() {
        this.client.on('interactionCreate', (interaction) => __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isCommand())
                return;
            this.commands.forEach(command => {
                if (interaction.commandName == command.name) {
                    command.emitter.emit('use', new EasyResponse_1.default(interaction));
                }
            });
        }));
        this.client.on('messageCreate', (message) => __awaiter(this, void 0, void 0, function* () {
            if (this.modules.includes(CommandModules.Moderation)) {
                if (!message.content.startsWith('!'))
                    return;
                const args = message.content.split('!')[1].toLowerCase().split(' ');
                const command = args.shift();
                if (!command)
                    return;
                if (command == 'clear') {
                    console.log("CLEAR!");
                }
            }
        }));
    }
    addCommand(command) {
        if (this.commands.find(c => c.name == command.name))
            return null;
        this.commands.push(command);
        return command;
    }
    registerCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client.user == null)
                return;
            const commands = this.commands.map(c => {
                let data = c.getData();
                if (data.options.length == 0)
                    return { name: c.name, description: c.description };
                return c.getData();
            });
            try {
                yield this.rest.put(v9_1.Routes.applicationGuildCommands(this.client.user.id, this.guildId), {
                    body: commands
                });
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    on(event, listener) {
        this.emitter.on(event, listener);
    }
    enableModule(module) {
        if (this.modules.includes(module))
            return;
        this.modules.push(module);
    }
}
exports.default = EasyClient;
