let firewallActive = true;
let trafficCount = 0;
let blockedCount = 0;

const alertsList = document.getElementById("alerts");
const logsList = document.getElementById("logs");
const trafficDisplay = document.getElementById("trafficCount");
const blockedDisplay = document.getElementById("blockedCount");
const firewallStatus = document.getElementById("firewallStatus");

function toggleFirewall() {
  firewallActive = !firewallActive;
  firewallStatus.textContent = firewallActive ? "ACTIVE" : "DISABLED";
  firewallStatus.style.color = firewallActive ? "lime" : "red";
  logEvent("Firewall turned " + (firewallActive ? "ON" : "OFF"));
}

function generateRandomIP() {
  return `${rand(1,255)}.${rand(0,255)}.${rand(0,255)}.${rand(0,255)}`;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simulateTraffic() {
  trafficCount++;
  trafficDisplay.textContent = trafficCount;

  let ip = generateRandomIP();
  let suspicious = Math.random() < 0.2; // 20% chance of threat

  if (suspicious) {
    if (firewallActive) {
      blockedCount++;
      blockedDisplay.textContent = blockedCount;
      addAlert("Blocked malicious IP: " + ip);
      logEvent("Threat blocked from " + ip);
    } else {
      addAlert("WARNING: Threat entered from " + ip);
      logEvent("Security breach from " + ip);
    }
  } else {
    logEvent("Normal traffic from " + ip);
  }
}

function addAlert(message) {
  const li = document.createElement("li");
  li.textContent = message;
  li.style.color = "orange";
  alertsList.prepend(li);
}

function logEvent(message) {
  const li = document.createElement("li");
  li.textContent = new Date().toLocaleTimeString() + " - " + message;
  logsList.prepend(li);
}

setInterval(simulateTraffic, 2000);
