import { combineReducers } from 'redux'
import produce from 'immer'
import { IStarredReposState, IAction } from './interface'
import { FETCH_STARRED_REPOS, RECIEVE_STARRED_REPOS } from './constants'

const initState: IStarredReposState = {
	isLoading: false,
	repos: [],
}

const reducer = (
	state: Partial<IStarredReposState> = initState,
	action: IAction
): Partial<IStarredReposState> =>
	produce(state, draft => {
		switch (action.type) {
			case FETCH_STARRED_REPOS:
				draft.isLoading = true
				return
			case RECIEVE_STARRED_REPOS:
				draft.isLoading = false
				draft.repos = action.payload.data
				return
		}
	})

export default combineReducers({
	starredRepos: reducer,
})
