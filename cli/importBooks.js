import mongoose from "mongoose";
import axios from "axios";
import { Book } from "../models/Book.js";
import * as dotenv from 'dotenv';
dotenv.config();



const {DB_URL, DB_PORT, DB_NAME, PORT} = process.env

mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`)

console.log('connected to mongo');
const url = 'https://edwardtanguay.netlify.app/share/books.json';

const books = (await axios.get(url)).data;
console.log(books);

for (const rawBook of books) {

    const book = new Book({
      title: rawBook.title,
      description: rawBook.description,
      numberOfPages: rawBook.totalpages,
      language: rawBook.language,
      imageUrl: `http://edwardtanguay.netlify.app/share/images/book/${rawBook.idcode}.png`,
      buyUrl: rawBook.buyurl
    });
    
    const ret = await book.save();
    console.log('created book: ' + ret.title);

}


process.exit(1);