const cost_price = document.querySelector("#cost-price");
const stock_quantity = document.querySelector("#stock-quantity");
const current_price = document.querySelector("#current-price");
const submit_btn = document.querySelector("#check-btn");
const outputH3 = document.querySelector("#outputH3");
const errorH3 = document.querySelector("#errorH3");
const containerMain = document.querySelector("#app");

submit_btn.addEventListener("click", submitHandler);

function submitHandler(e) {
  e.preventDefault();
  if (isValidInput(cost_price, stock_quantity, current_price)) {
    console.log("hello");
    calculateProfitLoss(cost_price, stock_quantity, current_price);
  }
}

function isValidInput(cost, stock_qty, current) {
  if (cost.value === "" || stock_qty.value === "" || current.value === "") {
    setError("Please enter all the values");
  } else if (
    Number(cost.value) <= 0 ||
    Number(stock_qty.value) <= 0 ||
    Number(current.value) <= 0
  ) {
    setError("Please enter valid values. Values should be greater than zero");
  } else {
    return true;
  }
}

function calculateProfitLoss(cost, stock_quantity, current) {
  let cost_price = Number(cost.value);
  let curr_price = Number(current.value);
  let quantity = Number(stock_quantity.value);

  if (cost_price > curr_price) {
    let loss = ((cost_price - curr_price) * quantity).toFixed(2);
    let loss_percent = ((loss / (cost_price * quantity)) * 100).toFixed(2);
    setOutput("Loss", loss, loss_percent);
  } else if (cost_price < curr_price) {
    let profit = ((curr_price - cost_price) * quantity).toFixed(2);
    let profit_percent = ((profit / (cost_price * quantity)) * 100).toFixed(2);
    setOutput("Profit", profit, profit_percent);
  } else {
    setOutput("Neutral");
  }
}

function setError(text) {
  errorH3.innerText = text;
}

function setOutput(status, amount, percentage) {
  switch (status) {
    case "Profit":
      outputH3.innerHTML = `The profit is ${amount} and the profit percentage is ${percentage} %.🤑Party De!`;
      if (percentage >= 50) {
        containerMain.style.background = "#32Cd32";
      }
      break;

    case "Loss":
      outputH3.innerHTML = `The loss is ${amount} and the loss percentage is ${percentage} %.😢`;
      if (percentage >= 50) {
        containerMain.style.background = "#EF4444";
      }
      break;

    case "Neutral":
      containerMain.style.background = "#FBBF24";
      outputH3.innerHTML = `You earned No profit & There is No loss.😇`;
      break;

    default:
      break;
  }
}

function resetOutput() {
  containerMain.style.background = "lightblue";
  outputH3.innerText = "";
}

function resetError() {
  errorH3.innerText = "";
}

cost_price.addEventListener("click", function () {
  resetError();
  resetOutput();
});

stock_quantity.addEventListener("click", function () {
  resetError();
  resetOutput();
});

current_price.addEventListener("click", function () {
  resetError();
  resetOutput();
});
