// =======================================================
// VISUALIZER UTILITIES
// =======================================================

// Used by every algorithm

let isPaused = false;
let animationSpeed = 700;

// =======================================================
// DELAY
// =======================================================

function sleep(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}

// =======================================================
// WAIT IF PAUSED
// =======================================================

async function waitIfPaused(){

    while(isPaused){

        await sleep(100);

    }

}

// =======================================================
// SPEED
// =======================================================

function setAnimationSpeed(speed){

    animationSpeed = speed;

}

// =======================================================
// PSEUDOCODE
// =======================================================

function highlightLine(line){

    clearPseudoHighlight();

    if(line<=0) return;

    const current=document.getElementById("line"+line);

    if(current){

        current.classList.add("active-line");

    }

}

function clearPseudoHighlight(){

    const lines=document.querySelectorAll(".code-line");

    lines.forEach(line=>{

        line.classList.remove("active-line");

    });

}

// =======================================================
// DATA STRUCTURE
// Queue / Stack / Priority Queue / DSU
// =======================================================

function updateStructure(data){

    const container=document.getElementById("structureContainer");

    container.innerHTML="";

    data.forEach(item=>{

        const div=document.createElement("div");

        div.className="structure-item";

        div.innerHTML=item;

        container.appendChild(div);

    });

}

function clearStructure(){

    updateStructure([]);

}

// =======================================================
// VISITED ARRAY
// =======================================================

function updateVisited(visited){

    const container=document.getElementById("visitedContainer");

    container.innerHTML="";

    for(let i=0;i<visited.length;i++){

        const div=document.createElement("div");

        div.className="visited-item";

        div.innerHTML=visited[i] ? "T" : "F";

        div.style.background=
            visited[i] ?
            "#22C55E" :
            "white";

        container.appendChild(div);

    }

}

function clearVisited(){

    document.getElementById(
        "visitedContainer"
    ).innerHTML="";

}

// =======================================================
// CURRENT NODE
// =======================================================

function updateCurrentNode(node){

    document.getElementById(
        "currentNode"
    ).innerHTML=node;

}

function clearCurrentNode(){

    document.getElementById(
        "currentNode"
    ).innerHTML="-";

}

// =======================================================
// PAUSE
// =======================================================

function pauseAnimation(){

    isPaused=true;

}

function resumeAnimation(){

    isPaused=false;

}

function togglePause(){

    isPaused=!isPaused;

}

// =======================================================
// COMPLETE RESET
// =======================================================

function resetVisualizer(){

    clearStructure();

    clearVisited();

    clearCurrentNode();

    clearPseudoHighlight();

    resetGraph();

}