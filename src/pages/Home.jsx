import React from "react";

import Card from "../components/Card";

const Home = ({
	searchValue,
	onChangeValue,
	items,
	addCartItems,
	addFavoriteItems,
	deleteCartItems,
	isLoading,
}) => {
	const renderingItems = () => {
		const filtredItems = items.filter((obj) =>
			obj.title.toLowerCase().includes(searchValue.toLowerCase())
		);
		return (isLoading ? [...Array(7)] : filtredItems).map((obj, index) => (
			<Card
				{...obj}
				key={index}
				loading={isLoading}
				onPlus={(obj) => addCartItems(obj)}
				onFavorite={() => addFavoriteItems(obj)}
				onDelete={() => deleteCartItems(obj.id)}
			/>
		));
	};

	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between">
				<h1>{searchValue ? `Поиск по запросу '${searchValue}'` : "Все кроссовки"}</h1>
				<div className="search-block d-flex align-center">
					<img className="mr-15" width={14} height={14} alt="search-ico" src="/img/search.svg" />
					<input
						className="search-block__input"
						type="text"
						onChange={onChangeValue}
						value={searchValue}
						placeholder="Поиск..."
					/>
				</div>
			</div>
			<div className="d-flex flex-wrap align-center mt-30">{renderingItems()}</div>
		</div>
	);
};

export default Home;
