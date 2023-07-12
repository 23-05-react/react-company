import Layout from '../common/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/action';

function Department() {
	const Members = useSelector((store) => store.memberReducer.members);
	const dispatch = useDispatch();

	return (
		<Layout name={'Department'} txt={'Hello-World'}>
			<button
				onClick={() => {
					//버튼 클릭시 기존 State값을 Deep copy
					const newMembers = [...Members];
					//Deep copy된 참조형 자료 State정보값을 변경후
					newMembers[0].name = 'Emma';
					//action생성함수의 인수로 넣어 새로운 액션객체 생성
					const newAction = setMembers(newMembers);
					console.log(newAction);
					//그렇게 만들어진 액션객체를 dispatch를 통해 리듀서에 전달
					dispatch(newAction);
				}}
			>
				멤버 데이터 변경
			</button>
			{Members.map((member, idx) => {
				return (
					<article key={idx}>
						<div className='pic'>
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
						</div>
						<h2>{member.name}</h2>
						<p>{member.position}</p>
					</article>
				);
			})}
		</Layout>
	);
}

export default Department;
