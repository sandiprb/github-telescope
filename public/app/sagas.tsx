import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { IAction } from './interface'
import { recievedTestAction } from './actions'
import { FETCH_TEST_ACTION } from './constants'

const API = {
	fetchTest: () => ({
		data: { key: 'value2' },
	}),
}

function* fetchTest(action: IAction) {
	try {
		const { data } = yield call(API.fetchTest)
		yield put(recievedTestAction(data))
	} catch (e) {
		console.log(e)
	}
}

export default function* rootSaga() {
	yield takeLatest(FETCH_TEST_ACTION, fetchTest)
}
