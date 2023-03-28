import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../store/user/actionCreators';
import { getUser } from '../../store/user/selectors';

import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import { TEXT_LOGOUT } from '../../constants';

import styles from './header.module.css';

const Header = () => {
	const dispatch = useDispatch();

	const { name, isAuth, token } = useSelector(getUser);

	return (
		<header className={styles.container}>
			<Logo />
			{isAuth && (
				<>
					<p className={styles.username}>{name}</p>
					<Button
						className={styles.btn}
						text={TEXT_LOGOUT}
						onClick={() => dispatch(logout(token))}
					/>
				</>
			)}
		</header>
	);
};

export default Header;
