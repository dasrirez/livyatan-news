import { SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT } from '../actions/user-actions'
import Cookies from 'js-cookie'


let userId = Cookies.get('userId')
const initialState = userId ? { loggedIn: true, userId } : {}

export default function (state = initialState, { type, userId }) {
	switch (type) {
		case SIGNIN_REQUEST:
			return {
				loggingIn: true
			}
		case SIGNIN_SUCCESS:
			return {
				loggedIn: true,
				userId: userId
			}
		case SIGNIN_FAILURE:
			return {}
		case SIGNOUT:
			return {}
		default:
			return state
	}
}
