import {
	FETCH_STARRED_REPOS,
	RECIEVE_STARRED_REPOS,
	FETCH_MORE_REPOS,
} from './constants'
import { IRepo } from './interface'

export const fetchStarredRepos = (username: string) => ({
	type: FETCH_STARRED_REPOS,
	payload: {
		username,
	},
})
export const fetchMoreRepos = (username: string, nextLink: string) => ({
	type: FETCH_MORE_REPOS,
	payload: {
		username,
		nextLink,
	},
})
export const recievedStarredRepos = (repos: IRepo[], nextLink: string) => ({
	type: RECIEVE_STARRED_REPOS,
	payload: {
		repos,
		nextLink,
	},
})
