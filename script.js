let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

function chooseOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(value)) {
        firstOperand = value;
    } else if (operator) {
        const result = calculateResult(firstOperand, value, operator);
        displayValue = parseFloat(result.toFixed(7)).toString();
        firstOperand = result;
    }

    operator = nextOperator;
    waitingForSecondOperand = true;
    updateDisplay();
}

function calculateResult(first, second, operator) {
    if (operator === '+') return first + second;
    if (operator === '-') return first - second;
    if (operator === '*') return first * second;
    if (operator === '/') return first / second;
    return second;
}

function calculate() {
    if (operator === null) return;
    const value = parseFloat(displayValue);
    const result = calculateResult(firstOperand, value, operator);
    displayValue = parseFloat(result.toFixed(7)).toString();
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

updateDisplay();
