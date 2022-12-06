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

export interface IBook {
    id: number;
    title: string;
    author: IAuthor;
    description: string;
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
    if (!data) return null;
    const { title, description, author, category } = data.book;

    return (
        <section>
            <div className={styles.coverImage}>
                <img src="/book-cover.jpg" alt="cover image" />
            </div>
            <div className={styles.content}>
                <h1>{title}</h1>
                <p>
                    {author.firstName} {author.lastName}
                </p>
                <p>{category.name}</p>
                <p>{description}</p>
            </div>
        </section>
    );
}
