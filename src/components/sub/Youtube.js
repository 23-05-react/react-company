import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Modal from '../common/Modal';

function Youtube() {
	const modal = useRef(null);
	const [Vids, setVids] = useState([]);

	useEffect(() => {
		const key = 'AIzaSyCF8SOz4Cchg53VOMXZe0un2AC7zEP2apU';
		const list = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;
		axios.get(url).then((data) => {
			console.log(data.data.items);
			setVids(data.data.items);
		});
	}, []);

	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid, idx) => {
					return (
						<article key={idx}>
							<h2>{vid.snippet.title.length > 50 ? vid.snippet.title.substr(0, 50) + '...' : vid.snippet.title}</h2>
							<div className='txt'>
								<p>{vid.snippet.description.length > 200 ? vid.snippet.description.substr(0, 200) + '...' : vid.snippet.description}</p>
								<span>{vid.snippet.publishedAt.split('T')[0].split('-').join('.')}</span>
							</div>
							<div className='pic' onClick={() => modal.current.open()}>
								<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout>

			<Modal ref={modal}>
				<iframe title={Vids[0].id} src={`https://www.youtube.com/embed/${Vids[0].snippet.resourceId.videoId}`} frameborder='0'></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
