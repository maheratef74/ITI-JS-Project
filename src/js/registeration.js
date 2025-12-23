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
    if (inputs[0].value.length <= 3) {
      var div = document.getElementsByName(inputs[0].name + "*")[0];
      div.style.setProperty("--col", "red");
      return;
    }
    if(inputs[1].value.length != 11 ){
      console.log(inputs[1].name+"*")
      var div = document.getElementsByName(inputs[1].name + "*")[0];
      console.log(div)
      div.style.setProperty("--col", "red");
      console.log(div.attributes.name)
      div.attributes.name.textContent = "not correct"
      return;
    }
    if (inputs[3].value.length <= 3) {
      var div = document.getElementsByName(inputs[3].name + "*")[0];
      div.style.setProperty("--col", "red");
      return;
    }
  sessionStorage.setItem("email", inputs[2].value);
  sessionStorage.setItem("password", inputs[3].value)
  window.location.href ="login.html"
});