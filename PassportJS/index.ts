import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import authRouter from "./src/router/authRouter"

const PORT = 3000;
const app = express();

const DB_URL = 'mongodb://127.0.0.1:27017/dbtest';
mongoose.connect(DB_URL)
.then(() =>
    console.log('connection established'))
.catch(error =>
        console.log('connection error: ' + error.message));

app.set('view engine', 'ejs');
app.set('views', "./src/views");
app.use(bodyParser.json());

app.use(session ({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60*60
        }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter)



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/auth/login`);
})