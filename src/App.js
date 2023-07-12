import { Route, Switch } from 'react-router-dom';
import { useRef } from 'react';

//common
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Menu from './components/common/Menu';

//main
import Main from './components/main/Main';

//sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setYoutube } from './redux/action';
import { useEffect } from 'react';
import './scss/style.scss';

function App() {
	const dispatch = useDispatch();
	const menu = useRef(null);

	const fetchYoutube = async () => {
		const key = 'AIzaSyCF8SOz4Cchg53VOMXZe0un2AC7zEP2apU';
		const list = 'PLHtvRFLN5v-W5bQjvyH8QTdQQhgflJ3nu';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;
		const result = await axios.get(url);
		dispatch(setYoutube(result.data.items));
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/' render={() => <Main menu={menu} />} />
				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/member' component={Member} />
			<Footer />
			<Menu ref={menu} />
		</>
	);
}

export default App;
