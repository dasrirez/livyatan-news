export const INCREMENT_PAGE = 'page:increment'
export const RESET_PAGE = 'page:reset'
export const PAGE_ERROR = 'page:error'

export const incrementPage = (page) => ({
	type: INCREMENT_PAGE,
	payload: {
		page: page
	}
})

export const resetPage = () => {
	return {
		type: RESET_PAGE
	}
}

export const pageError = (err) => {
	return {
		type: PAGE_ERROR,
		payload: {
			error: err.message
		}
	}
}