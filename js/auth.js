function isUserLogin() {
  return localStorage.getItem("isLoggedIn");
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  FB.logout(function (response) {
    console.log("User logged out:", response);
    document.getElementById("status").innerText = "User logged out.";
  });
}
