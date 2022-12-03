const { db } = require('../../data/db');

module.exports = {
    Query: {
        categories: () => db.data.categories,
        category: (parent, { id }) =>
            db.data.categories.find((p) => p.id.toString() === id),
    },
    Mutation: {
        addCategory: async (root, { category }) => {
            const _data = { ...db.data };
            _data.categories.push(category);

            await db.write(_data);
            return category;
        },
    },
};
