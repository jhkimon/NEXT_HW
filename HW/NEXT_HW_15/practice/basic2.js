/* 
  2. min(a, b) 함수 만들기
  -> a 와 b 중에서 더 작은 값을 반환해주는 함수 min(a, b)를 만들어 보세요!
  -> a == b인 경우엔 a나 b 중 어떤 것을 반환해도 상관없습니다. */

// (1) if 문을 활용해 만들기
function min(a, b) {
    //이 부분에 코드를 완성해보세요!
    if (a < b) {
        return a;
    } else {
        return b;
    }
}

// (2) ? 를 활용해 만들기
function min2(a, b) {
    //이 부분에 코드를 완성해보세요!
    return a < b ? a : b;
}

console.log(min(4, 5)); //4
console.log(min2(4, 5)); //4
