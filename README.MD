# GETA GraphQL project example

### Starting server

In project root run command

```
yarn start
```

This command will start nodeJS server on localhost:4000
It will expose graphql playground on

[localhost:4000/graphql](http://localhost:4000/graphql)

and REST API:

```
/api/books
/api/book/:bookId

/api/authors
/api/author/:authorId

/api/categories
/api/category/:categoryId
```

### Starting client app

Run command inside app folder

```
yarn dev
```

It will start client app on

[localhost:3000](http://localhost:3000)
