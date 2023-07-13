import axios from 'axios';

export const fetchYoutube = async () => {
	const key = 'AIzaSyCF8SOz4Cchg53VOMXZe0un2AC7zEP2apU';
	const list = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;
	return await axios.get(url);
};

export const fetchDepartment = async () => {
	return await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
};
