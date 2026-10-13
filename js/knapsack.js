async function startKnapsack() {

    let wt = document
        .getElementById("weightArray")
        .value
        .trim()
        .split(" ")
        .map(Number);

    let val = document
        .getElementById("profitArray")
        .value
        .trim()
        .split(" ")
        .map(Number);

    let W = Number(document.getElementById("capacity").value);

    if (wt.length == 0 || val.length == 0) {
        alert("Enter Weight and Profit arrays.");
        return;
    }

    if (wt.length != val.length) {
        alert("Weight and Profit arrays must have the same size.");
        return;
    }

    if (isNaN(W) || W <= 0) {
        alert("Enter a valid capacity.");
        return;
    }
    let n = wt.length;
    for(let i=0;i<n;i++){
        if((isNaN(wt[i]) || wt[i]<0 ) || !Number.isInteger(wt[i])){
            alert("Enter Valid Data For Weight Array(Non negative Integer)");
            return;
        }
    }
    for(let i=0;i<n;i++){
        if((isNaN(val[i]) || val[i]<0) || !Number.isInteger(val[i])){
            alert("Enter Valid Data For Profit Array(Non negative Integer)");
            return;
        }
    }
    await knapsack(wt, val, W, n);
}
// function showJ(j){

//     clearJ();

//     getCell(0, j+1).innerHTML = "↓<br>j";
// }
// function showI(i){

//     clearI();

//     getCell(i+1, 0).innerHTML = "→ i";
// }
// function clearJ(){

//     for(let j=1;j<=W+1;j++)
//         getCell(0,j).innerHTML="";
// }

// function clearI(){

//     for(let i=1;i<= wt.length+1;i++)
//         getCell(i,0).innerHTML="";
// }

async function knapsack(wt, val, W, n) {

    let dp = [];

    let table = document.getElementById("dpTable");
    table.innerHTML = "";

    // Create DP table
    for (let i = 0; i <= n; i++) {
        dp[i] = [];

        let row = document.createElement("tr");

        for (let j = 0; j <= W; j++) {
            dp[i][j] = 0;

            let cell = document.createElement("td");

            cell.id = `cell-${i}-${j}`;

            cell.innerText = "0";

            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    await sleep(500);

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= W; j++) {
            let current = document.getElementById(`cell-${i}-${j}`);

            current.style.background = "yellow";

            document.getElementById("stateText").innerText =
                `dp[${i}][${j}]`;

            await sleep(500);

            if (wt[i - 1] <= j) {

                let include =
                    val[i - 1] + dp[i - 1][j - wt[i - 1]];

                let exclude =
                    dp[i - 1][j];

                document.getElementById(
                    `cell-${i-1}-${j-wt[i-1]}`
                ).style.background = "violet";

                document.getElementById(
                    `cell-${i-1}-${j}`
                ).style.background = "violet";

                document.getElementById("explanationText").innerHTML =
                    `Include = ${val[i-1]} + ${dp[i-1][j-wt[i-1]]} = ${include}
                     <br>
                     Exclude = ${exclude}`;

                await sleep(1200);

                dp[i][j] = Math.max(include, exclude);

                current.innerText = dp[i][j];

                current.style.background = "lightgreen";

                await sleep(600);

                document.getElementById(
                    `cell-${i-1}-${j-wt[i-1]}`
                ).style.background = "white";

                document.getElementById(
                    `cell-${i-1}-${j}`
                ).style.background = "white";

            }
            else {

                document.getElementById(
                    `cell-${i-1}-${j}`
                ).style.background = "violet";

                document.getElementById("explanationText").innerHTML =
                    `Weight ${wt[i-1]} > Capacity ${j}<br>
                     Copy value from above`;

                await sleep(1000);

                dp[i][j] = dp[i-1][j];

                current.innerText = dp[i][j];

                current.style.background = "lightgreen";

                await sleep(600);

                document.getElementById(
                    `cell-${i-1}-${j}`
                ).style.background = "white";
            }

            current.style.background = "white";
        }
    }

    document.getElementById(
        `cell-${n}-${W}`
    ).style.background = "green";

    document.getElementById("answerText").innerHTML =
        `Maximum Profit = ${dp[n][W]}`;
}