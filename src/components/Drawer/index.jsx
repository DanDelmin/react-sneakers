import React from "react";
import axios from "axios";
import Info from "../Info";
import { useCart } from "../../hooks/useCart";
import AppContext from "../../context";
import styles from "./Drawer.module.scss";

axios.get("https://6349bcf25df95285140699c7.mockapi.io/orders");

const Drawer = ({ onClose, onRemove, items = [] }) => {
	const { cartOpened } = React.useContext(AppContext);

	const [isOrderComplete, setIsOrderComplete] = React.useState(false);
	const [orderId, setOrderId] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(false);
	//custom hook
	const { cartItems, setCartItems, totalPrice } = useCart();

	const onClickOrder = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post("https://6349bcf25df95285140699c7.mockapi.io/orders", {
				items: cartItems,
			});
			await axios.post("https://6349bcf25df95285140699c7.mockapi.io/cart", []);
			setOrderId(data.id);
			setIsOrderComplete(true);
			setCartItems([]);
		} catch (error) {
			alert("Не удалось оформить заказ");
		}
		setIsLoading(false);
	};
	return (
		<div className={`${styles.overlay} ${cartOpened ? styles.overlayFixed : ""}`}>
			<div className={`${styles.drawer} d-flex flex-column p-30`}>
				<h2 className="d-flex align-center justify-between">
					Корзина
					<img
						onClick={onClose}
						className="delete-btn cu-p"
						src="img/cart-delete.svg"
						alt="delete-ico"
					/>
				</h2>
				{items.length > 0 ? (
					<>
						<div className="items flex">
							{items.map((obj) => (
								<div
									key={obj.id}
									className="cartItem d-flex align-center justify-between p-20 mb-20"
								>
									<img width={70} height={70} src={obj.imageUrl} alt="img1" />
									<div className="d-flex flex-column ml-20 mr-15">
										<p>{obj.title}</p>
										<b>{obj.price}</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className="delete-btn"
										src="img/cart-delete.svg"
										alt="delete-ico"
									/>
								</div>
							))}
						</div>
						<div className="cartTotalBlock">
							<ul>
								<li className="mb-20">
									<span>Итого: </span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li className="mb-20">
									<span>Налог 5%: </span>
									<div></div>
									<b>{(totalPrice - totalPrice * 0.95).toFixed(2)} руб.</b>
								</li>
							</ul>
							<button disabled={isLoading} onClick={onClickOrder} className="greenBtn">
								Оформить заказ <img src="img/btn-arrow.svg" alt="arrow-ico" />
							</button>
						</div>
					</>
				) : (
					<Info
						title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
						description={
							isOrderComplete
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
						}
						imgUrl={isOrderComplete ? "img/order-complete.png" : "img/cart-empty.jpg"}
					/>
				)}
			</div>
		</div>
	);
};
export default Drawer;
