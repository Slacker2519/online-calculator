const keysNumber = 20;
const calculatorDiv = document.querySelector('#calculator');
const screenDiv = calculatorDiv.querySelector('#screen');
const keysDiv = calculatorDiv.querySelector('#keys');

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
            font-size: 2.5em;
            font-weight: bold;
        `
        button.textContent = `${i}`;
        keysDiv.appendChild(button);
    }
}

createKeys();