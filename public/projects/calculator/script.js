let display = document.getElementById('display');

function appendNumber(number) {
    if (display.innerText === '0') {
        display.innerText = number;
    } else {
        display.innerText += number;
    }
}

function appendOperator(operator) {
    display.innerText += operator;
}

function appendFunction(func) {
    display.innerText += func + '(';
}

function clearDisplay() {
    display.innerText = '0';
}

function backspace() {
    display.innerText = display.innerText.slice(0, -1);
    if (display.innerText === '') display.innerText = '0';
}

function calculate() {
    try {
        let expression = display.innerText;
        // Replace special symbols
        expression = expression.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
        let result = eval(expression);
        display.innerText = result;
    } catch (e) {
        display.innerText = 'Error';
    }
}
