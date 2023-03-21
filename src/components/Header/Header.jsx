import React from 'react';

import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import { TEXT_LOGOUT } from '../../constants';

import styles from './header.module.css';

const Header = () => {
	return (
		<header className={styles.container}>
			<Logo />
			<p className={styles.username}>Duo</p>
			<Button className={styles.btn} text={TEXT_LOGOUT} />
		</header>
	);
};

export default Header;
