const keysNumber = 20;
const maxNumber = 12;
const calculatorDiv = document.querySelector('#calculator');
const screenDiv = calculatorDiv.querySelector('#screen');
const currentInputDiv = screenDiv.querySelector('.current-input');
const previousInputDiv = screenDiv.querySelector('.previous-input');
const keysDiv = calculatorDiv.querySelector('#keys');
let currentInputArray = [];
let previousInputArray = [];
let firstNumber = 0; 
let secondNumber = 0
let result = 0;
let operator; 

function createKeys() {    
    keysDiv.style.cssText = `
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: 3%;
    `
    for (let i = 0; i < keysNumber; i++) {
        let button = document.createElement('button');
        button.style.cssText = `
            background-color: #323232;
            border-radius: 12px;
            color: #7e4eac;
            text-align: center;
            font-size: 2em;
            font-weight: bold;
            cursor: pointer;
        `
        keysDiv.appendChild(button);
    }

    markKeys();
}

function markKeys() {
    keysDiv.children[0].textContent = "AC";
    keysDiv.children[1].textContent = "⌫";
    keysDiv.children[2].textContent = "%";
    keysDiv.children[3].textContent = "÷";
    keysDiv.children[4].textContent = "7";
    keysDiv.children[5].textContent = "8";
    keysDiv.children[6].textContent = "9";
    keysDiv.children[7].textContent = "×";
    keysDiv.children[8].textContent = "4";
    keysDiv.children[9].textContent = "5";
    keysDiv.children[10].textContent = "6";
    keysDiv.children[11].textContent = "-";
    keysDiv.children[12].textContent = "1";
    keysDiv.children[13].textContent = "2";
    keysDiv.children[14].textContent = "3";
    keysDiv.children[15].textContent = "+";
    keysDiv.children[16].textContent = "0";
    keysDiv.children[17].textContent = "00";
    keysDiv.children[18].textContent = ".";
    keysDiv.children[19].textContent = "=";

    for (let key of keysDiv.children) {
        key.addEventListener('click', () => {
            processUserInput(key);
        });
    }
}

function processUserInput(input) {
    currentInputArray = currentInputDiv.innerText.split('');
    previousInputArray = previousInputDiv.innerText.split('');
    
    if (input.innerText == 'AC') {
        acInput();
    }
    else if (input.innerText == '⌫') {
        backspaceInput(currentInputArray);
    }
    else if (Number.isInteger(Number(input.innerText)) || input.innerText == '.') {
        numbersInput(currentInputArray, input);
    }
    else if (input.innerText == '+' || input.innerText == '-' || 
        input.innerText == '×' || input.innerText == '÷') {
            operatorsInput(previousInputArray, input);
    }
    else if (input.innerText == '=') {
        equalInput();
    }
}

function acInput() {
    firstNumber = 0;
    secondNumber = 0;
    result = 0;
    operator = '';
    currentInputDiv.textContent = 0;
    previousInputDiv.textContent = '';
}

function backspaceInput(currentInputArray) {
    if (currentInputArray.length == 1 && currentInputArray[0] == 0) return;

    currentInputArray.length == 1 ? 
    currentInputDiv.textContent = 0 :
    currentInputDiv.textContent = currentInputDiv.textContent.slice(0, -1);
}

function numbersInput(currentInputArray, input) {
    if (currentInputArray.length >= maxNumber) return;

    if (currentInputArray.length == 1 && currentInputArray[0] == 0 &&
        (input.innerText == '0' || input.innerText == '00')) {
            return;
    }

    if (operator == '') {
        acInput();
        currentInputArray = currentInputDiv.innerText.split('');
    }

    (currentInputArray.length == 1 && currentInputArray[0] == 0) ?
        currentInputDiv.innerText = input.innerText :
        currentInputDiv.innerText += input.innerText;
}

function operatorsInput(previousInputArray, input) {
    if (previousInputArray.length == 0) {
        firstNumber = Number(currentInputDiv.innerText);
        operator = input.innerText;
        secondNumber = 0;
        previousInputDiv.innerText = `${firstNumber} ${operator}`;
        currentInputDiv.innerText = secondNumber;
    }
    else {
        secondNumber = currentInputDiv.innerText;
        calculate();
        firstNumber = result;
        secondNumber = 0;
        operator = input.innerText;
        result = 0;
        previousInputDiv.innerText = `${firstNumber} ${operator}`;
        currentInputDiv.innerText = secondNumber;
    }
}

function equalInput() {
    secondNumber = currentInputDiv.innerText;
    calculate();
    secondNumber = 0;
    firstNumber = result;
    operator = '';
    currentInputDiv.textContent = result;
    previousInputDiv.textContent = result;
}

function calculate() {
    switch (operator) {
        case '+':
            result = Number(firstNumber) + Number(secondNumber);
            break;
        case '-':
            result = Number(firstNumber) - Number(secondNumber);
            break;
        case '×':
            result = Number(firstNumber) * Number(secondNumber);
            break;
        case '÷':
            result = Number(firstNumber) / Number(secondNumber);
            break;
    }
}

createKeys();