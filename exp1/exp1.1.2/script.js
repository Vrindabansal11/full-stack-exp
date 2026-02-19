let balance = 0;

const balanceEl = document.getElementById("balance");
const amountEl = document.getElementById("amount");
const messageEl = document.getElementById("message");

document.getElementById("deposit").addEventListener("click", () => {
  const amount = Number(amountEl.value);

  if (amount <= 0) {
    messageEl.textContent = "Enter a valid amount";
    messageEl.style.color = "red";
    return;
  }

  balance += amount;
  updateUI("Amount deposited successfully", "green");
});

document.getElementById("withdraw").addEventListener("click", () => {
  const amount = Number(amountEl.value);

  if (amount <= 0) {
    messageEl.textContent = "Enter a valid amount";
    messageEl.style.color = "red";
    return;
  }

  if (amount > balance) {
    messageEl.textContent = "Insufficient balance";
    messageEl.style.color = "red";
    return;
  }

  balance -= amount;
  updateUI("Amount withdrawn successfully", "green");
});

function updateUI(msg, color) {
  balanceEl.textContent = `₹ ${balance}`;
  messageEl.textContent = msg;
  messageEl.style.color = color;
  amountEl.value = "";
}
