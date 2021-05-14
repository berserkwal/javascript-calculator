const numberZero = document.querySelector("#button-0");
const numberOne = document.querySelector("#button-1");
const numberTwo = document.querySelector("#button-2");
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
let totalled = false;

function add(num1, num2) {
	console.log(equationArray);
	equationArray.shift();
	equationArray[0] = num1 + num2;
	console.log(equationArray);
	return;
}

function subtract(num1, num2) {
	console.log(equationArray);
	equationArray.shift();
	equationArray[0] = num1 - num2;
	console.log(equationArray);
	return;
}

function pressedOne() {
	if (totalled) {
		currentDisplay.innerText = 0;
		equationDisplay.innerText = 0;
		totalled = false;
	}
	{
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
}
function pressedTwo() {
	if (totalled) {
		currentDisplay.innerText = 0;
		equationDisplay.innerText = 0;
		totalled = false;
	}
	{
		if (currentDisplay.innerHTML.length <= 9) {
			if (currentDisplay.innerText == 0) currentDisplay.innerText = 2;
			else currentDisplay.innerText += 2;
		} else {
			currentDisplay.innerText = "Over Digital Limit";
			currentDisplay.classList.add("over-limit");
			setTimeout(() => {
				currentDisplay.innerText = 0;
				currentDisplay.classList.remove("over-limit");
			}, 1500);
		}
	}
}

function clear() {
	currentDisplay.innerText = 0;
	currentDisplay.classList.remove("total");
	equationDisplay.innerText = 0;
}

function pressedAdd() {
	if (totalled) {
		equationDisplay.innerText = 0;
		totalled = false;
		currentDisplay.classList.remove("total");
	}
	if (!Number.isNaN(parseFloat(currentDisplay.innerText))) {
		if (
			!(currentDisplay.innerText === "0" && equationDisplay.innerText === "0")
		) {
			if (currentDisplay.innerText !== "0") {
				if (equationDisplay.innerText === "0")
					equationDisplay.innerText =
						parseFloat(currentDisplay.innerText) + "+";
				else {
					equationDisplay.innerText +=
						parseFloat(currentDisplay.innerText) + "+";
				}
				equationArray.push(parseFloat(currentDisplay.innerText));
				currentDisplay.innerText = 0;
				if (equationArray.length > 2) {
					leftoverFinisher();
				}
				leftoverOperation = "+";
			}
		}
	}
}

function pressedSubtract() {
	if (totalled) {
		equationDisplay.innerText = 0;
		totalled = false;
		currentDisplay.classList.remove("total");
	}
	if (!Number.isNaN(parseFloat(currentDisplay.innerText))) {
		if (
			!(currentDisplay.innerText === "0" && equationDisplay.innerText === "0")
		) {
			if (currentDisplay.innerText !== "0") {
				if (equationDisplay.innerText === "0")
					equationDisplay.innerText =
						parseFloat(currentDisplay.innerText) + "-";
				else {
					equationDisplay.innerText +=
						parseFloat(currentDisplay.innerText) + "-";
				}
				equationArray.push(parseFloat(currentDisplay.innerText));
				currentDisplay.innerText = 0;
				if (equationArray.length > 2) {
					leftoverFinisher();
				}
				leftoverOperation = "-";
			}
		}
	}
}

function equals() {
	if (!totalled) {
		if (currentDisplay.innerText !== "0") {
			if (equationDisplay.innerText === "0") {
				equationDisplay.innerText = currentDisplay.innerText;
			} else equationDisplay.innerText += currentDisplay.innerText;
			equationArray.push(parseFloat(currentDisplay.innerText));
			if (equationArray.length > 2) leftoverFinisher();
			console.log(equationArray);
		}
		leftoverFinisher();
		leftoverOperation = "Nope";
		console.log(equationArray[0]);
		if (currentDisplay.innerText === "0") {
			let temp = equationDisplay.innerText;
			equationDisplay.innerText = temp.slice(0, temp.length - 1);
		}
		currentDisplay.innerText = equationArray[0];
		currentDisplay.classList.add("total");
		equationDisplay.innerText += "=" + equationArray[0];
	}
	totalled = true;
	equationArray.shift();
}

function leftoverFinisher() {
	switch (leftoverOperation) {
		case "+":
			add(equationArray[0], equationArray[1]);
			break;
		case "-":
			subtract(equationArray[0], equationArray[1]);
			break;
		case "*":
			multiply(equationArray[0], equationArray[1]);
			break;
		case "/":
			divide(equationArray[0], equationArray[1]);
			break;
	}
}

numberOne.addEventListener("click", pressedOne);
numberTwo.addEventListener("click", pressedTwo);

window.addEventListener("keydown", (e) => {
	console.log(e.key);
	switch (e.key) {
		case "1":
			pressedOne();
			break;
		case "2":
			pressedTwo();
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
		case "=":
		case "Enter":
			equals();
			break;
	}
});

addKey.addEventListener("click", pressedAdd);
subtractKey.addEventListener("click", pressedSubtract);

clearKey.addEventListener("click", clear);

equalsKey.addEventListener("click", equals);
