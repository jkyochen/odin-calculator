
let btn = document.querySelector(".button-area");
let screen = document.querySelector(".screen");
let chars = [];

btn.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn")) {
        return;
    }

    let char = e.target.textContent;
    let isNum = e.target.classList.contains("digit");
    let isOperator = e.target.classList.contains("operator");
    let isUnary = e.target.classList.contains("unary");

    if (isNum) {
        char = Number(char);
    }
    if (isNum && chars.length && Number.isFinite(chars[chars.length - 1])) {
        if (chars[chars.length - 1] > 0) {
            chars[chars.length - 1] = chars[chars.length - 1] * 10 + char;
        } else {
            chars[chars.length - 1] = chars[chars.length - 1] * 10 - char;
        }
    } else if (isNum || isOperator) {
        chars.push(char);
    }

    if (isNum) {
        screen.textContent = chars[chars.length - 1];
        return;
    }

    if (isUnary) {
        if (char === "AC") {
            screen.textContent = 0;
            chars = [];
        } else if (char === "+/-" && chars.length) {
            chars[chars.length - 1] = -chars[chars.length - 1];
            screen.textContent = chars[chars.length - 1];
        }
        return;
    }

    if (isOperator && chars.length === 4) {
        let result = operate(chars[0], chars[1], chars[2]);
        screen.textContent = result;
        if (char === "=") {
            chars = [result];
        } else {
            chars = [result, char];
        }
    }
});

function operate(a, op, b) {
    if (op === "+") {
        return add(a, b);
    }
    if (op === "-") {
        return subtract(a, b);
    }
    if (op === "*") {
        return multiply(a, b);
    }
    if (op === "/") {
        return divide(a, b);
    }
    return 0;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
