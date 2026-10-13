const params = new URLSearchParams(window.location.search);

const algo = params.get("algo");

const title = document.getElementById("title");
const startButton = document.getElementById("startButton");

const input = document.getElementById("inputContainer");
const code = document.getElementById("codeContainer");
const resetButton = document.getElementById("resetButton");
title.innerText = algo.toUpperCase();

if(algo==="0/1Knapsack"){
    input.innerHTML = `

        <input type="text" id="weightArray"
               placeholder="Enter Weight Array (space separated)">

        <br><br>
        <input type="text"
               id="profitArray"
               placeholder="Enter Profit Array (space separated)">

        <br><br>
        <input type="number"
               id="capacity"
               placeholder="Knapsack Capacity">
    `;

    code.innerHTML = `<pre>
KNAPSACK(wt,val,W)

for i ← 0 to n
    dp[i][0] ← 0

for j ← 0 to W
    dp[0][j] ← 0
for i ← 1 to n
    for j ← 1 to W

        if wt[i-1] ≤ j
            dp[i][j] ← max( val[i-1] + dp[i-1][j-wt[i-1]], dp[i-1][j] )

        else
            dp[i][j] ← dp[i-1][j]
        end if

    end for

end for
</pre>`;

    startButton.onclick = startKnapsack;
}

resetButton.onclick = clearDP;