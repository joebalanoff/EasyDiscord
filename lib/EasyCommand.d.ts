/// <reference types="node" />
import EasyResponse from './EasyResponse';
import events from 'events';
import EasyCommandOption from "./EasyCommandOption";
export interface CommandEvents {
    'use': (interaction: EasyResponse) => void;
}
export default class EasyCommand {
    name: string;
    description: string;
    options: EasyCommandOption[];
    emitter: events.EventEmitter;
    constructor(name: string, description: string, ...options: EasyCommandOption[]);
    getData(): {
        name: string;
        description: string;
        options: {
            name: string;
            description: string;
            type: string;
            required: boolean;
        }[];
    };
    on<K extends keyof CommandEvents>(event: K, listener: CommandEvents[K]): void;
}
