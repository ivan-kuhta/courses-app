import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/__Input/Input';
import Errors from '../Errors/Errors';
import { URL_API } from '../../constants';
import { DataContext } from '../../contexts/DataContext';

import styles from './login.module.css';

const Login = () => {
	const navigate = useNavigate();

	const { login } = useContext(DataContext);

	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const fetchLogin = async () => {
		const response = await fetch(`${URL_API}/login`, {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const { successful, result, user } = await response.json();

		if (successful) {
			login(result, user);
			navigate('/courses');
		} else {
			setErrors([{ message: result }]);
		}
	};

	const handlerSubmit = (e) => {
		e.preventDefault();
		fetchLogin();
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
