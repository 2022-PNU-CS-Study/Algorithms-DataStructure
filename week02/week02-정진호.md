# 04 재귀와 분할 정복법
재귀 호출: 자기 자신을 호출하는 것
재귀 함수: 재귀 호출을 하는 함수
베이스 케이스(base case): 재귀함수 안에서 재귀 함수를 호출하지 않고 return 하는 경우

```
// 재귀함수 템플릿
(반환값형) func(인수) {
    if(베이스 케이스){
        return 베이스 케이스 값;
    }

    func(다음 인수);
    return 응답;
}
```

## 유클리드 호제법
두 정수 m,n의 최대 공약수를 구하는 알고리즘

### 절차
1. m을 n으로 나눈 나머지를 r이라고 한다.
2. r == 0이면 n이 구하는 최대 공약수 이므로 n을 출력
3. r != 0이면 m <- n, n <- r로 지정하고 1로 되돌아간다.

```go
func GCD(int m, int n) int {
    if(n == 0) return m;

    return GCD(n, m % n);
}
```

## 피보나치 수열
```java
int fibo(int N){
    // base case
    if(N == 0) return 0;
    else if(N == 1) return 1;

    return fibo(N-1) + fibo(N-2);
}
```
재귀 함수 안에서 재귀 호출을 두번한다.

## 메모이제이션 동적 계획법
앞의 방법들은 재귀 함수을 여러번 사용하기 때문에 효율이 나쁘다. fibo(6)을 시행하면 함수를 25번이나 호출해야한다. 

한번 계산한 것을 다시 계산하지 않기 위해서 메모이제이션을 사용한다.

```c++
int main(){
    vector<long long> F(50);
    F[0] = 0, F[1] = 1;
    for(int N = 2;  N < 50; N++){
        F[N] = F[N-1] + F[N-2];
        cout << N << " 항째: " << F[N] << endl;
    }
}
```
위의 코드에서 예를 들어 F[5]는 F[4]+F[3]이다. 여기서 F[4]는 이전에 F[4]=F[3]+F[2]에서 계산 되었기 때문에 재귀 함수와 달리 중복해서 연산하지 않아도 된다.

메모이제이션은 캐시(cache)라고 할 수 있다. 메모이제이션을 사용하면 복잡도는 O(N)이되며 for문을 사용한 복잡도와 같이 동작한다.

```c++
vector<long long> memo;

long long fibo(int N){
    if(N == 0 || N == 1) return N;

    if(memo(N) != -1) return memo[N];

    return memo[N] = fibo(N-1) + fibo(N-2);
}
int main(){
    memo.assign(50,-1);

    fibo(49);
}
```

## 전체 탐색
### 부분합 문제 
> N개의 양의 정수 배열a 와 양의 정수 W가 주어졌을 때 배열 a에서 정수를 몇개 골라 합이 W가 될 수 있는지 확인하라

해당 문제를 풀기 위해서는 배열의 각 숫자가 포함되었을 때와 안되었을 때를 재귀함수로 호출하면 해결할 수 있다.

```c++
bool func(int i, int w, const vector<int>& a) {
    if(i == 0){
        if(w == 0) return true;
        else return false;
    }

    // i-1 선택 x
    if(func(i-1, w,a)) return true;
    // i-1 선택 o 
    if(func(i-1, w-a[i-1],a)) return true;

    return false;
}
```
재귀함수를 사용항 부분합 문제 해결을 O(2^N)의 복잡도를 가진다.

### 메모이제이션
메모이제이션을 사용하면 O(NW)의 복잡도를 가진다. 

## 분할정복법
주어진 문제를 작은 부분으로 분할한 뒤에 문제를 재귀적으로 풀고 나온 답을 조합해 원래 문제의 답을 구성하는 알고리즘을 `분할 정복법`이라고한다. 

## 연습문제 
### 1번
```java
int func(int i){
    if(i == 0 || i == 1) return 0;
    if(i == 2) return 1;
    return func(i-1)+func(i-2)+func(i-3);
}
```
### 2번
```java
int func(int i){
    if(i == 0 || i == 1) return 0;
    if(i == 2) return 1;
    
    if(memo[i] != -1) return memo[i];

    return memo[i] = func(i-1) + func(i-2) + func(i-3);
}
```

# 05 동적 계획법
문제 전체를 부분 문제로 불해해서 각 문제의 답을 메모이제이션하면서 작은 부분 문제에서 큰 부분 문제로 답을 구하는 방법


## Frog 1
N개의 발판이 일열로 있을 때 현재 발판에서 1칸 전진(비용 b[i]-b[i+1]), 2칸 전진(비용 b[i]-b[i+2])할 때 N-1까지 도착할 때까지 비용 총합의 최솟갑

### 해결방법
0번째 발판까지의 최소비용은 0이다. 1까지의 최소비용은 b[1]이다. b[2]로 이동한느 방법은 min(b[0]-b[2],b[1]-b[2])이다. 이방법을 이용해서 최솟값을 구할 수 있다.

