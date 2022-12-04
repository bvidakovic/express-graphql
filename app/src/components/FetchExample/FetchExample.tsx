import classNames from 'classnames';
import React, { useState } from 'react';
import CountUp from 'react-countup';

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
        setGraphLoaded(false);
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
        <section className={styles.section}>
            <div className={styles.grid}>
                <div>
                    <p className={styles.resultLabel}>Response time:</p>
                    {/* <p className={styles.restResult}>{restTime}</p> */}
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
                    <p className={styles.resultLabel}>Response time:</p>
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
