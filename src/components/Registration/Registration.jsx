import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/__Input/Input';
import { AuthService } from '../../services';
import { getIsAuth } from '../../store/user/selectors';
import Errors from '../Errors/Errors';

import styles from './registration.module.css';

const Registration = () => {
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const isAuth = useSelector(getIsAuth);

	useEffect(() => {
		if (isAuth) navigate('/courses');
	}, [isAuth, navigate]);

	const fetchNewUser = async () => {
		AuthService.register({
			name,
			email,
			password,
		}).then(({ successful, errors }) => {
			if (successful) {
				navigate('/login');
			} else {
				setErrors(errors.map((message) => ({ message })));
			}
		});
	};

	const handlerSubmit = async (e) => {
		e.preventDefault();
		fetchNewUser();
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handlerSubmit}>
				<h1 className={styles.title}>Registration</h1>
				<Errors errors={errors} />
				<Input
					labelText={'Name'}
					placeholdetText={'Enter name'}
					value={name}
					onChange={({ target: { value } }) => setName(value)}
				/>
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
				<Button type={'submit'} text={'Registration'} className={styles.btn} />
				<p>
					If you have an account you can <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
};

export default Registration;
