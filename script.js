
function sleep(ms){
return new Promise(resolve=>setTimeout(resolve,ms));
}

const container = document.getElementById("array-container");
const cell = document.getElementsByClassName("array-cell");
let array = [];

function generateArray(){

container.innerHTML="";
array=[];

let n = Number(document.getElementById("arraySize").value);

if(n<=0){
alert("Enter valid size");
return;
}

let mode = document.querySelector('input[name="mode"]:checked').value;

if(mode === "manual"){

let values = document.getElementById("arrayValues").value.trim().split(" ").map(Number);

if(values.length !== n){
alert("Enter exactly "+n+" numbers");
return;
}

array = values;
for(let i=0;i<n;i++){

const cell=document.createElement("div");
cell.classList.add("array-cell");

cell.innerText=array[i];

container.appendChild(cell);
}
}

else{

for(let i=0;i<n;i++){
array.push(Math.floor(Math.random()*100));
}
for(let i=0;i<n;i++){

const cell=document.createElement("div");
cell.classList.add("array-cell");

cell.innerText=array[i];

container.appendChild(cell);
}
}
}

function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

async function bubbleSort(){
    let iterations = 0;
    let swaps=0;

    const iterBox = document.getElementById("iterationBox");
    const iterText = document.getElementById("iterationCount");

    const swapBox = document.getElementById("swapBox");
    const swapText = document.getElementById("swapText");

    iterBox.style.display = "block";   // show iteration counter
    iterText.innerText = 0;

    swapBox.style.display="block";
    swapText.innerText=0;
    for(let i = 0;i<array.length-1;i++){
        iterations++;
        iterText.innerText = iterations;
        for(let j=0;j<array.length-1-i;j++){
            cell[j].style.background = "red";
            cell[j+1].style.background = "red";
            await sleep(500);
            if(array[j]>array[j+1]){
                swap(array,j,j+1);
                swaps++;
                cell[j].innerText=array[j];
                cell[j+1].innerText=array[j+1];
                swapText.innerText=swaps;
            }
            cell[j].style.background = "steelblue";
            cell[j+1].style.background = "steelblue";
            await sleep(500);
        }
        cell[array.length-1-i].style.background="green";
        await sleep(100);
    }
    cell[0].style.background="green";
    iterBox.style.display = "none"; 
    swapBox.style.display = "none"; 
}


async function selectionSort(){
    let iterations =0;
    const iterBox = document.getElementById("iterationBox");
    const iterText = document.getElementById("iterationCount");
    const minBox = document.getElementById("minBox");
    const minText = document.getElementById("minText");
    iterBox.style.display = "block";   // show iteration counter
    iterText.innerText = 0;
    minBox.style.display = "block";   // show iteration counter
    for(let i =0;i<array.length-1;i++){
        iterations++;
        iterText.innerText=iterations;
        let minIdx = i;
        cell[minIdx].style.background="yellow";
        minText.innerText=array[minIdx];
        await sleep(500);
        for(let j=i+1;j<array.length;j++){
            minText.innerText=array[minIdx];
            cell[j].style.background="red";
            await sleep(500);
            if(array[j]<array[minIdx]){
                cell[minIdx].style.background="steelblue";
                minIdx = j;
                cell[minIdx].style.background="yellow";
                minText.innerText=array[minIdx];
                await sleep(500);
            }
            if(minIdx!=j){
            cell[j].style.background="steelblue";
            }
        }
        if(minIdx!=i){
            swap(array,i,minIdx);
            cell[i].innerText=array[i];
            cell[minIdx].innerText=array[minIdx];
        }
        cell[minIdx].style.background="steelblue";
        cell[i].style.background="green";
        await sleep(500);
    }
    cell[array.length-1].style.background="green";
    iterBox.style.display = "none"; 
    minBox.style.display = "none";  
}

