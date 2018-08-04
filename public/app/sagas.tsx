import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { IAction } from './interface'
import { recievedStarredRepos } from './actions'
import { FETCH_STARRED_REPOS } from './constants'

const ENDPOINTS = {
	starredRepos: (username: string) =>
		`https://api.github.com/users/${username}/starred`,
}

const API = {
	fetchStarredRepos: async (username: string) => {
		const response = await axios.get(ENDPOINTS.starredRepos(username))
		if (response.status === 200) {
			const { data = {} } = response
			return data
		}
	},
}

function* fetchStarredRepos(action: IAction) {
	try {
		const { payload } = action
		const data = yield call(API.fetchStarredRepos, payload.username)
		yield put(recievedStarredRepos(data))
	} catch (e) {
		console.log(e)
	}
}

export default function* rootSaga() {
	yield takeLatest(FETCH_STARRED_REPOS, fetchStarredRepos)
}
