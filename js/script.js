
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const container = document.getElementById("array-container");
const cell = document.getElementsByClassName("array-cell");
let array = [];

function generateArray() {

    container.innerHTML = "";
    array = [];

    let n = Number(document.getElementById("arraySize").value);

    if (n <= 0) {
        alert("Enter valid size");
        return;
    }

    let mode = document.querySelector('input[name="mode"]:checked').value;

    if (mode === "manual") {

        let values = document.getElementById("arrayValues").value.trim().split(" ").map(Number);

        if (values.length !== n) {
            alert("Enter exactly " + n + " numbers");
            return;
        }

        array = values;
        for (let i = 0; i < n; i++) {

            const cell = document.createElement("div");
            cell.classList.add("array-cell");
            cell.id = `cell-${i}`;
            cell.innerText = array[i];
            container.appendChild(cell);
        }
    }

    else {

        for (let i = 0; i < n; i++) {
            array.push(Math.floor(Math.random() * 100));
        }
        for (let i = 0; i < n; i++) {

            const cell = document.createElement("div");
            cell.classList.add("array-cell");
            cell.id = `cell-${i}`;
            cell.innerText = array[i];
            container.appendChild(cell);
        }
    }
}
function showPointer(pointerId, index, label) {

    const pointer = document.getElementById(pointerId);

    const cell = document.getElementById(`cell-${index}`);

    if (!cell) {
        pointer.style.display = "none";
        return;
    }

    pointer.innerHTML = `↑<br>${label}`;

    pointer.style.left =
        (cell.offsetLeft + cell.offsetWidth / 2 - 8) + "px";

    pointer.style.top =
        (cell.offsetTop + cell.offsetHeight + 10) + "px";

    pointer.style.display = "block";
}
function hidePointer(pointerId = null) {

    // Hide all pointers
    if (pointerId === null) {
        document.querySelectorAll(".pointer").forEach(pointer => {
            pointer.style.display = "none";
        });
    }

    // Hide a specific pointer
    else {
        document.getElementById(pointerId).style.display = "none";
    }
}

function showPointers(i, j, name1 = "i", name2 = "j") {

    const iPointer = document.getElementById("pointer1");
    const jPointer = document.getElementById("pointer2");
    iPointer.innerHTML = `↑<br>${name1}`;
    jPointer.innerHTML = `↑<br>${name2}`;
    if (i >= 0) {
        const cell = document.getElementById(`cell-${i}`);

        iPointer.style.display = "block";
        iPointer.style.left = cell.offsetLeft + cell.offsetWidth / 2 - 8 + "px";
        iPointer.style.top = cell.offsetTop + cell.offsetHeight + 10 + "px";
    }

    if (j >= 0) {
        const cell = document.getElementById(`cell-${j}`);

        jPointer.style.display = "block";
        jPointer.style.left = cell.offsetLeft + cell.offsetWidth / 2 - 8 + "px";
        jPointer.style.top = cell.offsetTop + cell.offsetHeight + 10 + "px";
    }
}

function hidePointers() {
    document.getElementById("iPointer").style.display = "none";
    document.getElementById("jPointer").style.display = "none";
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

async function bubbleSort() {
    let iterations = 0;
    let swaps = 0;

    const iterBox = document.getElementById("iterationBox");
    const iterText = document.getElementById("iterationCount");

    const swapBox = document.getElementById("swapBox");
    const swapText = document.getElementById("swapText");

    iterBox.style.display = "block";   // show iteration counter
    iterText.innerText = 0;

    swapBox.style.display = "block";
    swapText.innerText = 0;
    for (let i = 0; i < array.length - 1; i++) {
        iterations++;
        iterText.innerText = iterations;
        for (let j = 0; j < array.length - 1 - i; j++) {
            showPointers(j, j + 1, "j", "j+1");
            cell[j].style.background = "red";
            cell[j + 1].style.background = "red";
            await sleep(500);
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                swaps++;
                cell[j].innerText = array[j];
                cell[j + 1].innerText = array[j + 1];
                swapText.innerText = swaps;
            }
            cell[j].style.background = "steelblue";
            cell[j + 1].style.background = "steelblue";
            await sleep(500);
        }
        cell[array.length - 1 - i].style.background = "green";
        await sleep(100);
    }
    cell[0].style.background = "green";
    iterBox.style.display = "none";
    swapBox.style.display = "none";
    hidePointers();
}


