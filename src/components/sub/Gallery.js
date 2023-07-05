import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Gallery() {
	const [Items, setItems] = useState([]);

	const getFlickr = async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = 'ae5dbef0587895ed38171fcda4afb648';
		const method_interest = 'flickr.interestingness.getList';
		const num = 20;
		let url = '';
		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;

		const result = await axios.get(url);
		console.log(result.data.photos.photo);
		setItems(result.data.photos.photo);
	};

	useEffect(() => getFlickr({ type: 'interest' }), []);

	return (
		<Layout name={'Gallery'}>
			<div className='frame'>
				{Items.map((item, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
										alt={item.title}
									/>
								</div>
								<h2>{item.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Gallery;
