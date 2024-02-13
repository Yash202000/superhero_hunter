document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get public and private keys from the form
    var publicKey = document.getElementById('publicKey').value;
    var privateKey = document.getElementById('privateKey').value;

    // Generate current timestamp
    var timestamp = Date.now();

    // Concatenate public key, private key, and timestamp
    var message = timestamp+privateKey+publicKey ;

    // Generate MD5 hash
    var hash = CryptoJS.MD5(message);

    // Alert MD5 hash
    alert("MD5 Hash: " + hash);

    // Log MD5 hash to console
    console.log("MD5 Hash:", hash.toString());

    // Store MD5 hash and timestamp in localStorage
    localStorage.setItem("apiKey",publicKey);
    localStorage.setItem("md5Hash", hash.toString());
    localStorage.setItem("timestamp", timestamp);

    // Redirect to home.html
    window.location.href = "home.html";
});