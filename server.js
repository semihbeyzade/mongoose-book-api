import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

import {Book} from "./models/Book.js";

const {DB_URL, DB_PORT, DB_NAME, PORT} = process.env

mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`)

const app = express();

app.get('/', (req,res) => {
    res.send(`<h1>Book API</h1>`)
});

app.post('/book', (req,res) => {
    res.status(200).json({
        "message": "book created"
    })
});

app.listen(PORT, () => {
    console.log(`listening on port`, PORT);
})