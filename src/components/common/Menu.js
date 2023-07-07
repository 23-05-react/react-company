import { forwardRef, useImperativeHandle, useState } from 'react';

const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { toggle: () => setOpen(!Open) };
	});
	return <nav>Menu</nav>;
});

export default Menu;
