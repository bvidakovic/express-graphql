import React from 'react';
import { gql } from '@apollo/client';
import styles from './Book.module.css';
import { AUTHOR_DETAILS_FRAGMENT } from '../Author/Author';
import { CATEGORY_DETAILS_FRAGMENT } from '../Category/Category';

export const BOOK_DETAILS_FRAGMENT = gql`
    fragment BookDetails on Book {
        id
        title
        description
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

export function Book({ title, description, author, category }) {
    return (
        <article className={styles.book}>
            <img className={styles.img} src='./book-cover.jpg' alt='cover' />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.category}>{category.name}</p>
            <p className={styles.author}>
                {author.firstName} {author.lastName}
            </p>

            {/* <p>{description}</p> */}
        </article>
    );
}
