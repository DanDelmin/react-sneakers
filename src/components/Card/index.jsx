import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import styles from "./Card.module.scss";

const Card = ({
	id,
	parentId,
	title,
	price,
	imageUrl,
	onPlus,
	onFavorite,
	favorited = false,
	loading = false,
}) => {
	const { hasItemAdded } = React.useContext(AppContext);
	const [isFavotie, setIsFavotie] = React.useState(favorited);
	const obj = { id, parentId: id, title, imageUrl, price };

	const onClickPlus = () => {
		onPlus(obj);
	};
	const onClickFavorite = () => {
		onFavorite(obj);
		setIsFavotie(!isFavotie);
	};
	return (
		<div className={`${styles.card} d-flex flex-column`}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={150}
					height={190}
					viewBox="0 0 150 190"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
					<rect x="0" y="105" rx="5" ry="5" width="150" height="15" />
					<rect x="0" y="125" rx="5" ry="5" width="90" height="15" />
					<rect x="0" y="160" rx="10" ry="10" width="80" height="24" />
					<rect x="118" y="154" rx="10" ry="10" width="32" height="32" />
				</ContentLoader>
			) : (
				<>
					{onFavorite && (
						<div className={styles.favorite}>
							<img
								onClick={onClickFavorite}
								width={32}
								height={32}
								src={isFavotie ? "img/heart-liked.svg" : "img/heart-unliked.svg"}
								alt="unliked-ico"
							/>
						</div>
					)}
					<img width={133} height={112} src={imageUrl} alt="sneakers-img" />
					<p>{title}</p>
					<div className="d-flex justify-between align-center">
						<div className=" card__price d-flex flex-column">
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						{onPlus && (
							<img
								className={styles.plus}
								onClick={onClickPlus}
								src={hasItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"}
								alt="add-img"
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};
export default Card;
