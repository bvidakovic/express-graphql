import React, { useState } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import { Home } from './components/Home';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Home />} />)
);

function App() {
    const [count, setCount] = useState(0);

    return (
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    );
}

export default App;
