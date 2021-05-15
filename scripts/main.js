const numberZero = document.querySelector("#button-0");
const numberOne = document.querySelector("#button-1");
const numberTwo = document.querySelector("#button-2");
const numberThree = document.querySelector("#button-3");
const numberFour = document.querySelector("#button-4");
const numberFive = document.querySelector("#button-5");
const numberSix = document.querySelector("#button-6");
const numberSeven = document.querySelector("#button-7");
const numberEight = document.querySelector("#button-8");
const numberNine = document.querySelector("#button-9");
const decimalKey = document.querySelector("#button-decimal");

const multiplyKey = document.querySelector("#button-mul");
const divideKey = document.querySelector("#button-div");
const addKey = document.querySelector("#button-add");
const subtractKey = document.querySelector("#button-sub");

const clearKey = document.querySelector("#button-clear");
const equalsKey = document.querySelector("#button-equals");

const currentDisplay = document.querySelector(".current");
const equationDisplay = document.querySelector(".equation");
const totalDisplay = document.querySelector(".total");

let equation = [];
const operatorCheck = ["+", "-", "*", "/"];
let solution = 0;
let addedDecimal = false;
let totalled = false;

function pressedNumber(num) {
	if (totalled) {
		clear();
	}
	{
		if (currentDisplay.innerHTML.length <= 9) {
			if (
				currentDisplay.innerText === "0" ||
				operatorCheck.includes(currentDisplay.innerText)
			) {
				currentDisplay.innerText = num;
			} else currentDisplay.innerText += num;
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

function pressedDecimal() {
	if (totalled) {
		clear();
	}
	{
		if (currentDisplay.innerHTML.length <= 9) {
			if (
				currentDisplay.innerText === "0" ||
				operatorCheck.includes(currentDisplay.innerText)
			) {
				currentDisplay.innerText = "0.";
			} else if (addedDecimal)
				currentDisplay.innerText = currentDisplay.innerText;
			else currentDisplay.innerText += ".";
			addedDecimal = true;
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
	equation.splice(0, equation.length);
	totalled = false;
	addedDecimal = false;
	// solution = 0;
}

function pressedAdd() {
	if (totalled) {
		clear();
		equation.push(solution);
		equation.push("+");
	}
	equationDisplay.innerText = "0";
	if (currentDisplay.innerText !== "0") {
		equation.push(currentDisplay.innerText);
		equation.push("+");
		currentDisplay.innerText = "+";
	}
	equationDisplay.innerText = equation.join("");
	addedDecimal = false;
}

function pressedSubtract() {
	if (totalled) {
		clear();
		equation.push(solution);
		equation.push("-");
	}
	equationDisplay.innerText = "0";
	if (currentDisplay.innerText !== "0") {
		equation.push(currentDisplay.innerText);
		equation.push("-");
		currentDisplay.innerText = "-";
	}
	equationDisplay.innerText = equation.join("");
	addedDecimal = false;
}

function pressedMultiply() {
	if (totalled) {
		clear();
		equation.push(solution);
		equation.push("*");
	}
	equationDisplay.innerText = "0";
	if (!operatorCheck.includes(currentDisplay.innerText)) {
		equation.push(currentDisplay.innerText);
		equation.push("*");
		currentDisplay.innerText = "*";
	}
	equationDisplay.innerText = equation.join("");
	addedDecimal = false;
}

function pressedDivide() {
	if (totalled) {
		clear();
		equation.push(solution);
		equation.push("/");
	}
	equationDisplay.innerText = "0";
	if (!operatorCheck.includes(currentDisplay.innerText)) {
		equation.push(currentDisplay.innerText);
		equation.push("/");
		currentDisplay.innerText = "/";
	}
	equationDisplay.innerText = equation.join("");
	addedDecimal = false;
}

function equals() {
	if (!operatorCheck.includes(currentDisplay.innerText)) {
		equation.push(currentDisplay.innerText);
	}
	if (equation.length % 2 === 0) equation.pop();
	let equationString = equation.join("");
	console.log(equationString);
	solution = parseFloat(eval(equationString).toFixed(9));
	currentDisplay.innerText = solution;
	totalled = true;
	currentDisplay.classList.add("total");
	equationDisplay.innerText = equationString + "=" + solution;
}

window.addEventListener("keydown", (e) => {
	// console.log(e.key);
	switch (e.key) {
		case "1":
			pressedNumber(1);
			break;
		case "2":
			pressedNumber(2);
			break;
		case "3":
			pressedNumber(3);
			break;
		case "4":
			pressedNumber(4);
			break;
		case "5":
			pressedNumber(5);
			break;
		case "6":
			pressedNumber(6);
			break;
		case "7":
			pressedNumber(7);
			break;
		case "8":
			pressedNumber(8);
			break;
		case "9":
			pressedNumber(9);
			break;
		case "0":
			pressedNumber(0);
			break;
		case ".":
			pressedDecimal();
			break;
		case "Delete":
		case "c":
		case "C":
			clear();
			break;
		case "+":
		case "A":
		case "a":
			pressedAdd();
			break;
		case "-":
		case "S":
		case "s":
			pressedSubtract();
			break;
		case "*":
		case "M":
		case "m":
			pressedMultiply();
			break;
		case "/":
		case "D":
		case "d":
			pressedDivide();
			break;
		case "=":
		case "Enter":
			equals();
			break;
		case "Backspace":
			backspace();
			break;
	}
});

numberZero.addEventListener("click", () => pressedNumber(0));
numberOne.addEventListener("click", () => pressedNumber(1));
numberTwo.addEventListener("click", () => pressedNumber(2));
numberThree.addEventListener("click", () => pressedNumber(3));
numberFour.addEventListener("click", () => pressedNumber(4));
numberFive.addEventListener("click", () => pressedNumber(5));
numberSix.addEventListener("click", () => pressedNumber(6));
numberSeven.addEventListener("click", () => pressedNumber(7));
numberEight.addEventListener("click", () => pressedNumber(8));
numberNine.addEventListener("click", () => pressedNumber(9));
decimalKey.addEventListener("click", pressedDecimal);

addKey.addEventListener("click", pressedAdd);
subtractKey.addEventListener("click", pressedSubtract);
multiplyKey.addEventListener("click", pressedMultiply);
divideKey.addEventListener("click", pressedDivide);

clearKey.addEventListener("click", clear);

equalsKey.addEventListener("click", equals);
