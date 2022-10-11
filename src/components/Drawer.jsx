const Drawer = () => {
	return (
		<div className="overlay" style={{ display: "none" }}>
			<div className="drawer d-flex flex-column p-30">
				<h2 className="d-flex align-center justify-between">
					Корзина <img className="delete-btn cu-p" src="/img/cart-delete.svg" alt="delete-ico" />
				</h2>
				<div className="items flex">
					<div className="cartItem d-flex align-center justify-between p-20 mb-20">
						<img width={70} height={70} src="/img/sneakers/img1.jpg" alt="img1" />
						<div className="d-flex flex-column ml-20 mr-15">
							<p>Мужские Кроссовки Nike Air Max 270</p>
							<b>12 999 руб.</b>
						</div>
						<img className="delete-btn" src="/img/cart-delete.svg" alt="delete-ico" />
					</div>
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
			</div>
		</div>
	);
};
export default Drawer;
