const mongodb = require('mongodb');

const mongoURI = "mongodb+srv://abhiram201196:/Shek22652271@almabetter.6zo2l.mongodb.net/?retryWrites=true&w=majority&appName=AlmaBetter"

let mongoose = require('mongoose');
const { bookMovieSchema } = require('./schema')


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
let collection_connection = mongoose.model('bookmovietickets', bookMovieSchema)


exports.connection = collection_connection;
