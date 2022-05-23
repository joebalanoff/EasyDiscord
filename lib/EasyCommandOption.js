"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EasyCommandOption {
    constructor(name, description, type, required = true) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.required = required;
    }
    getData() {
        const { name, description, type, required } = this;
        return {
            name,
            description,
            type,
            required
        };
    }
}
exports.default = EasyCommandOption;
