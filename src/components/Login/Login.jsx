import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/__Input/Input';
import { getErrors } from '../../store/loadings/selectors';
import { login } from '../../store/user/actionCreators';
import { getIsAuth } from '../../store/user/selectors';
import Errors from '../Errors/Errors';

import styles from './login.module.css';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const errors = useSelector(getErrors);
	const isAuth = useSelector(getIsAuth);

	useEffect(() => {
		if (isAuth) navigate('/courses');
	}, [isAuth, navigate]);

	const handlerSubmit = (e) => {
		e.preventDefault();
		dispatch(
			login({
				email,
				password,
			})
		);
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handlerSubmit}>
				<h1 className={styles.title}>Login</h1>
				<Errors errors={errors} />
				<Input
					name={'email'}
					labelText={'Email'}
					placeholdetText={'Enter email'}
					value={email}
					onChange={({ target: { value } }) => setEmail(value)}
				/>
				<Input
					type={'password'}
					labelText={'Password'}
					placeholdetText={'Enter password'}
					value={password}
					onChange={({ target: { value } }) => setPassword(value)}
				/>
				<Button type={'submit'} text={'Login'} className={styles.btn} />
				<p>
					If you not have an account you can{' '}
					<Link to='/registration'>Registration</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
