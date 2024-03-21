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
const formidable_1 = require("formidable");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const uploadImage = (req, res) => {
    try {
        const form = new formidable_1.IncomingForm();
        form.encoding = 'utf-8';
        form.keepExtensions = true;
        form.multiples = false;
        form.maxFileSize = 5 * 1024 * 1024;
        form.maxFieldsSize = 1;
        let myFile = {};
        form.on('progress', (bytesReceived, bytesExpected) => { });
        form.on('field', (name, field) => { });
        form.on('fileBegin', (name, file) => {
            const fileType = file.type.split('/').pop();
            const fileName = (0, uuid_1.v4)() + '.' + fileType;
            // tslint:disable-next-line:prefer-switch
            if (fileType.toLowerCase() === 'jpg' || fileType.toLowerCase() === 'png' || fileType.toLowerCase() === 'jpeg') {
                if (!fs_1.default.existsSync('public'))
                    fs_1.default.mkdirSync('public');
                if (!fs_1.default.existsSync('tmp'))
                    fs_1.default.mkdirSync('tmp');
                if (!fs_1.default.existsSync('public/images'))
                    fs_1.default.mkdirSync('public/images');
                const path = 'tmp/' + fileName;
                file.path = path;
                file.name = fileName;
            }
            else {
                return res.status(400).end({ message: 'file type not matching' });
            }
        });
        form.on('file', (name, file) => __awaiter(void 0, void 0, void 0, function* () {
            const originalPath = 'tmp/' + file.name;
            const mimeTypeAsJpeg = file.name.split('.')[0] + '.jpeg';
            const resizePath = 'public/images/' + mimeTypeAsJpeg;
            // const awsPath = 'images/' + mimeTypeAsJpeg
            yield (0, sharp_1.default)(originalPath)
                .toFormat('jpeg')
                .jpeg({ quality: 20, force: true })
                .toFile(resizePath);
            // const data: any = await uploadFileToS3(resizePath, awsPath)
            // if (data) {
            //   myFile = {
            //     link: data.Key,
            //     src: data.Location,
            //   }
            // } else {
            //   myFile = null
            // }
            return res.status(201).json({
                // name: mimeTypeAsJpeg,
                link: 'images/' + mimeTypeAsJpeg,
                // src: process.env.SERVER_NAME + 'images/' + mimeTypeAsJpeg,
            });
        }));
        form.on('aborted', () => {
            return res.status(400).json({ message: 'Request aborted by the user' });
        });
        form.on('error', (e) => {
            // console.error(e)
            return res.status(400).json(e);
        });
        // form.on('end', () => {
        //     return res.status(201).json(
        //         myFile ?  { file: myFile } : { message: 'No file eiei' }
        //     )
        // })
        form.parse(req);
    }
    catch (e) {
        res.send(e);
    }
};
exports.default = uploadImage;
