import React from 'react';

import { gql } from '@apollo/client';

export const CATEGORY_DETAILS_FRAGMENT = gql`
    fragment CategoryDetails on Category {
        id
        name
    }
`;

export function Category() {
    return <div>Category</div>;
}