```c++
int main() {
    db[0] = 0;
    for(int i = 1; i < N; i++){
        if(i == 1) dp[1] = abs(b[1]);
        else {
            dp[i] = min(dp[i-1] + abs(b[i]-b[i-1]), dp[i-2] + abs(b[i]-b[i-2]));
        }
    }
}
```
동적 계획법을 사용하면 지금의 문제가 아닌 더 작은 부분에서도 답이 구해진다.

원래 문제가 최적의 답이라면 작은 부분 문제도 최적이 되는 구조를 `최적 하위 구조` 또는 `최적 부분 구조`라고 한다. 

## 동적 계획법 관련 개념도
### 완화(relaxation)
배열 dp에서 각 무한대의 값을 갖고 있다가 값이 점점 작아지는 값으로 갱신되는 것

### 끌기 전이 형식과 밀기 전이 형식
끌기 전이 형식과 밀기 전이 형식은 이전의 값을 사용해서 다음의 값을 구하는 방식이다. 

### 전체 탐색 메모이제이션을 이용한 동적 계획법
동적 계획법은 전체 탐색 알고리즘을 설계할 때 지수 시간 복잡도인 문제를 다항식 시간 복잡도 알고리즘으로 전환할 수 있다. 

```c++
long long rec(int i){
    if(i == 0) return 0;
    long long res = INF;

    res = min(res, rec(i-1)+abs(b[i]-b[i-1]));

    if(i > 1) res = min(res, rec(i-2)+abs(b[i]-b[i-2]));
    return res;
}
```

## 냅색 문제(knapack)
> N개의 물건이 있을 때 i번째 물건의 무게는 w, 가격은 v라고 하자.
> N개의 물건에서 무게의 총합이 W를 넘지 않도록 몇가지 물건을 선택할 때 고른 물건의 가격 총합이 가지는 최댓값을 구하라

```c++
for(int i = 0; i< N; i++){
    for(int w = 0; w <= W; w++){
        // i 번째 물건을 선택한경우
        // 다음 i+1 번째 값을 먼저 업데이트
        if(w - weight[i] >= 0){
            dp[i+1][w] = max(dp[i+1][w], dp[i][w-weight[i]] + value[i]);
        }
        // 안 산경우 업데이트
        dp[i+1][w] = max(dp[i+1][w],dp[i][w]);
    }
}
```

## 편집 거리
> 두 문자열 S,T가 주어졌을 때 다음 세가지 작업을 반복해서 S를 T로 변환하려고 한다. 작업횟수가 최소가 되는 값을 구하라. 이런 최소 횟수를 편집 거리라고 한다.
> - 대체: S안에 문자를 하나 골라 대체 
> - 삭제: S안에서 문자 하나를 삭제 
> - 삽입: S안에서 원하는 위치에 문자를 하나 삽입

```c++
dp[0][0] = 0;

for(int i = 0; i <= S.size(); i++){
    for(int j = 0; j <= T.size(); j++){
        if(i > 0 && j > 0){
            if(S[i-1] == T[j-1]){
                chmin(dp[i][j], dp[i-1][j-1]);
            } else {
                chmin(dp[i][j], dp[i-1][j-1]+1);
            }
        }
        if(i > 0) chmin(dp[i][j], dp[i-1][j]+1);
        if(j > 0) chmin(dp[j][j],dp[i][j-1]+1);
    }
}
```

## 구간 분할 최적화
> N개의 요소를 일렬로 나열하고 몇 개의 구간으로 분할하려고한다. 각 구간 [l,r)에는 스코어 c(l,r)이 존재한다.
> N이하의 양의 정수 K가 있을 때 K+1 개의 정수 t[]가 0=t[0] < t[1] < ... < T[K] = N을 만족하면 구간 분할 스코어를 [t[0],t[1]) ... 스코어를 다음과 같이 정의한다.
>
> c[t[0]][t[1]] + ... + c[t[k-1]][t[k]]


# 코인완
1. 트리플 스텝: 어떤 아이가 n개의 계단을 오른다. 한번에 1계단 오르기도 하고, 2계단이나 3계단을 오르기도 한다. 계단을 오르는 방법이 몇가지 있는지 계산하는 메서드를 구현하라.

```java
int func(int n){
    int[] dp = new int[n+3];
    dp[0] = 0;
    dp[1] = 1;
    for(int i = 0; i < n; i++){
        dp[i+1] += 1;
        dp[i+2] += 1;
        dp[i+3] += 1;
    }
}
```

3. 마술 인덱스: 배열 A에서 A[i] = i인 인덱스를 마술 인덱스라 정의한다. 정렬된 상태의 배열이 주어졌을 때, 마술 인덱스가 존제한다면 그 값을 찾는 메서드를 작성하라. 배열 안에 중복된 값은 없다.

```java
int right = A.length;
int left = 0;
int mid = (left + right) / 2;
while(true){
    if(mid == A[mid]) {
        break;
    } else if(mid < A[mid]){
        left = mid+1;
    } else {
        right = mid;
    }
    mid = (left + right) / 2;
}
```

4. 부분집합: 어떤 집합의 부분집합을 전부 반환하는 메서드를 작성하라
```python
def func(A:list):
    answer = list()
    for s in range(1 << len(A)):
        subset = set()
        for i in range(len(A)):
            if s & 1 << i:
                subset.add(A[i])
        answer.append(subset)
```