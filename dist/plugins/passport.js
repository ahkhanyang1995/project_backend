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
exports.isUser = exports.isAdmin = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const passport_local_1 = require("passport-local");
const Users_1 = __importDefault(require("../models/Users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
const secret = process.env.JWT_SECRET || 'khueher2020';
// used to serialize the user for the session
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
// used to deserialize the user
passport_1.default.deserializeUser((_id, done) => {
    Users_1.default.findById(_id, (err, user) => {
        done(err, user);
    });
});
passport_1.default.use('isAdmin', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.default.findOne({ _id: payload.userId, role: 'Admin' }); // Find the user specified in token
        if (!user) { // If user doesn't exists, handle it
            return done(null, false);
        }
        done(null, user); // Otherwise, return the user
    }
    catch (err) {
        done(err, false);
    }
})));
passport_1.default.use('isUser', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.default.findOne({ _id: payload.userId, role: 'user' }); // Find the user specified in token
        if (!user) { // If user doesn't exists, handle it
            return done(null, false);
        }
        done(null, user); // Otherwise, return the user
    }
    catch (err) {
        done(err, false);
    }
})));
passport_1.default.use('adminSignIn', new passport_local_1.Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.default.findOne({ email });
        if (user && user.role !== 'Admin') {
            return done(null, false, { message: 'You are user can not login to admin!' });
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect email' });
        }
        const passwordMatch = bcrypt_1.default.compareSync(password, user.password);
        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }
        done(null, user);
    }
    catch (e) {
        done(e, false);
    }
})));
passport_1.default.use('userSignIn', new passport_local_1.Strategy({
    usernameField: 'mobile',
    passwordField: 'password',
}, (mobile, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.default.findOne({ mobile });
        if (user && user.role !== 'user') {
            return done(null, false, { message: 'You are not a user' });
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect mobile' });
        }
        const passwordMatch = bcrypt_1.default.compareSync(password, user.password);
        if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }
        done(null, user);
    }
    catch (e) {
        done(e, false);
    }
})));
exports.isAdmin = passport_1.default.authenticate('isAdmin', { session: false });
exports.isUser = passport_1.default.authenticate('isUser', { session: false });
exports.default = passport_1.default;
