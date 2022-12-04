import React from 'react';

import { gql } from '@apollo/client';

import { AUTHOR_DETAILS_FRAGMENT } from '../Author/Author';
import { CATEGORY_DETAILS_FRAGMENT } from '../Category/Category';
import styles from './BookCard.module.css';

export const BOOK_DETAILS_FRAGMENT = gql`
    fragment BookCardDetails on Book {
        id
        title
        author {
            ...AuthorDetails
        }
        category {
            ...CategoryDetails
        }
    }
    ${AUTHOR_DETAILS_FRAGMENT}
    ${CATEGORY_DETAILS_FRAGMENT}
`;

export function BookCard({ title, author, category }) {
    return (
        <article className={styles.bookCard}>
            <img className={styles.img} src="./book-cover.jpg" alt="cover" />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.category}>{category.name}</p>
            <p className={styles.author}>
                {author.firstName} {author.lastName}
            </p>
        </article>
    );
}
