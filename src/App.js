import logo from "./logo.svg";
import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
	return (
		<div className="wrapper clear">
			<Drawer />
			<Header />
			<div className="content p-40">
				<div className="d-flex align-center justify-between">
					<h1>Все кроссовки</h1>
					<div className="search-block d-flex align-center">
						<img className="mr-15" width={14} height={14} alt="search-ico" src="/img/search.svg" />
						<input className="search-block__input" type="text" placeholder="Поиск..." />
					</div>
				</div>
				<div className="d-flex align-center mt-30">
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
			</div>
		</div>
	);
}

export default App;
