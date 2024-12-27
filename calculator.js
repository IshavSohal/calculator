let operand1 = 0;
let operand2 = 0;
let operator = "";

let digitButtons = document.querySelectorAll("#numbers > .col > button");
let operatorButtons = document.querySelectorAll("#buttons > #controls > #operators > .col > button");
let display = document.querySelector("#display > input");
let clearButton = document.querySelector("#clear");
let equalButton = document.querySelector("#equal");
let backspaceButton = document.querySelector("#backspace");

const add = (x, y) => x + y;

const subtract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const divide = (x, y) => x / y;

const operate = (x, y, operator) => {
    switch (operator) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
    }
};

digitButtons.forEach((button) => {
    if (button.innerText !== "(-)") {
        button.addEventListener("click", () => {
            display.value += button.innerText;
        });
    } else {
        button.addEventListener("click", () => {
            display.value += "-";
        });
    }
});

operatorButtons.forEach((button) => {
    if (!["clear", "equal", "backspace"].includes(button.id)) {
        button.addEventListener("click", () => {
            display.value += button.innerText;
        });
    }
});

clearButton.addEventListener("click", () => {
    display.value = "";
});

equalButton.addEventListener("click", () => {
    const operation = display.value.split(/[-+/x]/);
    console.log("operation");
    console.log(operation);
});

backspaceButton.addEventListener("click", () => {
    display.value = display.value.substr(0, display.value.length - 1);
});
