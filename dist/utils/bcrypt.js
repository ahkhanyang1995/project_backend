"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.genHash = void 0;
const bcrypt_1 = require("bcrypt");
const genHash = (plainTextPassword) => {
    return (0, bcrypt_1.hashSync)(plainTextPassword, 10);
};
exports.genHash = genHash;
const compareHash = (plainTextPassword, HashedPassword) => {
    return (0, bcrypt_1.compareSync)(plainTextPassword, HashedPassword);
};
exports.compareHash = compareHash;
