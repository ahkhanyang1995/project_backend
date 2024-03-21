"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genNumber = void 0;
const genNumber = (length) => {
    let result = '';
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.genNumber = genNumber;
