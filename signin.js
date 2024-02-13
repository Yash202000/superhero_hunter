document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

   var publicKey = document.getElementById('publicKey').value;
    var privateKey = document.getElementById('privateKey').value;

   var timestamp = Date.now();

    var message = timestamp+privateKey+publicKey ;

    var hash = CryptoJS.MD5(message);

    alert("MD5 Hash: " + hash);

    console.log("MD5 Hash:", hash.toString());

    localStorage.setItem("apiKey",publicKey);
    localStorage.setItem("md5Hash", hash.toString());
    localStorage.setItem("timestamp", timestamp);

    window.location.href = "home.html";
});