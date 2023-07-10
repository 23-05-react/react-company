import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';
import Btns from './Btns';
import { useState } from 'react';

/*
	Prop drilling
	- 특정 값을 자식 컴포넌트에게 전달하기 위해서 불필요하게 많은 중간 컴포넌트들이 값의 전달목적으로만 쓰이는 경우

	Redux
	위와 같은 prop drilling을 방지하기 위해서 복잡하게 컴포넌트를 통해 props으로 값을 전달하는 것이 아닌 컴포넌트외부에 데이터 전용 객체를 만들어서 어떤 위치의 컴포넌트에서든 편하게 값을 가져오고 수정할 수 있게 만든 전역 데이터 체계
*/
function Main({ menu }) {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);

	return (
		<main>
			<Header type={'main'} menu={menu} />
			<Visual />
			<News />
			{/* Pics컴포넌트가 활성화되는 순간부터 Scrolled값을 Pics의 제목 스타일과 연동 */}
			<Pics Scrolled={Scrolled} Pos={Pos[2]} />
			<Vids />
			<Banner />
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;
