import React, { useContext } from 'react';

import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import { TEXT_LOGOUT } from '../../constants';

import { DataContext } from '../../contexts/DataContext';

import styles from './header.module.css';

const Header = () => {
	const { token, logout, user } = useContext(DataContext);

	return (
		<header className={styles.container}>
			<Logo />
			{token && user && (
				<>
					<p className={styles.username}>{user.name}</p>
					<Button
						className={styles.btn}
						text={TEXT_LOGOUT}
						onClick={() => logout()}
					/>
				</>
			)}
		</header>
	);
};

export default Header;
