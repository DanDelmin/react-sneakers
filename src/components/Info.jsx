import React from "react";
import AppContext from "../context";

const Info = ({ imgUrl, title, description }) => {
	const { setCartOpened } = React.useContext(AppContext);
	return (
		<center className="d-flex flex-column justify-center flex align-center">
			<img width={120} src={imgUrl} alt="cart-empty_img" />
			<h3>{title}</h3>
			<p className="opacity-6">{description}</p>
			<button onClick={() => setCartOpened(false)} className="greenBtn mt-20">
				Вернуться назад
			</button>
		</center>
	);
};
export default Info;
