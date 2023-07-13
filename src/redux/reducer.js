import { combineReducers } from 'redux';
import * as types from './actionType';

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case types.YOUTUBE.start:
			return state;
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		case types.YOUTUBE.fail:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const departmentReducer = (state = { department: [] }, action) => {
	switch (action.type) {
		case types.DEPARTMENT.start:
			return state;
		case types.DEPARTMENT.success:
			return { ...state, department: action.payload };
		case types.DEPARTMENT.fail:
			return { ...state, department: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ youtubeReducer, departmentReducer });
export default reducers;
