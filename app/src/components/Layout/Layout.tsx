import className from 'classnames';
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import styles from './Layout.module.css';

export function Layout() {
    const linkClassName = ({ isActive }) =>
        className(styles.link, isActive && styles.linkActive);

    return (
        <div>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li key="/" className={styles.listItem}>
                        <NavLink className={styles.logo} to="/">
                            <img src="/geta-logo-white.png" alt="Geta logo" />
                        </NavLink>
                    </li>
                    {[
                        { path: '/books', label: 'Books' },
                        { path: '/speed-test', label: 'Speed test' },
                    ].map(({ path, label }) => (
                        <li key={path} className={styles.listItem}>
                            <NavLink className={linkClassName} to={path}>
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}
