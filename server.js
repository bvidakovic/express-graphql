const express = require('express');
const { db } = require('./data/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./schema/index.js');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.get('/api/books', (_, res) => {
    res.send(db.data.books);
});

app.get('/api/authors', (_, res) => {
    res.send(db.data.authors);
});

app.get('/api/categories', (_, res) => {
    res.send(db.data.categories);
});

app.get('/api/book/:bookId', (req, res) => {
    const { bookId } = req.params;
    const book = db.data.books.find((b) => b.id.toString() === bookId);
    res.send(book);
});

app.get('/api/author/:authorId', (req, res) => {
    const { authorId } = req.params;
    const author = db.data.authors.find((a) => a.id.toString() === authorId);
    res.send(author);
});

app.get('/api/category/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    const category = db.data.category.find(
        (a) => a.id.toString() === categoryId
    );
    res.send(category);
});

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
