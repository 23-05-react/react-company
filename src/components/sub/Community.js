import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		resetForm();
	};

	const deletePost = (delIndex) => {
		if (!window.confirm('해당 게시글을 삭제하겠습니까?')) return;
		setPosts(Posts.filter((_, idx) => idx !== delIndex));
	};

	useEffect(() => {
		console.log(Posts);
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요.' ref={input} />
				<br />
				<textarea cols='30' rows='3' placeholder='본문을 입력하세요.' ref={textarea}></textarea>
				<br />

				<nav className='btnSet'>
					<button onClick={resetForm}>cancel</button>
					<button onClick={createPost}>write</button>
				</nav>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							<div className='txt'>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
							</div>

							<nav className='btnSet'>
								<button>EDIT</button>
								<button onClick={() => deletePost(idx)}>DELETE</button>
							</nav>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;

/*
Create - 데이터저장 (게시글 저장)
Read - 데이터호출 (게시글 보기)
Upated - 데이터수정 (게시글 수정)
Delete - 데이터삭제 (게시글 삭제)

localStorage: 모든 브라우저마다 가지고 있는 경량의 데이터 베이스 (문자열 저장)

수정 모드 작업 흐름
1- 수정 버튼 클릭시 해당 순번의 Posts의 객체에 수정관련 property 추가
2- map으로 반복처리시 수정관련 property의 유무에 따라 수정모드, 출력모드 구분해서 분기처리 후 렌더링
3- 출력모드: h2, p로 출력 / 수정모드: input, textarea로 값을 담아서 출력 (수정취소, 수정 버튼 추가)
4- 수정모드에서 수정버튼 클릭시 State값 변경하고 해당 포스트의 수정관련 property 수정
*/
