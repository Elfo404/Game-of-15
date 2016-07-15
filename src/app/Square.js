export default class Square {

	constructor(className, number, elem = 'div') {
		this.square = document.createElement(elem);
		this.square.classList.add(className);
		this.square.style.backgroundPosition = "-" + this.square.style.left + " -" + this.square.style.top;
		this.square.appendChild(document.createTextNode(number));
		this._X=null;
		this._Y=null;
	}

	get X(){
		return this._X;
	}

	get Y(){
		return this._Y;
	}

	set X(X){
		this.square.style.left = (X * 100) + "px";
		this._X=X;
	}
	set Y(Y){
		this.square.style.top = (Y * 100) + "px";
		this._Y=Y;
	}
	
	move(X, Y) {
		this.X=X;
		this.Y=Y;
	};

}