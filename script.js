const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let resultDisplayed = false;

function updateDisplay(value) {
  display.textContent = value || "0";
}

function calculate() {
  try {
    const safeInput = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
    const result = eval(safeInput);
    currentInput = result.toString();
    updateDisplay(result);
    resultDisplayed = true;
  } catch {
    updateDisplay("Error");
    currentInput = "";
  }
}

function handleInput(key) {
  if (key === "C") {
    currentInput = "";
    updateDisplay("");
  } else if (key === "Back") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (key === "=") {
    calculate();
  } else {
    if (resultDisplayed && !isNaN(key)) {
      currentInput = key;
    } else {
      currentInput += key;
    }
    updateDisplay(currentInput);
    resultDisplayed = false;
  }
}

// Button click support
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-key");
    handleInput(key);
  });
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ("0123456789+-*/.=BackspaceEnter".includes(key) || key === "Escape") {
    e.preventDefault();
    if (key === "Enter") handleInput("=");
    else if (key === "Backspace") handleInput("Back");
    else if (key === "Escape") handleInput("C");
    else if (key === "*") handleInput("×");
    else if (key === "/") handleInput("÷");
    else handleInput(key);
  }
});
