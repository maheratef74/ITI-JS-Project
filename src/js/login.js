var form = document.getElementsByTagName("form")[0];
var inputs = document.getElementsByClassName("inputs");

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("focus", function (e) {
    var div = document.getElementsByName(e.currentTarget.name + "*")[0];
    div.style?.setProperty("--top", "0%");
    div.style.setProperty("--left", "10px");
  })
  inputs[i].addEventListener("blur", function (e) {
    var div = document.getElementsByName(e.currentTarget.name + "*")[0];
    div.style?.setProperty("--top", "40%");
    div.style.setProperty("--left", "20px");
  })
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
    if (!sessionStorage.getItem("email")) {
      return;
    }
    if(inputs[0].value != sessionStorage.getItem("email") ){
      alert("invalid credentials")
      return;
    }
    if (inputs[1].value != sessionStorage.getItem("password")) {
      alert("invalid credentials")
      return;
    }
    alert("login successfully")
  sessionStorage.setItem("token", Math.random()*1000000);
  window.location.href ="aboutUs.html"
});