async function selectionSort() {
    let iterations = 0;
    const iterBox = document.getElementById("iterationBox");
    const iterText = document.getElementById("iterationCount");
    const minBox = document.getElementById("minBox");
    const minText = document.getElementById("minText");
    iterBox.style.display = "block";   // show iteration counter
    iterText.innerText = 0;
    minBox.style.display = "block";  // show iteration counter
    for (let i = 0; i < array.length - 1; i++) {
        iterations++;
        iterText.innerText = iterations;
        let minIdx = i;
        cell[minIdx].style.background = "yellow";
        minText.innerText = array[minIdx];
        //await sleep(750);
        for (let j = i + 1; j < array.length; j++) {
            if (i === minIdx) {
                showPointer("pointer0", i, "i/Min");
            }
            else {
                showPointer("pointer0", i, "i");
                showPointer("pointer1", minIdx, "Min");
            }
            showPointer("pointer2", j, "j");

            minText.innerText = array[minIdx];
            cell[j].style.background = "red";
            await sleep(750);
            if (array[j] < array[minIdx]) {
                cell[minIdx].style.background = "steelblue";
                minIdx = j;
                cell[minIdx].style.background = "yellow";
                minText.innerText = array[minIdx];
                hidePointer();
                //showPointer("pointer0",i,"i");
                //showPointer("pointer1",minIdx,"Min");
                //await sleep(750);
            }
            if (minIdx != j) {
                cell[j].style.background = "steelblue";
            }

        }
        if (minIdx != i) {
            swap(array, i, minIdx);
            cell[i].innerText = array[i];
            cell[minIdx].innerText = array[minIdx];
        }
        cell[minIdx].style.background = "steelblue";
        cell[i].style.background = "green";
        await sleep(1000);
        hidePointer();
    }
    cell[array.length - 1].style.background = "green";
    iterBox.style.display = "none";
    minBox.style.display = "none";
}

