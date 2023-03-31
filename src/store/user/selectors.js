export const getToken = ({ user: { token } }) => token;
export const getIsAuth = ({ user: { isAuth } }) => isAuth;
export const getUser = ({ user }) => user;
export const getUserRole = ({ user: { role } }) => role;
export const getUserLoading = ({ user: { loading } }) => loading;
export const getUserErrors = ({ user: { errors } }) => errors;
export const getIsAdmin = ({ user: { role } }) =>
	role.toLowerCase() === 'ADMIN'.toLowerCase();
