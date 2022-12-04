import React from 'react';
import styles from './Books.module.css';
import { BookCard, BOOK_DETAILS_FRAGMENT } from '../Book/BookCard';
import { useQuery, gql } from '@apollo/client';

const BOOKS_QUERY = gql`
    query GetBooks {
        books {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS_FRAGMENT}
`;

export function Books() {
    const { loading, error, data } = useQuery(BOOKS_QUERY);

    if (loading) return 'Loading';

    return (
        <section>
            <h2 className={styles.heading}>Books</h2>
            <ul className={styles.list}>
                {data.books.map((b) => (
                    <li className={styles.listItem} key={b.id}>
                        <BookCard {...b} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
