import { combineReducers } from 'redux'
import produce from 'immer'
import { IStarredReposState, IAction } from './interface'
import {
	FETCH_STARRED_REPOS,
	RECIEVE_STARRED_REPOS,
	FETCH_MORE_REPOS,
} from './constants'

//#region Selectors
export const getStarredReposState = (state): IStarredReposState =>
	state.starredRepos
export const getNextLink = state => getStarredReposState(state).nextLink

//#endregion

const initState: IStarredReposState = {
	isLoading: false,
	repos: [],
	nextLink: '',
}

const reducer = (
	state: Partial<IStarredReposState> = initState,
	action: IAction
): Partial<IStarredReposState> =>
	produce(state, draft => {
		switch (action.type) {
			case FETCH_STARRED_REPOS:
				draft.isLoading = true
				draft.repos = []
				draft.nextLink = ''
				return
			case FETCH_MORE_REPOS:
				draft.isLoading = true
				return
			case RECIEVE_STARRED_REPOS:
				draft.isLoading = false
				draft.repos = [...draft.repos, ...action.payload.repos]
				draft.nextLink = action.payload.nextLink
				return
		}
	})

export default combineReducers({
	starredRepos: reducer,
})
