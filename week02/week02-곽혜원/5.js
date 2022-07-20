function multiplyLinear(num, by){
    if(by === 1) return num;
    return num + multiplyLinear(num, by-1);
}

function multiplyLog(num, by){
    if(by === 1) return num;

    const res = multiplyLog(num, by/2);
    if(by%2 === 0){
        return res + res;
    }else{
        return res + res + num; 
    }
}

const answer1 = multiplyLinear(5, 8);
const answer2 = multiplyLog(5, 8);
console.log(answer2);