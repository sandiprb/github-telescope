import { FETCH_STARRED_REPOS, RECIEVE_STARRED_REPOS } from './constants'
import { IRepo } from './interface'

export const fetchStarredRepos = (username: string) => ({
	type: FETCH_STARRED_REPOS,
	payload: {
		username,
	},
})
export const recievedStarredRepos = (repos: IRepo[], nextLink: string) => ({
	type: RECIEVE_STARRED_REPOS,
	payload: {
		repos,
		nextLink,
	},
})
