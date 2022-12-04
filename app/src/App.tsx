import React, { useState } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from 'react-router-dom';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import { BookPage } from './components/Book/BookPage';
import { Books } from './components/Books/Books';
import { FetchExample } from './components/FetchExample/FetchExample';
import { Layout } from './components/Layout/Layout';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/*" element={<Layout />}>
            <Route path="books" element={<Books />} />
            <Route path="speed-test" element={<FetchExample />} />
            <Route path="book/:bookId" element={<BookPage />} />
            <Route path="*" element={<Navigate to="books" replace />} />
        </Route>
    )
);

export default function App() {
    return (
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    );
}
