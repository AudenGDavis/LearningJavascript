

function fun() {
    var num = 10;
    printOnDoc(num)
}

fun();

printOnDoc(num)

function printOnDoc(text){
    document.write("<h2>-" + text + "-</h2>")
}