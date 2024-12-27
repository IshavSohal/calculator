let operands = [];
let operator = "";
let errorState = false;

let digitButtons = document.querySelectorAll(".number");
let operatorButtons = document.querySelectorAll("#buttons #controls button");
let display = document.querySelector("#display > input");
let clearButton = document.querySelector("#clear");
let equalButton = document.querySelector("#equal");
let backspaceButton = document.querySelector("#backspace");
let decimalButton = document.querySelector("#decimal");
let signChangeButton = document.querySelector("#signChange");

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = (x, y, operator) => {
    console.log(x);
    console.log(y);
    console.log(operator);
    switch (operator) {
        case "+":
            return add(+x, +y);
        case "-":
            return subtract(+x, +y);
        case "x":
            return multiply(+x, +y);
        case "/":
            return divide(+x, +y);
    }
};

const invalidOperation = () => {
    display.value = "";
    alert("Invalid Operation. Try again");
};

digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (errorState === true) {
            display.value = "";
            errorState = false;
        }
        display.value += button.innerText;
    });
});

signChangeButton.addEventListener("click", () => {
    // should be applied on the current operand, which is operands.at(-1)
    if (errorState === true) {
        display.value = "";
        errorState = false;
    }
    console.log(operands.slice(0, 1).concat(-operands.at(-1)));
    display.value += "-";
});

operatorButtons.forEach((button) => {
    if (!["clear", "equal", "backspace"].includes(button.id)) {
        button.addEventListener("click", () => {
            if (errorState === true) {
                display.value = "";
                errorState = false;
            }
            evalOperation();
            display.value += button.innerText;
            operator = button.innerText;
        });
    }
});

clearButton.addEventListener("click", () => {
    display.value = "";
    operands = [];
    operator = "";
});

const evalOperation = () => {
    operands = display.value.split(/[-+/x]/);
    console.log("operands");
    console.log(operands);
    const validOperands = operands.reduce(
        (onlyNumbers, current) => onlyNumbers && !isNaN(current) && !isNaN(parseFloat(current)),
        true
    );

    if (validOperands && operands.length === 2) {
        console.log(operator);
        // we must evaluate the operation
        display.value = operate(operands[0], operands[1], operator);
        operator = "";
        operands = [+display.value];
        return true;
    } else {
        return false;
    }
};

equalButton.addEventListener("click", () => {
    const success = evalOperation();
    if (!success) {
        display.value = "ERROR";
        errorState = true;
    }
});

backspaceButton.addEventListener("click", () => {
    if (errorState === false) {
        display.value = display.value.substr(0, display.value.length - 1);
    }
});
