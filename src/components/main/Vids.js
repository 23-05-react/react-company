import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	//지금과 같이 코드 작성시 발생하는 문제점 찾기
	//원인 찾기
	//해결방안 찾기 (55분까지)
	const youtube = useSelector((store) => store.youtubeReducer.youtube);
	console.log(youtube);
	return (
		<section id='vids' className='myScroll'>
			{youtube.map((vid, idx) => {
				if (idx >= 4) return null;
				return <img key={vid.id} src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} />;
			})}
		</section>
	);
}

export default memo(Vids);
