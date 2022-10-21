import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

import AppContext from "./context";

function App() {
	React.useEffect(() => {
		// fetch("https://60d62397943aa60017768e77.mockapi.io/items")
		// 	.then((res) => res.json())
		// 	.then((json) => setItems(json));

		async function fetchData() {
			try {
				setIsLoading(true);

				const [cartResponse, favoritesResposne, itemsResponse] = await Promise.all([
					axios.get("https://6349bcf25df95285140699c7.mockapi.io/cart"),
					axios.get("https://6349bcf25df95285140699c7.mockapi.io/favorites"),
					axios.get("https://60d62397943aa60017768e77.mockapi.io/items"),
				]);

				setIsLoading(false);

				setCartItems(cartResponse.data);
				setFavoriteItems(favoritesResposne.data);
				setItems(itemsResponse.data);
			} catch (error) {
				alert("ошибка при запросе данных");
				console.error(error);
			}
		}
		fetchData();
	}, []);

	const [items, setItems] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [cartItems, setCartItems] = React.useState([]);
	const [favoriteItems, setFavoriteItems] = React.useState([]);
	const [cartOpened, setCartOpened] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	const addCartItems = async (obj) => {
		try {
			const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
			if (findItem) {
				setCartItems((prev) => prev.filter((item) => item.parentId !== obj.id));
				await axios.delete(`https://6349bcf25df95285140699c7.mockapi.io/cart/${findItem.id}`);
			} else {
				setCartItems((prev) => [...prev, obj]);
				const { data } = await axios.post("https://6349bcf25df95285140699c7.mockapi.io/cart", obj);
				setCartItems((prev) =>
					prev.map((item) => {
						if (item.parentId === data.parentId) {
							return {
								...item,
								id: data.id,
							};
						}
						return item;
					})
				);
			}
		} catch (error) {
			alert("Ошибка при добавлении в корзину");
			console.error(error);
		}
	};

	const addFavoriteItems = async (obj) => {
		try {
			if (favoriteItems.find((item) => item.id === obj.id)) {
				axios.delete(`https://6349bcf25df95285140699c7.mockapi.io/favorites/${obj.id}`);
				// setFavoriteItems((prev) => prev.filter((item) => item.id !== obj.id));
			} else {
				const { data } = await axios.post(
					"https://6349bcf25df95285140699c7.mockapi.io/favorites",
					obj
				);
				setFavoriteItems((prev) => [...prev, data]);
			}
		} catch (error) {
			alert("не удалось добавить в фавориты");
			console.log(error);
		}
	};

	const deleteCartItems = async (currentId) => {
		try {
			axios.delete(`https://6349bcf25df95285140699c7.mockapi.io/cart/${currentId}`);
			setCartItems((prev) => prev.filter((obj) => obj.id !== currentId));
		} catch (error) {
			alert("Ошибка при удалении из корзины");
			console.log(error);
		}
	};

	const onChangeValue = (event) => {
		setSearchValue(event.target.value);
	};

	const hasItemAdded = (id) => {
		return cartItems.some((item) => Number(item.parentId) === Number(id));
	};
	return (
		<AppContext.Provider
			value={{
				items,
				cartItems,
				favoriteItems,
				hasItemAdded,
				setCartOpened,
				setCartItems,
				addCartItems,
				isLoading,
				setIsLoading,
				deleteCartItems,
				cartOpened,
			}}
		>
			<>
				<div className="wrapper clear">
					<Header onClickCart={() => setCartOpened(true)} />
					<Routes>
						<Route
							path=""
							element={
								<Home
									searchValue={searchValue}
									onChangeValue={onChangeValue}
									items={items}
									cartItems={cartItems}
									favoriteItems={favoriteItems}
									addCartItems={addCartItems}
									addFavoriteItems={addFavoriteItems}
									deleteCartItems={deleteCartItems}
									isLoading={isLoading}
									exact
								/>
							}
						></Route>
						<Route
							path="favorites"
							element={<Favorites addFavoriteItems={addFavoriteItems} />}
							exact
						></Route>
						<Route
							path="orders"
							element={<Orders addFavoriteItems={addFavoriteItems} />}
							exact
						></Route>
					</Routes>
				</div>
				<Drawer items={cartItems} onRemove={deleteCartItems} onClose={() => setCartOpened(false)} />
			</>
		</AppContext.Provider>
	);
}

export default App;
