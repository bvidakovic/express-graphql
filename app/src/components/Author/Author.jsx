import React from 'react';
import { gql } from '@apollo/client';

export const AUTHOR_DETAILS_FRAGMENT = gql`
    fragment AuthorDetails on Author {
        firstName
        lastName
    }
`;

export function Author() {
    return <div>Author</div>;
}
