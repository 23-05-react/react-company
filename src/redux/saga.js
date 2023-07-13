import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube, fetchDepartment } from './api';
import * as types from './actionType';

//youtube saga
function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}
function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.fail, payload: err });
	}
}

//department saga
function* callDepartment() {
	yield takeLatest(types.DEPARTMENT.start, returnDepartment);
}
function* returnDepartment() {
	try {
		const response = yield call(fetchDepartment);
		yield put({ type: types.DEPARTMENT.success, payload: response.data.members });
	} catch (err) {
		yield put({ type: types.DEPARTMENT.fail, payload: err });
	}
}

export default function* rootSaga() {
	yield all([fork(callYoutube), fork(callDepartment)]);
}
