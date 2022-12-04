import React from 'react';
import { useParams } from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';

import { BOOK_CARD_FRAGMENT } from './BookCard';
import styles from './BookPage.module.css';

const BOOK_QUERY = gql`
    query GetBook($id: Int!) {
        book(id: $id) {
            ...BookCard
            description
        }
    }
    ${BOOK_CARD_FRAGMENT}
`;

interface IAuthor {
    id: string;
    firstName: string;
    lastName: string;
}

interface ICategory {
    id: string;
    name: string;
}

interface IBook {
    id: number;
    title: string;
    description: string;
    author: IAuthor;
    category: ICategory;
}

export function BookPage() {
    const { bookId } = useParams();

    const { loading, error, data } = useQuery<{ book: IBook }>(BOOK_QUERY, {
        variables: {
            id: Number(bookId),
        },
    });

    if (loading) return <span>Loading...</span>;
    if (error) return <span>{error.message}</span>;
    const { title, description, author, category } = data.book;

    return (
        <section>
            <div className={styles.coverImage}>
                <img src="/book-cover.jpg" alt="cover image" />
            </div>
            <div className={styles.content}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
        </section>
    );
}
