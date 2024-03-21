"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const auth_1 = require("../../../../middlewares/auth");
const UserValidator_1 = require("@/admin/Validator/UserValidator");
const router = (0, express_1.Router)();
router.route('/admin-login')
    .post(UserValidator_1.logins, auth_1.adminSignIn, userController_1.default.login);
exports.default = router;
