import React from 'react';

import apolloLogo from '../../assets/apollo-graphql-compact.svg';
import graphQLlogo from '../../assets/graph-ql.svg';
import plus from '../../assets/plus.svg';
import styles from './Home.module.css';

export function Home() {
    return (
        <div className={styles.home}>
            <div className={styles.content}>
                <div className={styles.logos}>
                    <img className={styles.graphql} src={graphQLlogo} alt="" />
                    <img className={styles.plus} src={plus} alt="" />
                    <img className={styles.apollo} src={apolloLogo} alt="" />
                </div>
                <h1>
                    Ask for what you need, <br /> get exactly that with
                    <span> GraphQL </span>
                </h1>
            </div>
        </div>
    );
}
