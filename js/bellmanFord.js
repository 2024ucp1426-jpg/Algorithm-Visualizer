// ======================================================
// BELLMAN FORD
// ======================================================

let bfDistance=[];

let bfRunning=false;

let iteration=0;

// ======================================================
// ITERATION
// ======================================================

function updateIteration(){

    document.getElementById(
        "iterationBox"
    ).innerHTML=iteration;

}

// ======================================================
// DISTANCE ARRAY
// ======================================================

function updateDistance(){

    const container=document.getElementById(
        "distanceContainer"
    );

    container.innerHTML="";

    for(let i=0;i<bfDistance.length;i++){

        const div=document.createElement("div");

        div.className="visited-item";

        div.innerHTML=

            bfDistance[i]==Infinity ?

            "∞"

            :

            bfDistance[i];

        container.appendChild(div);

    }

}

// ======================================================
// START
// ======================================================

async function startBellmanFord(){

    if(bfRunning)
        return;

    bfRunning=true;

    resetVisualizer();

    iteration=0;

    bfDistance=new Array(nodes.length).fill(Infinity);

    bfDistance[0]=0;

    updateDistance();

    updateIteration();

    await sleep(animationSpeed);

    for(

        let i=1;

        i<nodes.length;

        i++

    ){

        iteration=i;

        updateIteration();

        highlightLine(2);

        await sleep(animationSpeed);

        let changed=false;

        await relaxAllEdges(changed);

    }

    clearPseudoHighlight();

    bfRunning=false;

}

// ======================================================
// RELAX ALL EDGES
// ======================================================

async function relaxAllEdges(){

    let changed = false;

    highlightLine(3);

    for(const edge of edges){

        await waitIfPaused();

        const u = edge.from;
        const v = edge.to;
        const w = edge.weight;

        highlightEdge(u,v);

        await sleep(animationSpeed/2);

        // ---------------------------------------
        // Relax u -> v
        // ---------------------------------------

        if(

            bfDistance[u] != Infinity &&

            bfDistance[u] + w < bfDistance[v]

        ){

            highlightLine(4);

            bfDistance[v] = bfDistance[u] + w;

            updateDistance();

            setNodeColor(

                v,

                NODE_COLOR.DISCOVERED

            );

            changed = true;

            await sleep(animationSpeed);

        }

        // ---------------------------------------
        // Since graph is undirected
        // also relax v -> u
        // ---------------------------------------

        if(

            bfDistance[v] != Infinity &&

            bfDistance[v] + w < bfDistance[u]

        ){

            highlightLine(4);

            bfDistance[u] = bfDistance[v] + w;

            updateDistance();

            setNodeColor(

                u,

                NODE_COLOR.DISCOVERED

            );

            changed = true;

            await sleep(animationSpeed);

        }

        setEdgeColor(

            u,

            v,

            EDGE_COLOR.DEFAULT

        );

    }

    // ---------------------------------------
    // Early Stopping
    // ---------------------------------------

    if(!changed){

        highlightLine(5);

    }

}

// ======================================================
// NEGATIVE CYCLE CHECK
// ======================================================

async function checkNegativeCycle(){

    highlightLine(6);

    for(const edge of edges){

        const u = edge.from;
        const v = edge.to;
        const w = edge.weight;

        if(

            bfDistance[u] != Infinity &&

            bfDistance[u] + w < bfDistance[v]

        ){

            alert(

                "Negative Weight Cycle Detected"

            );

            return;

        }

    }

}

// ======================================================
// PAUSE
// ======================================================

function pauseBellmanFord(){

    togglePause();

}

// ======================================================
// RESTART
// ======================================================

function restartBellmanFord(){

    bfRunning = false;

    bfDistance = [];

    iteration = 0;

    isPaused = false;

    resetVisualizer();

    document.getElementById(

        "distanceContainer"

    ).innerHTML = "";

    document.getElementById(

        "iterationBox"

    ).innerHTML = "0";

}

// ======================================================
// COLOR LEGEND
// ======================================================

/*

==========================================================

NODE COLORS

White (#FFFFFF)

Node has not been reached.

----------------------------------------------------------

Orange (#F59E0B)

Distance updated during current iteration.

----------------------------------------------------------

Green (#22C55E)

Currently processing edge relaxation.

----------------------------------------------------------

Blue (#3B82F6)

Final shortest distance determined
(after algorithm completes).

==========================================================

EDGE COLORS

Gray (#555555)

Normal Edge.

----------------------------------------------------------

Red (#EF4444)

Current edge being relaxed.

==========================================================

DISTANCE ARRAY

∞

means

Node has not been reached yet.

==========================================================

ITERATION BOX

Shows current Bellman-Ford iteration.

Iteration 1

↓

Iteration 2

↓

...

Iteration (V-1)

==========================================================

*/