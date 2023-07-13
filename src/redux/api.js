//외부 비동기 데이터 호출 함수를 외부 파일로 따로 관리
import axios from 'axios';

export const fetchYoutube = async () => {
	const key = 'AIzaSyCF8SOz4Cchg53VOMXZe0un2AC7zEP2apU';
	const list = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;
	return await axios.get(url);
};

/*
  순수 함수 (Pure function)
  - 부수효과를 발생시키지 않는 순수 자바스크립트로만 동작 가능한 함수
  - 동일한 인수를 넣었을때 동일한 값을 반환하는 함수
  - 컴포넌트외부에서 독립적으로 동작하는 함수이므로 내부에 dom제어나 react hook사용 불가

  부수 효과 (Side Effect)
  - 기존의 변경점을 직접적으로 야기시키는 효과
  - 컴포넌트 외부에서 사용할수 없는 기능
*/