async function insertionSort(){
    const pivotBox = document.getElementById("iterationBox");
    pivotBox.innerHTML = "Current Key Element: <span id='iterationCount'>0</span>";
    const pivotText = document.getElementById("iterationCount");
    cell[0].style.background="green";
    await sleep(1000);
    for(let i = 1;i<array.length;i++){
        pivotBox.style.display = "block";   
        pivotText.innerText = array[i];
        let j = i-1;
        let key = array[i];
        cell[i].style.background="yellow";
        await sleep(1000);
        while(j>=0 && array[j]>key){
            array[j+1]=array[j];
            cell[j+1].innerText=array[j+1];
            cell[j+1].style.background="green";
            cell[j].style.background="yellow";
            await sleep(1000);
            j--;
        }
        array[j+1]=key;
        cell[j+1].innerText=key;
        cell[j+1].style.background="green";
        await sleep(1000);
    }
    pivotBox.style.display = "block";
}

async function merge(arr,low,mid,high){
    for(let i = low;i<=mid;i++){
        cell[i].style.background="red";
    }
    for(let i = mid+1;i<=high;i++){
        cell[i].style.background="yellow";
    }
    await sleep(1000);
    let size1 = mid-low+1;
    let size2 = high - mid;
    let temp1 = [];
    let temp2 = [];
    for(let i = low;i<=mid;i++){
        temp1.push(arr[i]);
    }
    for(let i = mid+1;i<=high;i++){
        temp2.push(arr[i]);
    }
    let i = 0;
    let j =0;
    let k = low;
    while(i<size1 && j<size2){
        if(temp1[i]<=temp2[j]){
            arr[k]=temp1[i];
            cell[k].innerText=arr[k];
            cell[k].style.background="green";
            await sleep(300);
            k++;
            i++;
        }
        else{
            arr[k]=temp2[j];
            cell[k].innerText=arr[k];
            cell[k].style.background="green";
            await sleep(300);
            k++;
            j++;
        }
    }
    while(i<size1){
        arr[k]=temp1[i];
        cell[k].innerText=arr[k];
        cell[k].style.background="green";
        await sleep(300);
        k++;
        i++;
    }
    while(j<size2){
        arr[k]=temp2[j];
        cell[k].innerText=arr[k];
        cell[k].style.background="green";
        await sleep(300);
        k++;
        j++;
    }
    await sleep(500);
    for(let i = low;i<=high;i++){
        cell[i].style.background="steelblue";
    }
    return ;
}
async function MergeSort(arr,low,high){
    for(let i = low;i<=high;i++){
        cell[i].style.background="steelblue";
    }
    if(low<high){
        let mid = low + Math.floor((high-low)/2);
        for(let i = low;i<=mid;i++){
            cell[i].style.background="grey";
        }
        await sleep(800);
        await MergeSort(arr,low,mid);
        for(let i = mid+1;i<=high;i++){
            cell[i].style.background="grey";
        }
        await sleep(800);
        await MergeSort(arr,mid+1,high);
        await merge(arr,low,mid,high);
    }
    else{
        return;
    }
}
async function startMergeSort(){
    let low = 0;
    let high = array.length-1;
    await MergeSort(array,low,high);
}

async function partition(arr,low,high){
    let pivot = arr[high];
    cell[high].style.background="yellow";
    await sleep(500);
    let i = low;
    for(let j= low;j<high;j++){
        cell[j].style.background="purple";
        await sleep(500);
        if(arr[j]<=pivot){
            swap(arr,i,j);
            cell[i].innerText=arr[i];
            cell[j].innerText=arr[j];
            cell[i].style.background="pink";
            if(i!=j){
                cell[j].style.background="red";
            }
            await sleep(500);
            i++;
        }
        else{
        cell[j].style.background="red";
        await sleep(500);
        }
    }
    swap(arr,i,high);
    cell[i].innerText=arr[i];
    cell[high].innerText=arr[high];
    cell[i].style.background="green";
    if(i!=high){
        cell[high].style.background="red";
    }
    await sleep(500);
    for(let i = low;i<=high;i++){
        if(cell[i].style.background!="green"){
            cell[i].style.background="steelblue";
        }
    }
    return i;
}

async function quickSort(arr,low,high){
    if(low==high){
        cell[low].style.background="green";
    }
    else if(low<high){
        let pi = await partition(arr,low,high);
        await quickSort(arr,low,pi-1);
        await quickSort(arr,pi+1,high);
    }
}
async function startQuickSort(){
    let low =0;
    let high = array.length-1;
    await quickSort(array,low,high);
}