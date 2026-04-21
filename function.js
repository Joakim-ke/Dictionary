let btn = document.getElementById("openLogin");
let box = document.getElementById("loginBox");
let overlay = document.getElementById("overlay");

btn.onclick = () =>{
  box.classList.add("show") 
  overlay.classList.add("show")
};

overlay.onclick = () =>{
  box.classList.remove("show") 
  overlay.classList.remove("show")
};