import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube, fetchDepartment, fetchFlickr } from './api';
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

//flickr saga
function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}
function* returnFlickr(action) {
	try {
		//컴포넌트에 액션객체 전달시 만약 타입외의 propety값이 있다면 해당 값을 받아서 call함수 두번째 인수로 api함수에 인수로 전달 가능
		const response = yield call(fetchFlickr, action.opt);
		yield put({ type: types.FLICKR.success, payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: types.FLICKR.fail, payload: err });
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
	yield all([fork(callYoutube), fork(callDepartment), fork(callFlickr)]);
}
