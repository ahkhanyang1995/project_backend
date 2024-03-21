"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authClearTmp = void 0;
const cron_1 = require("cron");
const fs_1 = __importDefault(require("fs"));
exports.authClearTmp = new cron_1.CronJob('00 00 00 * * *', () => {
    if (fs_1.default.existsSync('./tmp')) {
        fs_1.default.readdir('./tmp', (err, files) => {
            if (err)
                throw err;
            for (const file of files) {
                fs_1.default.unlinkSync('./tmp/' + file);
            }
        });
    }
}, null, true, 'Asia/Bangkok');