async function insertionSort() {
    const pivotBox = document.getElementById("iterationBox");
    pivotBox.innerHTML = "Current Key Element: <span id='iterationCount'>0</span>";
    const pivotText = document.getElementById("iterationCount");
    cell[0].style.background = "green";
    showPointer("pointer0", 0, "");
    await sleep(1000);
    for (let i = 1; i < array.length; i++) {
        if (i !== 1) {
            showPointer("pointer1", i - 1, "");
        }
        pivotBox.style.display = "block";
        pivotText.innerText = array[i];
        let j = i - 1;
        let key = array[i];
        cell[i].style.background = "yellow";
        await sleep(1000);
        while (j >= 0 && array[j] > key) {
            showPointer("pointer2", j, "j");
            array[j + 1] = array[j];
            cell[j + 1].innerText = array[j + 1];
            cell[j + 1].style.background = "green";
            cell[j].style.background = "yellow";
            await sleep(1000);
            j--;
        }
        hidePointer("pointer2");
        array[j + 1] = key;
        cell[j + 1].innerText = key;
        cell[j + 1].style.background = "green";
        await sleep(1000);
    }
    pivotBox.style.display = "block";
}
/*
async function merge(arr, low, mid, high) {
    for (let i = low; i <= mid; i++) {
        cell[i].style.background = "red";
    }
    for (let i = mid + 1; i <= high; i++) {
        cell[i].style.background = "yellow";
    }
    await sleep(1000);
    let size1 = mid - low + 1;
    let size2 = high - mid;
    let temp1 = [];
    let temp2 = [];
    for (let i = low; i <= mid; i++) {
        temp1.push(arr[i]);
    }
    for (let i = mid + 1; i <= high; i++) {
        temp2.push(arr[i]);
    }
    let i = 0;
    let j = 0;
    let k = low;
    while (i < size1 && j < size2) {
        if (temp1[i] <= temp2[j]) {
            arr[k] = temp1[i];
            cell[k].innerText = arr[k];
            cell[k].style.background = "green";
            await sleep(300);
            k++;
            i++;
        }
        else {
            arr[k] = temp2[j];
            cell[k].innerText = arr[k];
            cell[k].style.background = "green";
            await sleep(300);
            k++;
            j++;
        }
    }
    while (i < size1) {
        arr[k] = temp1[i];
        cell[k].innerText = arr[k];
        cell[k].style.background = "green";
        await sleep(300);
        k++;
        i++;
    }
    while (j < size2) {
        arr[k] = temp2[j];
        cell[k].innerText = arr[k];
        cell[k].style.background = "green";
        await sleep(300);
        k++;
        j++;
    }
    await sleep(500);
    for (let i = low; i <= high; i++) {
        cell[i].style.background = "steelblue";
    }
    return;
}
)/
/*
async function MergeSort(arr, low, high) {
    for (let i = low; i <= high; i++) {
        cell[i].style.background = "steelblue";
    }
    if (low < high) {
        let mid = low + Math.floor((high - low) / 2);
        for (let i = low; i <= mid; i++) {
            cell[i].style.background = "grey";
        }
        await sleep(800);
        await MergeSort(arr, low, mid);
        for (let i = mid + 1; i <= high; i++) {
            cell[i].style.background = "grey";
        }
        await sleep(800);
        await MergeSort(arr, mid + 1, high);
        await merge(arr, low, mid, high);
    }
    else {
        return;
    }
}
async function startMergeSort() {
    let low = 0;
    let high = array.length - 1;
    await MergeSort(array, low, high);
}*/
/*
async function partition(arr, low, high) {
    let pivot = arr[high];
    cell[high].style.background = "yellow";
    await sleep(500);
    let i = low;
    for (let j = low; j < high; j++) {
        cell[j].style.background = "purple";
        await sleep(500);
        if (arr[j] <= pivot) {
            swap(arr, i, j);
            cell[i].innerText = arr[i];
            cell[j].innerText = arr[j];
            cell[i].style.background = "pink";
            if (i != j) {
                cell[j].style.background = "red";
            }
            await sleep(500);
            i++;
        }
        else {
            cell[j].style.background = "red";
            await sleep(500);
        }
    }
    swap(arr, i, high);
    cell[i].innerText = arr[i];
    cell[high].innerText = arr[high];
    cell[i].style.background = "green";
    if (i != high) {
        cell[high].style.background = "red";
    }
    await sleep(500);
    for (let i = low; i <= high; i++) {
        if (cell[i].style.background != "green") {
            cell[i].style.background = "steelblue";
        }
    }
    return i;
}

async function quickSort(arr, low, high) {
    if (low == high) {
        cell[low].style.background = "green";
    }
    else if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
}
async function startQuickSort() {
    let low = 0;
    let high = array.length - 1;
    await quickSort(array, low, high);
}
*/

const mergeTree = document.getElementById("mergeTree");

const levels = [];
const treeNodes = {};
function getLevel(depth) {

    if (!levels[depth]) {

        const row = document.createElement("div");
        row.className = "level";

        mergeTree.appendChild(row);

        levels[depth] = row;
    }

    return levels[depth];
}

function drawSubArray(arr, low, high, depth) {

    const row = getLevel(depth);

    const box = document.createElement("div");
    box.className = "subArray";

    box.id = `${depth}-${low}-${high}`;

    for (let i = low; i <= high; i++) {

        const cell = document.createElement("div");
        cell.className = "node";

        cell.innerText = arr[i];

        box.appendChild(cell);
    }

    row.appendChild(box);
    treeNodes[`${depth}-${low}-${high}`] = box;

    return box;
}

