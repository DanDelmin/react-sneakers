import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

// axios.get('https://60d62397943aa60017768e77.mockapi.io/cart'),
// axios.get('https://60d62397943aa60017768e77.mockapi.io/favorites'),
// axios.get('https://60d62397943aa60017768e77.mockapi.io/items')

function App() {
	React.useEffect(() => {
		// fetch("https://60d62397943aa60017768e77.mockapi.io/items")
		// 	.then((res) => res.json())
		// 	.then((json) => setItems(json));

		async function fetchData() {
			setIsLoading(true);
			const cartResponse = await axios.get("https://60d62397943aa60017768e77.mockapi.io/cart");
			const favoritesResposne = await axios.get(
				"https://6349bcf25df95285140699c7.mockapi.io/favorites"
			);
			const itemsResponse = await axios.get("https://60d62397943aa60017768e77.mockapi.io/items");

			setIsLoading(false);

			setCartItems(cartResponse.data);
			setFavoriteItems(favoritesResposne.data);
			setItems(itemsResponse.data);
		}
		fetchData();
	}, []);

	const [items, setItems] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [cartItems, setCartItems] = React.useState([]);
	const [favoriteItems, setFavoriteItems] = React.useState([]);
	const [cartOpened, setCartOpened] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	const addCartItems = (obj) => {
		console.log(obj);
		if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
			axios.delete(`https://60d62397943aa60017768e77.mockapi.io/cart/${obj.id}`);
			setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
		} else {
			axios.post("https://60d62397943aa60017768e77.mockapi.io/cart", obj);
			setCartItems((prev) => [...prev, obj]);
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
		}
	};

	const deleteCartItems = (currentId) => {
		axios.delete(`https://60d62397943aa60017768e77.mockapi.io/cart/${currentId}`);
		setCartItems((prev) => prev.filter((obj) => obj.id !== currentId));
	};

	const onChangeValue = (event) => {
		setSearchValue(event.target.value);
	};

	const hasItemAdded = (id) => {
		return cartItems.some((item) => Number(item.id) === Number(id));
	};
	return (
		<AppContext.Provider value={{ items, cartItems, favoriteItems, hasItemAdded }}>
			<>
				<div className="wrapper clear">
					<Header onClickCart={() => setCartOpened(true)} />
					<Routes>
						<Route
							path="/"
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
							path="/favorites"
							element={<Favorites addFavoriteItems={addFavoriteItems} />}
						></Route>
					</Routes>
				</div>
				{cartOpened && (
					<Drawer
						items={cartItems}
						onRemove={deleteCartItems}
						onClose={() => setCartOpened(false)}
					/>
				)}
			</>
		</AppContext.Provider>
	);
}

export default App;
