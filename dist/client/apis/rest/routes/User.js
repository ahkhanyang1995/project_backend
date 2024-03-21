"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const auth_1 = require("../../../../middlewares/auth");
const formidable_1 = __importDefault(require("@/service/formidable"));
const router = (0, express_1.Router)();
router.route('/user-login')
    .post(auth_1.userSignIn, userController_1.default.login);
router.route('/upload-image')
    .post(formidable_1.default);
exports.default = router;
