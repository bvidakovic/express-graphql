import React from 'react';

import { useQuery, gql } from '@apollo/client';

import { BookCard, BOOK_CARD_FRAGMENT, IBookCardProps } from '../Book/BookCard';
import styles from './Books.module.css';

const BOOKS_QUERY = gql`
    query GetBooks {
        books {
            ...BookCard
        }
    }
    ${BOOK_CARD_FRAGMENT}
`;

export function Books() {
    const { loading, error, data } = useQuery<{ books: IBookCardProps[] }>(
        BOOKS_QUERY
    );

    if (loading) return <span>Loading...</span>;
    if (error) return <span>{error.message}</span>;

    return (
        <section className={styles.books}>
            <h2 className={styles.heading}>Books</h2>
            <ul className={styles.list}>
                {data?.books.map((b) => (
                    <li className={styles.listItem} key={b.id}>
                        <BookCard {...b} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
