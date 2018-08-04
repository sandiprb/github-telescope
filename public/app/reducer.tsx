import { combineReducers } from 'redux'
import produce from 'immer'
import { IReducerState, IAction } from './interface'
import { FETCH_TEST_ACTION, RECIEVE_TEST_ACTION } from './constants'

const getTest1Data = () => ({ key: '' })

const getDefaultQuoteState = (): IReducerState => ({
	test1: getTest1Data(),
	isLoading: false,
})
const initState = getDefaultQuoteState()

const reducer = (
	state: Partial<IReducerState> = initState,
	action: IAction
): Partial<IReducerState> =>
	produce(state, draft => {
		switch (action.type) {
			case FETCH_TEST_ACTION:
				draft.isLoading = true
				return
			case RECIEVE_TEST_ACTION:
				console.log(action)
				draft.isLoading = false
				draft.test1 = action.payload.data
				return
		}
	})

export default combineReducers({
	state: reducer,
})
