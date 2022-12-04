import classNames from 'classnames';
import React, { useState } from 'react';
import CountUp from 'react-countup';

import { IBook } from '../Book/BookPage';
import styles from './FetchExample.module.css';

export function FetchExample() {
    const [restTime, setRestTime] = useState(0);
    const [graphTime, setGraphTime] = useState(0);
    const [restLoaded, setRestLoaded] = useState(false);
    const [graphLoaded, setGraphLoaded] = useState(false);

    const applyColors = restLoaded && graphLoaded;

    const handleRestFetch = async () => {
        setRestLoaded(false);
        const startTime = performance.now();
        const books: (Omit<IBook, 'author' | 'category'> & {
            authorId: number;
            categoryId: number;
        })[] = await (await fetch('http://localhost:4000/api/books')).json();

        const authors = await Promise.all(
            books.map(async (b) => {
                return await (
                    await fetch(
                        `http://localhost:4000/api/author/${b.authorId}`
                    )
                ).json();
            })
        );

        const endTime = performance.now();
        setRestTime(endTime - startTime);

        const consoleData = books
            .slice(0, 5)
            .map(({ title, authorId, categoryId }) => ({
                title,
                authorId,
                categoryId,
            }));

        console.info('\n\n\n%cREST API book results', 'font-size: 30px');
        console.table(consoleData);

        console.info('\n\n\n%cREST API authors results', 'font-size: 30px');
        console.table(authors.slice(0, 5));
    };

    const handleGraphFetch = async () => {
        setGraphLoaded(false);
        const startTime = performance.now();
        const query = `
            query {
                books{
                    id
                    title
                    category {
                        name
                    }
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

        const endTime = performance.now();
        setGraphTime(endTime - startTime);

        const consoleData = (booksRes.data.books as IBook[])
            .slice(0, 5)
            .map(({ title, author, category }) => ({
                title,
                category: category.name,
                author: `${author.firstName} ${author.lastName}`,
            }));

        console.info('\n\n\n%cGraphQL results', 'font-size: 30px');
        console.table(consoleData, ['title', 'author', 'category']);
    };

    return (
        <section className={styles.section}>
            <div className={styles.grid}>
                <div>
                    <p className={styles.resultLabel}>
                        REST API <br />
                        response time:
                    </p>

                    <CountUp
                        end={restTime}
                        decimals={2}
                        duration={restTime * 0.05}
                        onEnd={() => setRestLoaded(true)}
                        suffix="ms"
                    >
                        {({ countUpRef }) => (
                            <span
                                ref={countUpRef}
                                className={classNames(
                                    styles.restResult,
                                    applyColors && styles.red
                                )}
                            />
                        )}
                    </CountUp>
                    <button
                        className={styles.button}
                        onClick={handleRestFetch}
                        type="button"
                    >
                        Fetch Rest
                    </button>
                </div>
                <div>
                    <p className={styles.resultLabel}>
                        GraphQL API <br />
                        response time:
                    </p>
                    <CountUp
                        end={graphTime}
                        decimals={2}
                        onEnd={() => setGraphLoaded(true)}
                        duration={graphTime * 0.05}
                        suffix="ms"
                    >
                        {({ countUpRef }) => (
                            <span
                                ref={countUpRef}
                                className={classNames(
                                    styles.graphResult,
                                    applyColors && styles.green
                                )}
                            />
                        )}
                    </CountUp>

                    <button
                        className={styles.button}
                        onClick={handleGraphFetch}
                        type="button"
                    >
                        Fetch GraphQL
                    </button>
                </div>
                <div>
                    <button
                        className={styles.buttonBoth}
                        onClick={() => {
                            handleGraphFetch();
                            handleRestFetch();
                        }}
                    >
                        Both
                    </button>
                </div>
            </div>
        </section>
    );
}
