const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const path = require('path');

const typeDefs = mergeTypeDefs(
    loadFilesSync(path.join(__dirname, './'), {
        extensions: ['graphql'],
    })
);

const resolvers = mergeResolvers(
    loadFilesSync(path.join(__dirname, './**/*.resolver.*'))
);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
