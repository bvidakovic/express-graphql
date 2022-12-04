import { db } from '../../data/db';
import { IAuthorResponse, ICategoryResponse } from '../../types/shared';

module.exports = {
    Query: {
        authors: () => db.data.authors,
        author: (_: any, { id }: { id: number }) =>
            db.data.authors.find((a: IAuthorResponse) => a.id === id),
    },
    Mutation: {
        addAuthor: async (_: any, { author }: { author: IAuthorResponse }) => {
            const _data = { ...db.data };
            _data.authors.push(author);

            await db.write(_data);
            return author;
        },
    },
};
