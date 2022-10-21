import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Header = (props) => {
	const { totalPrice } = useCart();
	return (
		<header className="d-flex justify-between align-center p-40">
			<Link to="/">
				<div className="d-flex align-center">
					<img width="40" height="40" className="mr-15" src="img/logo.png" alt="logo" />

					<div>
						<h3 className="text-uppercase">REACT SNEAKERS</h3>
						<p>Магазин лучших кроссовок</p>
					</div>
				</div>
			</Link>
			<ul className="d-flex align-center">
				<li onClick={props.onClickCart} className="mr-30 d-flex align-center cu-p">
					<img className="mr-5" src="img/cart.svg" alt="cart-ico" />
					<span>{totalPrice} руб.</span>
				</li>
				<li className="mr-30">
					<Link to="/favorites">
						<img src="img/favorite.svg" alt="favorite-ico" />
					</Link>
				</li>
				<li>
					<Link to="/orders">
						<img src="img/user.svg" alt="user-ico" />
					</Link>
				</li>
			</ul>
		</header>
	);
};

export default Header;
