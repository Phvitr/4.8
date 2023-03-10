"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("../middleware/passport"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
router.get("/login", (req, res) => {
    res.render("login");
});
router.post("/login", upload.none(), (req, res, next) => {
    console.log(req.body);
    passport_1.default.authenticate("local", (err, user) => {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.send("wrong username or password");
        }
        req.logIn(user, () => {
            res.send("authenticated");
        });
    })(req, res, next);
});
exports.default = router;
//# sourceMappingURL=authRouter.js.map