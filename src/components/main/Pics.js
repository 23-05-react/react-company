function Pics({ Scrolled, Pos }) {
	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${Scrolled - Pos}px)` }}>FLICKR</h1>
		</section>
	);
}

export default Pics;
