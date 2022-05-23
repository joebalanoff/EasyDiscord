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

    constructor(name: string, description: string, ...options: EasyCommandOption[]){
        this.name = name;
        this.description = description;
        this.options = options;

        this.emitter = new events.EventEmitter();
    }

    getData() : {
        name: string,
        description: string,
        options: {
            name: string,
            description: string,
            type: string,
            required: boolean
        }[]
    } {
        const { name, description, options } = this;
        return {
            name,
            description,
            options: options.map(o => o.getData())
        };
    }

    on<K extends keyof CommandEvents>(event: K, listener: CommandEvents[K]){
        this.emitter.on(event, listener);
    }
}
