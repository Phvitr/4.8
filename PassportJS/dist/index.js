"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const authRouter_1 = __importDefault(require("./src/router/authRouter"));
const PORT = 3000;
const app = (0, express_1.default)();
const DB_URL = 'mongodb://127.0.0.1:27017/dbtest';
mongoose_1.default.connect(DB_URL)
    .then(() => console.log('connection established'))
    .catch(error => console.log('connection error: ' + error.message));
app.set('view engine', 'ejs');
app.set('views', "./src/views");
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/auth", authRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/auth/login`);
});
//# sourceMappingURL=index.js.map