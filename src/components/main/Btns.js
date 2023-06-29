import { useRef, useEffect, useState } from 'react';
import Anime from '../../asset/anime';

function Btns({ setScrolled }) {
	const btnRef = useRef(null);
	const pos = useRef([]);
	const [Num, setNum] = useState(0);

	const getPos = () => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		setNum(pos.current.length);
	};

	const activation = () => {
		const base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const boxs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		setScrolled(scroll);

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const box of boxs) box.classList.remove('on');
				btns[idx].classList.add('on');
				boxs[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		//리액트는 SPA이기 때문에 페이지가 변경된다고 하더라도 스크롤 위치값이 초기화 되지 않으므로 마운트시마다 스크롤값을 초기화함
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		};
	}, []);

	return (
		<ul className='btnNavi' ref={btnRef}>
			{/* 현재 세로 위치값이 담겨있는 배열의 갯수로 빈배열 동적으로 생성하고 버튼 반복처리 */}
			{Array(Num)
				.fill()
				.map((_, idx) => {
					let defaultClass = '';
					if (idx === 0) defaultClass = 'on';
					return (
						<li
							key={idx}
							className={defaultClass}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: 500,
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}

export default Btns;
