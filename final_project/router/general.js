const express = require('express');
const axios = require('axios'); // Import Axios for making HTTP requests
const books = require("./booksdb.js");
const public_users = express.Router();

// Promisified function to get the list of books available in the shop
const getBooks = () => {
    return new Promise((resolve, reject) => {
        // Simulating asynchronous behavior with a setTimeout
        setTimeout(() => {
            resolve(books);
        }, 1000); // Delay of 1 second
    });
};

// Promisified function to get book details based on ISBN
const getBookByISBN = (isbn) => {
    return new Promise((resolve, reject) => {
        // Simulating asynchronous behavior with a setTimeout
        setTimeout(() => {
            const book = books[isbn];
            if (book) {
                resolve(book);
            } else {
                reject({ message: "Book not found" });
            }
        }, 1000); // Delay of 1 second
    });
};

// Promisified function to get book details based on author
const getBooksByAuthor = (author) => {
    return new Promise((resolve, reject) => {
        // Simulating asynchronous behavior with a setTimeout
        setTimeout(() => {
            const matchingBooks = Object.values(books).filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
            resolve(matchingBooks);
        }, 1000); // Delay of 1 second
    });
};

// Promisified function to get all books based on title
const getBooksByTitle = (title) => {
    return new Promise((resolve, reject) => {
        // Simulating asynchronous behavior with a setTimeout
        setTimeout(() => {
            const matchingBooks = Object.values(books).filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
            resolve(matchingBooks);
        }, 1000); // Delay of 1 second
    });
};

// Get the book list available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('https://fnurameshtej-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get book details based on ISBN using async-await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    try {
        const response = await axios.get(`https://fnurameshtej-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/${isbn}`);
        res.json(response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: "Book not found" });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});

// Get book details based on author using async-await with Axios
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;
    try {
        const response = await axios.get(`https://fnurameshtej-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/${author}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all books based on title using async-await with Axios
public_users.get('/title/:title', async function (req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get(`https://fnurameshtej-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/${title}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get book reviews (remains the same)
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
        res.json(book.reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
