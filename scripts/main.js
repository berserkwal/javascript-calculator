const numericButtons = document.querySelectorAll("[number-button]");
const operatorButtons = document.querySelectorAll("[operator-button]");
const decimalButton = document.querySelector("#button-decimal");
const deleteButton = document.querySelector("#button-clear");
const clearAllButton = document.querySelector("#button-allclear");
const mainDisplay = document.querySelector(".current");
const equalButton = document.querySelector("#button-equals");
const reverseButton = document.querySelector("#button-reverse-sign");

let precedingOperand = null;
let currentOperand = null;
let operator = null;
let operatorAdded = false;
let decimalAdded = false;
let isTotalled = false;
let total = null;

function appendToScreen(num = 0) {
	if (Number.isNaN(Number(mainDisplay.innerText))) return;
	if (mainDisplay.innerText === "0" || operatorAdded || isTotalled) {
		mainDisplay.classList.remove("total");
		mainDisplay.innerText = num;
		operatorAdded = false;
		isTotalled = false;
	} else mainDisplay.innerText += num;

	if (mainDisplay.innerText.length >= 10) {
		mainDisplay.innerText = "O/L";
		mainDisplay.classList.add("error");
	}
}

function clearAll() {
	mainDisplay.classList.remove("error");
	operatorButtons.forEach((depressedButton) =>
		depressedButton.classList.remove("depressed")
	);
	mainDisplay.innerText = 0;
	mainDisplay.classList.remove("total");
	mainDisplay.classList.remove("error");
	precedingOperand = null;
	currentOperand = null;
	operator = null;
	operatorAdded = false;
	isTotalled = false;
	total = null;
}

function deleteOnce() {
	if (mainDisplay.innerText === "O/L" || mainDisplay.innerText === "D/0") {
		mainDisplay.classList.remove("error");
		mainDisplay.innerText = 0;
		return;
	}
	if (isTotalled) {
		clearAll();
		return;
	}
	mainDisplay.classList.remove("total");
	if (mainDisplay.innerText.length > 1) {
		mainDisplay.innerText = mainDisplay.innerText.slice(
			0,
			mainDisplay.innerText.length - 1
		);
	} else mainDisplay.innerText = 0;
}

function operation(opr8r) {
	if (isTotalled) {
		let temp = total;
		clearAll();
		precedingOperand = temp;
		mainDisplay.innerText = temp;
		operator = opr8r;
		isTotalled = false;
		operatorAdded = true;
		return;
	}

	if (!precedingOperand && !operator) {
		precedingOperand = Number(mainDisplay.innerText);
		operator = opr8r;
	} else {
		if (!currentOperand) {
			if (operatorAdded) {
				operator = opr8r;
			} else {
				currentOperand = Number(mainDisplay.innerText);
				evaluate();
				operator = opr8r;
			}
		} else {
			evaluate();
			currentOperand = Number(mainDisplay.innerText);
			operator = opr8r;
		}
	}
	operatorAdded = true;
}

function evaluate() {
	switch (operator) {
		case "+":
			total = add();
			break;
		case "-":
			total = subtract();
			break;
		case "*":
			total = multiply();
			break;
		case "/":
			total = divide();
			break;
	}

	total = Math.round(total * 100000) / 100000;
	precedingOperand = total;
	mainDisplay.innerText = total;
	currentOperand = null;
	operatorAdded = false;
}

function equate() {
	if (mainDisplay.innerText === "0" && operator === "/") {
		mainDisplay.innerText = "D/0";
		mainDisplay.classList.add("error");
		return;
	}

	operatorButtons.forEach((depressedButton) =>
		depressedButton.classList.remove("depressed")
	);
	if (!precedingOperand) {
		return;
	}
	mainDisplay.classList.add("total");

	if (!currentOperand) {
		if (operatorAdded) {
			mainDisplay.innerText = precedingOperand;
		} else {
			currentOperand = Number(mainDisplay.innerText);
			evaluate();
		}
	} else {
		evaluate();
	}
	isTotalled = true;
	operator = null;
}

function add() {
	return precedingOperand + currentOperand;
}
function multiply() {
	return precedingOperand * currentOperand;
}
function subtract() {
	return precedingOperand - currentOperand;
}
function divide() {
	return precedingOperand / currentOperand;
}

function preNumeric() {
	// mainDisplay.classList.remove("error");
	operatorButtons.forEach((depressedButton) =>
		depressedButton.classList.remove("depressed")
	);
	if (isTotalled) {
		clearAll();
		isTotalled = false;
	}
}

function preOperator() {
	operatorButtons.forEach((depressedButton) =>
		depressedButton.classList.remove("depressed")
	);
}

function insertDecimal() {
	if (!mainDisplay.innerHTML.includes(".")) {
		preNumeric();
		if (mainDisplay.innerText === "0") appendToScreen("0.");
		else appendToScreen(".");
	}
}

function reverseSign() {
	mainDisplay.innerText = -Number(mainDisplay.innerText);
}

numericButtons.forEach((button) => {
	button.addEventListener("click", () => {
		preNumeric();
		appendToScreen(button.getAttribute("number-button"));
	});
});

operatorButtons.forEach((button) => {
	button.addEventListener("click", () => {
		preOperator();
		button.classList.add("depressed");
		operation(button.getAttribute("operator-button"));
	});
});

decimalButton.addEventListener("click", insertDecimal);

clearAllButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", () => deleteOnce());
equalButton.addEventListener("click", equate);
reverseButton.addEventListener("click", reverseSign);

window.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "0":
			preNumeric();
			appendToScreen("0");
			break;
		case "1":
			preNumeric();
			appendToScreen("1");
			break;
		case "2":
			preNumeric();
			appendToScreen("2");
			break;
		case "3":
			preNumeric();
			appendToScreen("3");
			break;
		case "4":
			preNumeric();
			appendToScreen("4");
			break;
		case "5":
			preNumeric();
			appendToScreen("5");
			break;
		case "6":
			preNumeric();
			appendToScreen("6");
			break;
		case "7":
			preNumeric();
			appendToScreen("7");
			break;
		case "8":
			preNumeric();
			appendToScreen("8");
			break;
		case "9":
			preNumeric();
			appendToScreen("9");
			break;
		case ".":
			insertDecimal();
			break;
		case "+":
		case "a":
		case "A":
			preOperator();
			document
				.querySelector(`[operator-button="+"]`)
				.classList.add("depressed");
			operation("+");
			break;
		case "-":
		case "s":
		case "S":
			preOperator();
			document
				.querySelector(`[operator-button="-"]`)
				.classList.add("depressed");
			operation("-");
			break;
		case "*":
		case "m":
		case "M":
			preOperator();
			document
				.querySelector(`[operator-button="*"]`)
				.classList.add("depressed");
			operation("*");
			break;
		case "/":
		case "d":
		case "D":
			preOperator();
			document
				.querySelector(`[operator-button="/"]`)
				.classList.add("depressed");
			operation("/");
			break;
		case "Enter":
		case "=":
			equate();
			break;
		case "Backspace":
		case "Escape":
			deleteOnce();
			break;
		case "Delete":
			clearAll();
			break;
	}
});
