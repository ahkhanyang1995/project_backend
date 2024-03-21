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
exports.userSignIn = exports.adminSignIn = void 0;
const passport_1 = require("passport");
const adminSignIn = (req, res, next) => {
    (0, passport_1.authenticate)('adminSignIn', { session: false }, (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return next(err);
        if (!user) {
            if (info.message === 'You are user can not login to admin!')
                return res.status(401).json({ message: info.message });
            if (info.message === 'Incorrect email')
                return res.status(401).json({ message: info.message });
            else if (info.message === 'Incorrect password')
                return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err)
                return next(err);
            next();
        });
    }))(req, res, next);
};
exports.adminSignIn = adminSignIn;
const userSignIn = (req, res, next) => {
    (0, passport_1.authenticate)('userSignIn', { session: false }, (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return next(err);
        //console.log(user)
        if (!user) {
            if (info.message === 'You are not a user')
                return res.status(401).json({ message: info.message });
            if (info.message === 'Incorrect mobile')
                return res.status(401).json({ message: info.message });
            else if (info.message === 'Incorrect password')
                return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err)
                return next(err);
            next();
        });
    }))(req, res, next);
};
exports.userSignIn = userSignIn;
