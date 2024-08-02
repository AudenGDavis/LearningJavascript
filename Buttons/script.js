function myfun(){
    document.getElementById("demo").innerHTML = "Content Changed";
    document.getElementById("textField").style = "color: red;";
    document.getElementById("textField").innerText = window.prompt("hello there")
}