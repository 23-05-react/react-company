import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import Modal from '../common/Modal';
import { useYoutubeQuery } from '../../hooks/useYoutubeQuery';

function Youtube() {
	const modal = useRef(null);
	const [Index, setIndex] = useState(0);
	const { data: Vids, isSuccess } = useYoutubeQuery();

	return (
		<>
			<Layout name={'Youtube'} bg={'Youtube.jpg'}>
				{isSuccess &&
					Vids.map((vid, idx) => {
						return (
							<article key={idx}>
								<h2>{vid.snippet.title.length > 50 ? vid.snippet.title.substr(0, 50) + '...' : vid.snippet.title}</h2>
								<div className='txt'>
									<p>
										{vid.snippet.description.length > 200
											? vid.snippet.description.substr(0, 200) + '...'
											: vid.snippet.description}
									</p>
									<span>{vid.snippet.publishedAt.split('T')[0].split('-').join('.')}</span>
								</div>
								<div
									className='pic'
									onClick={() => {
										modal.current.open();
										//썸네일 클릭시 현재 클릭한 요소의 순번값으로 Index State값 변경
										setIndex(idx);
									}}
								>
									<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
								</div>
							</article>
						);
					})}
			</Layout>

			<Modal ref={modal}>
				<iframe
					title={isSuccess && Vids[Index]?.id}
					src={`https://www.youtube.com/embed/${isSuccess && Vids[Index]?.snippet.resourceId.videoId}`}
				></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
