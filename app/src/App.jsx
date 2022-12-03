import { useState } from 'react';
import { Home } from './components/Home';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

function App() {
    const [count, setCount] = useState(0);

    return (
        <ApolloProvider client={client}>
            <Home />
        </ApolloProvider>
    );
}

export default App;
