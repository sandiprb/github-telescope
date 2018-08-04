import { FETCH_TEST_ACTION, RECIEVE_TEST_ACTION } from './constants'

export const fetchTestAction = () => ({ type: FETCH_TEST_ACTION })
export const recievedTestAction = data => ({
	type: RECIEVE_TEST_ACTION,
	payload: {
		data,
	},
})
