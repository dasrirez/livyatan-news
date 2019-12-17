import { ALERT_SUCCESS, ALERT_CLEAR, ALERT_ERROR } from '../actions/alert-actions'

export default function (state = {}, { type, message }) {
	switch (type) {
		case ALERT_SUCCESS:
			return {
				type: 'alert-success',
				message: message
			}
		case ALERT_ERROR:
			return {
				type: 'alert-danger',
				message: message
			}
		case ALERT_CLEAR:
			return {}
		default:
			return state
	}
}