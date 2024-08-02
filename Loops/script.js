for(x=2; x < 10; x++){
    console.log("Value of x: " + x);
}

console.log("---------------")

let y = 0;
while(y < 10){
    y++;
    console.log("Value of y: " + y);
}

console.log("---------------")

let z = 0;
do{
    z++;
    console.log("Value of z: " + z);
} while (z<10);

console.log("---------------")

let myDictionary = { "one": 1, "two": 2, "three": 3};
for(let myWord in myDictionary){
    console.log(myWord + " = " + myDictionary[myWord]);
}

console.log("---------------")

a = 0;
outerloop: while(true){
    innerloop: for(var b = 0; b < 5;b++){
        a++;
        console.log("Value of a: " + a)
        if(a > 25){
            break outerloop;
        }
    }
}

console.log("---------------")

for(let i = 0; i < 100; i++){
    if(i % 5 != 0){
        continue;
    }
    console.log(i);
}