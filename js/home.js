// Retrieve MD5 hash and timestamp from localStorage
var md5Hash = localStorage.getItem("md5Hash");
var timestamp = localStorage.getItem("timestamp");

// Display MD5 hash and timestamp in the HTML
document.getElementById("hashContainer").innerText = "MD5 Hash: " + md5Hash;
document.getElementById("timestampContainer").innerText = "Timestamp: " + timestamp;

// Log MD5 hash and timestamp to console
console.log("MD5 Hash:", md5Hash);
console.log("Timestamp:", timestamp);
