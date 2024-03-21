"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginToken = exports.signVerificationCodeToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'khueher2020';
const signToken = (user) => {
    return jsonwebtoken_1.default.sign({
        userId: user._id
    }, secret, { expiresIn: '30d' }); // secret key
};
exports.signToken = signToken;
const signVerificationCodeToken = (EmpID, verifyCode) => {
    return jsonwebtoken_1.default.sign({
        EmpID,
        verifyCode
    }, secret, { expiresIn: '90d' });
};
exports.signVerificationCodeToken = signVerificationCodeToken;
const loginToken = (userId) => {
    return jsonwebtoken_1.default.sign({
        userId
    }, secret, { expiresIn: '365d' });
};
exports.loginToken = loginToken;
