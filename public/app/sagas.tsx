import { call, put, select, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { IAction } from './interface'
import { recievedStarredRepos } from './actions'
import { FETCH_STARRED_REPOS } from './constants'
import { extractLinksFromHeaders } from './Utils'
import { getNextLink } from './reducer'
import { history } from './index'

const ENDPOINTS = {
	starredRepos: (username: string) => 'https://api.myjson.com/bins/yf06w',
	// `https://api.github.com/users/${username}/starred?per_page=100`,
}

const API = {
	fetchStarredRepos: async (uri: string) => {
		const response = await axios.get(uri)
		if (response.status === 200) {
			const { data: repos = {} } = response
			const { nextLink } = extractLinksFromHeaders(response.headers)
			return { repos, nextLink }
		}
	},
}

function* fetchStarredRepos(action: IAction) {
	try {
		const { payload } = action
		const state = yield select()
		const uri = getNextLink(state) || ENDPOINTS.starredRepos(payload.username)
		const { repos, nextLink } = yield call(API.fetchStarredRepos, uri)
		yield put(recievedStarredRepos(repos, nextLink))
	} catch (e) {
		console.warn(e)
		history.push('/404')
	}
}

export default function* rootSaga() {
	yield takeLatest(FETCH_STARRED_REPOS, fetchStarredRepos)
}
