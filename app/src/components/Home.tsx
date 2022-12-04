import React, { useState } from 'react';

import { Books } from './Books/Books';
import { FetchExample } from './FetchExample/FetchExample';

import styles from './Home.module.css';
import classNames from 'classnames';

export function Home() {
    const [view, setView] = useState('books');

    const showBooks = view === 'books';
    const showTest = view === 'speed-test';

    return (
        <section>
            <nav className={styles.nav}>
                <button
                    onClick={() => setView('books')}
                    className={classNames(
                        styles.btn,
                        showBooks && styles.btnActive
                    )}
                >
                    Books
                </button>
                <button
                    onClick={() => setView('speed-test')}
                    className={classNames(
                        styles.btn,
                        showTest && styles.btnActive
                    )}
                >
                    Speed test
                </button>
            </nav>
            <div>
                {showBooks && <Books />}
                {showTest && <FetchExample />}
            </div>
        </section>
    );
}
