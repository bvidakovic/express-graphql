import {
    IAuthorResponse,
    IBookResponse,
    ICategoryResponse,
} from '../../types/shared';

import { db } from '../../data/db';

module.exports = {
    Query: {
        books: () =>
            db.data.books.map((b: IBookResponse) => ({
                ...b,
                author: db.data.authors.find(
                    (a: IAuthorResponse) => a.id === b.authorId
                ),
                category: db.data.categories.find(
                    (c: ICategoryResponse) => c.id === b.categoryId
                ),
            })),
        book: (_: any, { id }: { id: number }) => {
            const book: IBookResponse | undefined = db.data.books.find(
                (b: IBookResponse) => b.id === id
            );

            if (!book) return null;

            return {
                ...book,
                author: db.data.authors.find(
                    (a: IAuthorResponse) => a.id === book.authorId
                ),
                category: db.data.categories.find(
                    (c: ICategoryResponse) => c.id === book.categoryId
                ),
            };
        },
    },
    Mutation: {
        addBook: async (_: any, { book }: { book: IBookResponse }) => {
            const _data = { ...db.data };
            _data.books.push(book);

            await db.write(_data);
            return book;
        },
    },
};
