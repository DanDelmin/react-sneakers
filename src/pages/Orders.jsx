import React from "react";
import axios from "axios";
import Card from "../components/Card";

const Orders = () => {
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchData() {
			try {
				const ordersResponse = await axios.get(
					"https://6349bcf25df95285140699c7.mockapi.io/orders"
				);
				//вытащить массивы из массива (Infinity - любая вложенность)
				setOrders(ordersResponse.data.map((obj) => obj.items).flat(Infinity));
				setIsLoading(false);
			} catch (error) {
				alert("Ошибка при запросе заказов");
				console.error(error);
			}
		}
		fetchData();
	}, []);
	return (
		<div className="content p-40">
			<div className="d-flex align-center justify-between">
				<h1>Мои покупки</h1>
			</div>
			<div className="d-flex flex-wrap align-center mt-30">
				{(isLoading ? [...Array(7)] : orders).map((obj, index) => (
					<Card {...obj} key={index} loading={isLoading} />
				))}
			</div>
		</div>
	);
};

export default Orders;
