import clsx from 'clsx';
import React from 'react';

import styles from './GlobalStyles.module.scss';
function GlobalStyles({ children }) {
    return <div className={clsx(styles.wrapper)}>{children}</div>;
}

export default GlobalStyles;