async function showRecursion(arr, low, high, depth) {

    const box = drawSubArray(arr, low, high, depth);

    box.classList.add("active");

    await sleep(700);

    box.classList.remove("active");
}

function clearTree() {

    mergeTree.innerHTML = "";
    for (let key in treeNodes) {
        delete treeNodes[key];
    }
    levels.length = 0;
}

async function MergeSort(arr, low, high, depth = 0) {

    await showRecursion(arr, low, high, depth);

    if (low >= high)
        return;

    let mid = Math.floor((low + high) / 2);

    await MergeSort(arr, low, mid, depth + 1);
    await MergeSort(arr, mid + 1, high, depth + 1);

    await merge(arr, low, mid, high);
    await updateSubArray(arr, low, high, depth);

}

async function startMergeSort() {

    clearTree();

    await MergeSort(array, 0, array.length - 1);
}

async function updateSubArray(arr, low, high, depth) {

    let box = treeNodes[`${depth}-${low}-${high}`];
    box.classList.add("active");
    await sleep(500);
    let nodes = box.children;

    for (let i = 0; i < nodes.length; i++) {

        nodes[i].innerText = arr[low + i];
    }
    await sleep(500);

    // Remove highlight
    box.classList.remove("active");
}

function drawTempArrays(temp1, temp2, low, mid, high) {

    tempArrays.style.display = "block";

    leftTitle.innerText = `Left (${low} - ${mid})`;

    rightTitle.innerText = `Right (${mid + 1} - ${high})`;

    leftArray.innerHTML = "";
    rightArray.innerHTML = "";

    temp1.forEach((value, index) => {

        let div = document.createElement("div");

        div.className = "tempCell";

        div.id = `left-${index}`;

        div.innerText = value;

        leftArray.appendChild(div);

    });

    temp2.forEach((value, index) => {

        let div = document.createElement("div");

        div.className = "tempCell";

        div.id = `right-${index}`;

        div.innerText = value;

        rightArray.appendChild(div);

    });

}

function hideTempArrays() {

    tempArrays.style.display = "none";

    leftArray.innerHTML = "";

    rightArray.innerHTML = "";
}
function showTempPointer(pointerId, cellId, label) {

    const pointer = document.getElementById(pointerId);
    const target = document.getElementById(cellId);

    if (!target) {
        pointer.style.display = "none";
        return;
    }

    // Position relative to the array wrapper
    const wrapper = document.getElementById("array-wrapper");

    const wrapperRect = wrapper.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    pointer.innerHTML = `↑<br>${label}`;

    pointer.style.position = "absolute";

    pointer.style.left =
        (targetRect.left - wrapperRect.left +
        targetRect.width / 2 -
        pointer.offsetWidth / 2) + "px";

    // BELOW the temp cell
    pointer.style.top =
        (targetRect.bottom - wrapperRect.top + 8) + "px";

    pointer.style.display = "block";
}

