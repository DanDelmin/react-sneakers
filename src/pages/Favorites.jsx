import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

const Favorites = ({ addFavoriteItems }) => {
	const { favoriteItems } = React.useContext(AppContext);
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between">
				<h1>Мои закладки</h1>
			</div>
			<div className="d-flex flex-wrap align-center mt-30">
				{favoriteItems.map((obj, index) => (
					<Card {...obj} key={index} favorited={true} onFavorite={() => addFavoriteItems(obj)} />
				))}
			</div>
		</div>
	);
};

export default Favorites;
