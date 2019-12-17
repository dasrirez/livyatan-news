import { DOMAIN } from '../constants/index'
import Cookies from 'js-cookie';

const signin = (userId, password) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId, password }),
		credentials: 'include'
	}

	return fetch(`${DOMAIN}/api/signin/`, requestOptions)
		.then(handleResponse)
		.then(userId => {
			return userId;
		});
}

const signup = (userId, password) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ userId, password }),
		credentials: 'include'
	}
	return fetch(`${DOMAIN}/api/signup/`, requestOptions)
		.then(handleResponse)
		.then(userId => {
			return userId
		})
}

const oauth = token => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ token }),
		credentials: 'include',
	}

	return fetch(`${DOMAIN}/api/oauth/`, requestOptions)
}

const signout= () => {
	Cookies.remove('userId');
	return fetch(`${DOMAIN}/api/signout/`, { credentials: 'include' }).then(handleResponse);
}

const handleResponse = (response) => response.text().then(text => {
	if (!response.ok){
		signout();
		const error = 'Error (' + response.status + ') ' + text;
		return Promise.reject(error);
	}
	return text;
});

export const userService = {
	signin,
	signup,
	signout,
	oauth,
};
