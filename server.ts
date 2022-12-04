import express from 'express';
import { db } from './data/db';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
import { Request, Response, NextFunction } from 'express';
import {
    IAuthorResponse,
    IBookResponse,
    ICategoryResponse,
} from './types/shared';

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

app.get('/api/books', (_: Request, res: Response) => {
    res.send(db.data.books);
});

app.get('/api/authors', (_: Request, res: Response) => {
    res.send(db.data.authors);
});

app.get('/api/categories', (_: Request, res: Response) => {
    res.send(db.data.categories);
});

app.get('/api/book/:bookId', (req: Request, res: Response) => {
    const { bookId } = req.params;
    const book = db.data.books.find(
        (b: IBookResponse) => b.id.toString() === bookId
    );
    res.send(book);
});

app.get('/api/author/:authorId', (req: Request, res: Response) => {
    const { authorId } = req.params;
    const author = db.data.authors.find(
        (a: IAuthorResponse) => a.id.toString() === authorId
    );
    res.send(author);
});

app.get('/api/category/:categoryId', (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const category = db.data.categories.find(
        (c: ICategoryResponse) => c.id.toString() === categoryId
    );
    res.send(category);
});

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
