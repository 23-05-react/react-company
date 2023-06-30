import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Contact() {
	const container = useRef(null);
	const [Traffic, setTraffic] = useState(false);
	const [Location, setLocation] = useState(null);
	const { kakao } = window;
	const option = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	//아래 5개 변수값들은 useEffect구문에서 인스턴스 생성할때만 필요한 정보값에 불과하므로 미리 읽히도록 useEffect바깥에 배치
	const imgSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
	const imgSize = new kakao.maps.Size(232, 99);
	const imgPos = { offset: new kakao.maps.Point(116, 99) };
	const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);
	const marker = new kakao.maps.Marker({ position: option.center, image: markerImage });

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(container.current, option);

		marker.setMap(mapInstance);
		//지역변수인 mapInstance값을 다른함수에서도 활용해야 되므로 Location state에 해당 인스턴스 값 저장
		setLocation(mapInstance);
	}, []);

	useEffect(() => {
		//Location state에 담겨있는 맵 인스턴스로부터 traffic레이어 호출 구문 처리 (Traffic state가 변경될 때마다)
		//첫 렌더링 사이클에서는 Location값이 null이므로 Optional Chaining을 활용해서 해당 값이 담기는 두번째 랜더링 사이클부터 동작하도록 처리
		Traffic ? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button>
		</Layout>
	);
}

export default Contact;
