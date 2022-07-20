const N = 8;

function printSolution(board){
    for(let i = 0; i < N; i++){
        let str = ""
        for(let j = 0; j < N; j++){
            str += `${board[i][j]} `;
        }
        console.log(str);
    }
    console.log(" ");
}


function isSafe(board, row, col){
    for(let i = 0; i < col; i++){
        if(board[row][i] === 1){
            return false;
        }
    }

    for(i = row, j = col; i>=0 && j >=0; i--, j--){
        if(board[i][j]){
            return false;
        }
    }

    for(i = row, j = col; j >= 0 && i < N; i++, j--){
        if(board[i][j]){
            return false;
        }
    }
    return true; 
}

function solveNQUtil(board, col){
    if(col >= N){
        printSolution(board)
        return true
    }
    let res = false;
    for(let i = 0; i < N; i++){
        if(isSafe(board, i, col) == true){
            board[i][col] = 1
            res = solveNQUtil(board, col+1) || res;
            board[i][col] = 0
        }
    }
    return res;
}

function solveNQ(){
    let board = Array.from({length: N}, () => new Array(N).fill(0));
    solveNQUtil(board, 0);
    printSolution(board)
}
solveNQ()