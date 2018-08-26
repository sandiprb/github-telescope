import { combineReducers } from 'redux'
import produce from 'immer'
import { IStarredReposState, IAction, IRepo } from './interface'
import {
	FETCH_STARRED_REPOS,
	RECIEVE_STARRED_REPOS,
	FETCH_MORE_REPOS,
	FILTER_REPOS,
} from './constants'

//filters
const getlanguages = (repos: IRepo[]) =>
	repos.reduce((acc, repo) => {
		const { language } = repo
		language && acc.indexOf(language) === -1 && acc.push(language)
		return acc
	}, [])

//#region Selectors
export const getStarredReposState = (state): IStarredReposState =>
	state.starredRepos
export const getNextLink = state => getStarredReposState(state).nextLink

//#endregion

const initState: IStarredReposState = {
	isLoading: false,
	repos: [],
	nextLink: '',
	languages: [],
	filterByLanguages: [],
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
				draft.languages = getlanguages(draft.repos)
				return
			case FILTER_REPOS:
				draft.filterByLanguages = action.payload.languages
				return
		}
	})

export default combineReducers({
	starredRepos: reducer,
})
