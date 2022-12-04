import { ICategoryResponse } from '../../types/shared';

import { db } from '../../data/db';

module.exports = {
    Query: {
        categories: () => db.data.categories,
        category: (_: any, { id }: { id: number }) =>
            db.data.categories.find((c: ICategoryResponse) => c.id === id),
    },
    Mutation: {
        addCategory: async (
            _: any,
            { category }: { category: ICategoryResponse }
        ) => {
            const _data = { ...db.data };
            _data.categories.push(category);

            await db.write(_data);
            return category;
        },
    },
};
