const numberZero = document.querySelector("#button-0");
const numberOne = document.querySelector("#button-1");
const numberTwp = document.querySelector("#button-2");
const numberThree = document.querySelector("#button-3");
const numberFour = document.querySelector("#button-3");
const numberFive = document.querySelector("#button-4");
const numberSix = document.querySelector("#button-5");
const numberSeven = document.querySelector("#button-6");
const numberEight = document.querySelector("#button-7");
const numberNine = document.querySelector("#button-8");
const decimalKey = document.querySelector("#button-9");

const clearKey = document.querySelector("#button-clear");
const multiplyKey = document.querySelector("#button-mul");
const divideKey = document.querySelector("#button-div");
const addKey = document.querySelector("#button-add");
const subtractKey = document.querySelector("#button-sub");
const equalsKey = document.querySelector("#button-equals");

const currentDisplay = document.querySelector(".current");
const equationDisplay = document.querySelector(".equation");
const totalDisplay = document.querySelector(".total");

const equationArray = [];
let leftoverOperation = "Nope";

function add(num1, num2) {
	console.log(equationArray);
	equationArray.shift();
	equationArray[0] = num1 + num2;
	console.log(equationArray);
	return;
}

function pressedOne() {
	if (currentDisplay.innerHTML.length <= 9) {
		if (currentDisplay.innerText == 0) currentDisplay.innerText = 1;
		else currentDisplay.innerText += 1;
	} else {
		currentDisplay.innerText = "Over Digital Limit";
		currentDisplay.classList.add("over-limit");
		setTimeout(() => {
			currentDisplay.innerText = 0;
			currentDisplay.classList.remove("over-limit");
		}, 1500);
	}
}

function clear() {
	currentDisplay.innerText = 0;
	currentDisplay.classList.remove("total");
	equationDisplay.innerText = 0;
}

function pressedAdd() {
	if (!Number.isNaN(parseFloat(currentDisplay.innerText))) {
		if (equationDisplay.innerText == 0)
			equationDisplay.innerText = parseFloat(currentDisplay.innerText) + "+";
		else {
			equationDisplay.innerText += parseFloat(currentDisplay.innerText) + "+";
		}
		equationArray.push(parseFloat(currentDisplay.innerText));
		currentDisplay.innerText = 0;
		if (equationArray.length > 2) {
			switch (leftoverOperation) {
				case "+":
					add(equationArray[0], equationArray[1]);
					break;
				case "-":
					sub(equationArray[0], equationArray[1]);
					break;
				case "*":
					multiply(equationArray[0], equationArray[1]);
					break;
				case "/":
					divide(equationArray[0], equationArray[1]);
					break;
			}
		}
		leftoverOperation = "+";
	}
}

numberOne.addEventListener("click", pressedOne);

window.addEventListener("keydown", (e) => {
	console.log(e.key);
	switch (e.key) {
		case "1":
			pressedOne();
			break;
		case "Backspace":
		case "c":
		case "C":
			clear();
			break;
		case "+":
		case "A":
		case "a":
			pressedAdd();
			break;
	}
});

addKey.addEventListener("click", pressedAdd);

clearKey.addEventListener("click", clear);
