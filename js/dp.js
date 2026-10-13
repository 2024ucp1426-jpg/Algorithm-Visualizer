function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const table = document.getElementById("dpTable");
const stateText = document.getElementById("stateText");
const explanationText = document.getElementById("explanationText");
const answerText = document.getElementById("answerText");

/*-----------------------------------------
    Create DP Table
------------------------------------------*/
function createTable(rows, cols) {

    table.innerHTML = "";

    for (let i = 0; i < rows; i++) {

        const tr = document.createElement("tr");

        for (let j = 0; j < cols; j++) {

            const td = document.createElement("td");

            td.id = `cell-${i}-${j}`;
            td.innerText = "0";

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}

/*-----------------------------------------
    Get Cell
------------------------------------------*/
function getCell(i, j) {

    return document.getElementById(`cell-${i}-${j}`);
}

/*-----------------------------------------
    Update Cell Value
------------------------------------------*/
function updateCell(i, j, value) {

    getCell(i, j).innerText = value;
}

/*-----------------------------------------
    Highlight Cell
------------------------------------------*/
function highlightCell(i, j, color = "yellow") {

    getCell(i, j).style.background = color;
}

/*-----------------------------------------
    Reset Cell Color
------------------------------------------*/
function resetCell(i, j) {

    getCell(i, j).style.background = "white";
}

/*-----------------------------------------
    Highlight Multiple Cells
------------------------------------------*/
function highlightCells(cells, color) {

    for (const cell of cells) {

        getCell(cell.i, cell.j).style.background = color;
    }
}

/*-----------------------------------------
    Reset Multiple Cells
------------------------------------------*/
function resetCells(cells) {

    for (const cell of cells) {

        getCell(cell.i, cell.j).style.background = "white";
    }
}

/*-----------------------------------------
    State Box
------------------------------------------*/
function setState(text) {

    stateText.innerHTML = text;
}

/*-----------------------------------------
    Explanation Box
------------------------------------------*/
function setExplanation(text) {

    explanationText.innerHTML = text;
}

/*-----------------------------------------
    Answer Box
------------------------------------------*/
function setAnswer(text) {

    answerText.innerHTML = text;
}

/*-----------------------------------------
    Clear Everything
------------------------------------------*/
function clearDP() {

    table.innerHTML = "";

    setState("");

    setExplanation("");

    setAnswer("");
}

/*-----------------------------------------
    Pause + Highlight
------------------------------------------*/
async function flashCell(i, j, color = "yellow", delay = 500) {

    highlightCell(i, j, color);

    await sleep(delay);

    resetCell(i, j);
}

/*-----------------------------------------
    Write Value with Animation
------------------------------------------*/
async function animateCell(i, j, value) {

    highlightCell(i, j, "yellow");

    await sleep(400);

    updateCell(i, j, value);

    highlightCell(i, j, "lightgreen");

    await sleep(500);

    resetCell(i, j);
}
