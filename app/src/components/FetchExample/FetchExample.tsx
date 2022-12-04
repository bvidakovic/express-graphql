import React, { useState } from 'react';

import styles from './FetchExample.module.css';

export function FetchExample() {
    const [restTime, setRestTime] = useState(0);
    const [graphTime, setGraphTime] = useState(0);

    const handleRestFetch = async () => {
        const startTime = performance.now();
        const books = await (
            await fetch('http://localhost:4000/api/books')
        ).json();

        console.info('books: ', books);
        const authors = await Promise.all(
            books.map(async (b) => {
                return await (
                    await fetch(
                        `http://localhost:4000/api/author/${b.authorId}`
                    )
                ).json();
            })
        );

        console.info('authors: ', authors);
        const endTime = performance.now();
        setRestTime(Number((endTime - startTime).toFixed(2)));
    };

    const handleGraphFetch = async () => {
        const startTime = performance.now();
        const query = `
            query {
                books{
                    id
                    title
                    description
                    author {
                        firstName
                        lastName
                    }
                }
            }`;

        const booksRes = await (
            await fetch(
                `http://localhost:4000/graphql?query=${encodeURIComponent(
                    query
                )}`
            )
        ).json();

        console.info('books: ', booksRes.data.books);
        const endTime = performance.now();
        setGraphTime(Number((endTime - startTime).toFixed(2)));
    };

    return (
        <section className={styles.grid}>
            <div>
                <p className={styles.resultLabel}>Response time:</p>
                <p className={styles.restResult}>{restTime}</p>
                <button
                    className={styles.button}
                    onClick={handleRestFetch}
                    type="button"
                >
                    Fetch Rest
                </button>
            </div>
            <div>
                <p className={styles.resultLabel}>Response time:</p>
                <p className={styles.graphResult}>{graphTime}</p>

                <button
                    className={styles.button}
                    onClick={handleGraphFetch}
                    type="button"
                >
                    Fetch GraphQL
                </button>
            </div>
        </section>
    );
}
