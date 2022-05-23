"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
class EasyCommand {
    constructor(name, description, ...options) {
        this.name = name;
        this.description = description;
        this.options = options;
        this.emitter = new events_1.default.EventEmitter();
    }
    getData() {
        const { name, description, options } = this;
        return {
            name,
            description,
            options: options.map(o => o.getData())
        };
    }
    on(event, listener) {
        this.emitter.on(event, listener);
    }
}
exports.default = EasyCommand;
