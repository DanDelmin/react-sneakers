const Drawer = ({ onClose, onRemove, items = [] }) => {
	return (
		<div className="overlay">
			<div className="drawer d-flex flex-column p-30">
				<h2 className="d-flex align-center justify-between">
					Корзина
					<img
						onClick={onClose}
						className="delete-btn cu-p"
						src="/img/cart-delete.svg"
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
										src="/img/cart-delete.svg"
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
									<b>21 498 руб. </b>
								</li>
								<li className="mb-20">
									<span>Налог 5%: </span>
									<div></div>
									<b>1074 руб.</b>
								</li>
							</ul>
							<button className="greenBtn">
								Оформить заказ <img src="/img/btn-arrow.svg" alt="arrow-ico" />
							</button>
						</div>
					</>
				) : (
					<center className="d-flex flex-column justify-center flex align-center">
						<img width={120} height={120} src="/img/cart-empty.jpg" alt="cart-empty_img" />
						<h3>Корзина пустая</h3>
						<button onClick={onClose} className="greenBtn mt-20">
							Вернуться назад
						</button>
					</center>
				)}
			</div>
		</div>
	);
};
export default Drawer;