async function merge(arr, low, mid, high) {

    // Highlight current halves
    for (let x = low; x <= mid; x++)
        cell[x].style.background = "red";

    for (let x = mid + 1; x <= high; x++)
        cell[x].style.background = "yellow";

    await sleep(700);

    let temp1 = [];
    let temp2 = [];

    for (let x = low; x <= mid; x++)
        temp1.push(arr[x]);

    for (let x = mid + 1; x <= high; x++)
        temp2.push(arr[x]);

    // Draw temporary arrays
    drawTempArrays(temp1, temp2, low, mid, high);

    let i = 0;
    let j = 0;
    let k = low;

    // Initial pointers
    showTempPointer("pointerI", "left-0", "i");
    showTempPointer("pointerJ", "right-0", "j");
    showPointer("pointer0", k, "k");

    while (i < temp1.length && j < temp2.length) {

        await sleep(500);

        if (temp1[i] <= temp2[j]) {

            arr[k] = temp1[i];

            cell[k].innerText = arr[k];
            cell[k].style.background = "green";
            i++;
            if (i < temp1.length)
                showTempPointer("pointerI", `left-${i}`, "i");
            else
                hidePointer("pointerI");
            k++;
            if (k <= high)
                showPointer("pointer0", k, "k");
            else
                hidePointer("pointer0");

        }
        else {

            arr[k] = temp2[j];

            cell[k].innerText = arr[k];
            cell[k].style.background = "green";

            j++;

            if (j < temp2.length)
                showTempPointer("pointerJ", `right-${j}`, "j");
            else
                hidePointer("pointerJ");
            k++;

            if (k <= high)
                showPointer("pointer0", k, "k");
            else
                hidePointer("pointer0");
        }
    }

    while (i < temp1.length) {

        await sleep(500);

        arr[k] = temp1[i];

        cell[k].innerText = arr[k];
        cell[k].style.background = "green";

        i++;
        k++;

        showTempPointer("pointerI", `left-${i}`, "i");
        showPointer("pointer0", k, "k");
    }

    while (j < temp2.length) {

        await sleep(500);

        arr[k] = temp2[j];

        cell[k].innerText = arr[k];
        cell[k].style.background = "green";

        j++;
        k++;

        showTempPointer("pointerJ", `right-${j}`, "j");
        showPointer("pointer0", k, "k");
    }

    await sleep(800);

    // Reset colors
    for (let x = low; x <= high; x++)
        cell[x].style.background = "steelblue";

    // Hide pointers
    hidePointer("pointer0");
    hidePointer("pointerI");
    hidePointer("pointerJ");

    // Remove temporary arrays
    hideTempArrays();
}

async function partition(arr, low, high) {

    // Highlight current subarray
    for (let k = low; k <= high; k++) {
        if (cell[k].style.background != "green")
            cell[k].style.background = "#dbeafe";
    }

    let pivot = arr[high];

    cell[high].style.background = "gold";

    showPointer("pointer0", high, "P");

    let i = low - 1;

    showPointer("pointer1", i, "i");

    await sleep(1000);

    for (let j = low; j < high; j++) {

        showPointer("pointer2", j, "j");

        cell[j].style.background = "purple";

        await sleep(1000);

        if (arr[j] <= pivot) {

            i++;

            showPointer("pointer1", i, "i");

            cell[i].style.background = "orange";

            await sleep(500);

            if (i != j) {

                swap(arr, i, j);

                cell[i].innerText = arr[i];
                cell[j].innerText = arr[j];

                await sleep(1000);
            }

            cell[i].style.background = "#dbeafe";
        }

        cell[j].style.background = "#dbeafe";
    }

    // Final pivot placement
    showPointer("pointer1", i + 1, "i");

    await sleep(1000);

    swap(arr, i + 1, high);

    cell[i + 1].innerText = arr[i + 1];
    cell[high].innerText = arr[high];

    cell[i + 1].style.background = "green";

    if (i + 1 != high)
        cell[high].style.background = "#dbeafe";

    await sleep(1000);

    hidePointer("pointer0");
    hidePointer("pointer1");
    hidePointer("pointer2");

    for (let k = low; k <= high; k++) {

        if (cell[k].style.background != "green")
            cell[k].style.background = "steelblue";
    }

    return i + 1;
}

async function quickSort(arr, low, high) {

    if (low < high) {

        let pi = await partition(arr, low, high);

        await quickSort(arr, low, pi - 1);

        await quickSort(arr, pi + 1, high);
    }
    else if (low == high) {

        cell[low].style.background = "green";

        await sleep(1000);
    }
}

async function startQuickSort() {

    await quickSort(array, 0, array.length - 1);

    hidePointer();
}