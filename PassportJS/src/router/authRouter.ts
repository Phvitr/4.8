import express from 'express';
const router = express.Router();
import passport from '../middleware/passport';
import multer from 'multer';


const upload= multer();

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", upload.none(), (req, res, next) => {
    console.log(req.body)
    passport.authenticate("local", (err, user) => {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.send("wrong username or password");
        }
        req.logIn(user, () => {
            res.send("authenticated");
        })
    })(req, res, next);
})

export default router;