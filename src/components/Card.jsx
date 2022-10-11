const Card = () => {
	return (
		<div className="card d-flex flex-column">
			<div className="favorite">
				<img width={32} height={32} src="/img/heart-unliked.svg" alt="unliked-ico" />
			</div>
			<img width={133} height={112} src="/img/sneakers/img1.jpg" alt="sneakers-img-1" />
			<p>Мужские Кроссовки Nike Blazer Mid Suede</p>
			<div className="d-flex justify-between align-center">
				<div className=" card__price d-flex flex-column">
					<span>Цена:</span>
					<b>12 999 руб.</b>
				</div>
				<button>
					<img width={11} height={11} src="/img/plus.svg" alt="add-img" />
				</button>
			</div>
		</div>
	);
};
export default Card;
