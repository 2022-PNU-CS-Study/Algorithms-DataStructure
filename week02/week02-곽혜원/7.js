let answer = new Set();

function permutation(str, prefix){
    if(str.length === 0){
        answer.add(prefix);
        return ;
    }
    for(let i = 0; i < str.length; i++){
        let tmp = str.substring(0,i) + str.substring(i+1);
        permutation(tmp, prefix+str[i]);
    }
    
}

permutation("abcdccc", "");

Array.from(answer).forEach(str => console.log(str));