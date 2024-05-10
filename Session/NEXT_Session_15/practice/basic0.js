let nextArray = [];

nextArray.push(1);
nextArray.push(2);
nextArray.push(3);

let nextArray2 = ['N', 'E', 'X', 'T'];
console.log(nextArray2.slice(1, 3));

let year = prompt('올해는 몇 년인가요?');

if (year < 2023) {
    alert('숫자를 조금 더 올려보세요.');
} else if (year > 2023) {
    alert('숫자를 조금 더 내려보세요.');
} else {
    alert('정답압니다!');
}

switch (year) {
case 2022;
    alert('숫자를 조금 더 올려보세요.');
break;
case 2023;
    alert('정답압니다!');
break;
case 2024:
    alert('숫자를 조금 더 내려보세요.');
break;
default:
    alert("어떤 값인지 파악이 되지 않습니다.")    
}

// 반복문

let obj = {name: '김정현', job: "student"}

for (let key in obj){
    console.log(`${key} : ${obj[key]}`);
}

let array = ["1","2","3"];
for (let arr of array){
    console.log(arr);
}

let i = 0;
while (i < 3){
    console.log(i);
    i++;
}

const numbers = [1,2,3];
numbers.forEach(number => console.log(number));

// 함수
// By function
function add(a,b){
    return a+b;
}

function sayHi(){
    alert("안녕하세요!");
}
add(2,3);
sayHi();

// By Arrow

let add2 = (a, b) => a+b;
let sayHi2 = () => alert("안녕하세요!"); 

add2(2,3);
sayHi2();