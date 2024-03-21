"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _App_app, _App_httpServer, _App_cors, _App_Mongo, _App_jsonParser, _App_urlencodedParser, _App_dotenv, _App_port, _App_expressHandlebars;
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const module_alias_1 = __importDefault(require("module-alias"));
dotenv_1.default.config({ path: '.env' });
const isProd = process.env.IS_PRODUCTION === 'production' && true;
if (isProd) {
    module_alias_1.default.addAliases({
        "@": path_1.default.join(__dirname, '/../dist')
    });
}
else {
    module_alias_1.default.addAliases({
        "@": path_1.default.join(__dirname, '/../src')
    });
}
const cors_1 = __importDefault(require("cors"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const passport_1 = __importDefault(require("./plugins/passport"));
const mongoose_1 = __importDefault(require("./plugins/mongoose"));
const auth_clear_tmp_1 = require("@/service/auth-clear-tmp");
auth_clear_tmp_1.authClearTmp.start();
// expected output: "The word "fox" is in the sentence"
class App {
    //  #corsOptions!: any
    constructor() {
        _App_app.set(this, void 0);
        _App_httpServer.set(this, void 0);
        _App_cors.set(this, void 0);
        _App_Mongo.set(this, void 0);
        _App_jsonParser.set(this, void 0);
        _App_urlencodedParser.set(this, void 0);
        _App_dotenv.set(this, void 0);
        _App_port.set(this, void 0);
        _App_expressHandlebars.set(this, void 0);
        this.initialize();
        this.createApp();
        this.middleware();
        this.createPage();
        this.createRouter();
        this.createServer();
        this.listen();
    }
    initialize() {
        __classPrivateFieldSet(this, _App_app, (0, express_1.default)(), "f");
        __classPrivateFieldSet(this, _App_cors, cors_1.default, "f");
        __classPrivateFieldSet(this, _App_Mongo, new mongoose_1.default(), "f");
        __classPrivateFieldSet(this, _App_jsonParser, body_parser_1.default.json({ limit: '50mb' }), "f");
        __classPrivateFieldSet(this, _App_urlencodedParser, body_parser_1.default.urlencoded({ limit: '50mb', extended: false }), "f");
        __classPrivateFieldSet(this, _App_dotenv, dotenv_1.default, "f");
        __classPrivateFieldSet(this, _App_port, App.PORT, "f");
        __classPrivateFieldSet(this, _App_expressHandlebars, express_handlebars_1.default, "f");
    }
    createApp() {
        __classPrivateFieldGet(this, _App_dotenv, "f").config({ path: '.env' });
        __classPrivateFieldGet(this, _App_Mongo, "f").connect();
    }
    middleware() {
        __classPrivateFieldGet(this, _App_app, "f").use(__classPrivateFieldGet(this, _App_cors, "f").call(this));
        __classPrivateFieldGet(this, _App_app, "f").use(__classPrivateFieldGet(this, _App_jsonParser, "f"));
        __classPrivateFieldGet(this, _App_app, "f").use(__classPrivateFieldGet(this, _App_urlencodedParser, "f"));
        //  this.#app.use(express.static('tmp'))
        //ເປີດ public ຮູບ​ ຫຼື ໜ້າບ້ານຖ້າ build ມາເປັນ project ດຽວ
        __classPrivateFieldGet(this, _App_app, "f").use(express_1.default.static('public'));
        __classPrivateFieldGet(this, _App_app, "f").use(express_1.default.static('public/main'));
        __classPrivateFieldGet(this, _App_app, "f").engine('handlebars', __classPrivateFieldGet(this, _App_expressHandlebars, "f").call(this));
        __classPrivateFieldGet(this, _App_app, "f").set('view engine', 'handlebars');
        __classPrivateFieldGet(this, _App_app, "f").use(passport_1.default.initialize());
    }
    createPage() {
        __classPrivateFieldGet(this, _App_app, "f").get('/admin-login', (req, res) => {
            res.render('admin-login', { layout: false });
        });
    }
    createRouter() {
        const routePath = __dirname + '/client/apis/rest/routes/';
        fs_1.default.readdirSync(routePath).map((file) => {
            const route = './client/apis/rest/routes/' + file;
            __classPrivateFieldGet(this, _App_app, "f").use('/client-api', require(route).default);
        });
        const routePaths = __dirname + '/admin/apis/rest/routes/';
        fs_1.default.readdirSync(routePaths).map((file) => {
            const route = './admin/apis/rest/routes/' + file;
            __classPrivateFieldGet(this, _App_app, "f").use('/admin-api', require(route).default);
        });
        //qhov no yog hais tias thaum yus tsis muaj view ce yus ua li no
        __classPrivateFieldGet(this, _App_app, "f").get('*', (req, res) => {
            res.status(404).json('404, Sorry, We do not allow you');
        });
        __classPrivateFieldSet(this, _App_httpServer, http_1.default.createServer(__classPrivateFieldGet(this, _App_app, "f")), "f");
        // this.#app.get('*', (req: Request, res: Response) => {
        //     res.status(404).json(404)
        // })
    }
    createServer() {
        __classPrivateFieldSet(this, _App_httpServer, http_1.default.createServer(__classPrivateFieldGet(this, _App_app, "f")), "f");
    }
    listen() {
        __classPrivateFieldGet(this, _App_httpServer, "f").listen(__classPrivateFieldGet(this, _App_port, "f"), () => {
            console.log('Server is runing at port: ' + __classPrivateFieldGet(this, _App_port, "f"));
        });
    }
}
_App_app = new WeakMap(), _App_httpServer = new WeakMap(), _App_cors = new WeakMap(), _App_Mongo = new WeakMap(), _App_jsonParser = new WeakMap(), _App_urlencodedParser = new WeakMap(), _App_dotenv = new WeakMap(), _App_port = new WeakMap(), _App_expressHandlebars = new WeakMap();
App.PORT = process.env.PORT || 3000;
// tslint:disable-next-line:no-unused-expression
new App();
