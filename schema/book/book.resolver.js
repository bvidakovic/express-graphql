const { db } = require('../../data/db');

module.exports = {
    Query: {
        books: () =>
            db.data.books.map((b) => ({
                ...b,
                author: db.data.authors.find((a) => a.id === b.authorId),
                category: db.data.categories.find((a) => a.id === b.categoryId),
            })),
        book: (_, { id }) => {
            const book = db.data.books.find((p) => p.id === id);

            return {
                ...book,
                author: db.data.authors.find((a) => a.id === book.authorId),
                category: db.data.categories.find(
                    (a) => a.id === book.categoryId
                ),
            };
        },
    },
    Mutation: {
        addBook: async (_, { book }) => {
            const _data = { ...db.data };
            _data.books.push(book);

            await db.write(_data);
            return book;
        },
    },
};
