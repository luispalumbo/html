const passwordInput = document.getElementById("password");
const scoreDisplay = document.getElementById("score");
const feedback = document.getElementById("feedback");
const strengthBar = document.getElementById("strengthBar");

const commonPasswords = ["password", "123456", "qwerty", "abc123"];

passwordInput.addEventListener("input", checkPassword);

function checkPassword() {
  let password = passwordInput.value;
  let score = 0;
  let messages = [];

  // Length score
  if (password.length >= 12) {
    score += 40;
  } else {
    messages.push("Use at least 12 characters.");
  }

  // Uppercase
  if (/[A-Z]/.test(password)) score += 15;
  else messages.push("Add uppercase letters.");

  // Lowercase
  if (/[a-z]/.test(password)) score += 15;
  else messages.push("Add lowercase letters.");

  // Numbers
  if (/[0-9]/.test(password)) score += 15;
  else messages.push("Add numbers.");

  // Symbols
  if (/[^A-Za-z0-9]/.test(password)) score += 15;
  else messages.push("Add symbols.");

  // Common password penalty
  if (commonPasswords.includes(password.toLowerCase())) {
    score = 0;
    messages.push("This password is extremely common!");
  }

  scoreDisplay.textContent = score;
  strengthBar.style.width = score + "%";

  if (score < 40) strengthBar.style.backgroundColor = "red";
  else if (score < 70) strengthBar.style.backgroundColor = "orange";
  else strengthBar.style.backgroundColor = "green";

  feedback.innerHTML = "";
  messages.forEach(msg => {
    let li = document.createElement("li");
    li.textContent = msg;
    feedback.appendChild(li);
  });
}

function togglePassword() {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}
