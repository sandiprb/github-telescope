import { FETCH_STARRED_REPOS, RECIEVE_STARRED_REPOS } from './constants'

export const fetchStarredRepos = (username: string) => ({
	type: FETCH_STARRED_REPOS,
	payload: {
		username,
	},
})
export const recievedStarredRepos = data => ({
	type: RECIEVE_STARRED_REPOS,
	payload: {
		data,
	},
})
