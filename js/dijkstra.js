// ======================================================
// DIJKSTRA
// ======================================================

let pq = [];

let distance = [];

let visited = [];

let dijkstraRunning = false;

// ======================================================
// PRIORITY QUEUE
// ======================================================

function sortPQ(){

    pq.sort((a,b)=>a.dist-b.dist);

}

function updatePriorityQueue(){

    updateStructure(

        pq.map(x=>`${x.node} (${x.dist})`)

    );

}

// ======================================================
// DISTANCE ARRAY
// ======================================================

function updateDistance(){

    const container = document.getElementById(
        "distanceContainer"
    );

    container.innerHTML="";

    for(let i=0;i<distance.length;i++){

        const div=document.createElement("div");

        div.className="visited-item";

        div.innerHTML=

            distance[i]==Infinity ?

            "∞"

            :

            distance[i];

        container.appendChild(div);

    }

}

// ======================================================
// START
// ======================================================

async function startDijkstra(){

    if(dijkstraRunning)
        return;

    dijkstraRunning=true;

    pq=[];

    visited=new Array(nodes.length).fill(false);

    distance=new Array(nodes.length).fill(Infinity);

    resetVisualizer();

    distance[0]=0;

    pq.push({

        node:0,

        dist:0

    });

    updatePriorityQueue();

    updateDistance();

    setNodeColor(

        0,

        NODE_COLOR.DISCOVERED

    );

    await sleep(animationSpeed);

    while(pq.length){

        await waitIfPaused();

        sortPQ();

        const current=pq.shift();

        const node=current.node;

        if(visited[node])

            continue;

        visited[node]=true;

        updatePriorityQueue();

        updateCurrentNode(node);

        setNodeColor(

            node,

            NODE_COLOR.CURRENT

        );

        highlightLine(4);

        await sleep(animationSpeed);

        await relaxNeighbours(node);

        setNodeColor(

            node,

            NODE_COLOR.VISITED

        );

    }

    clearPseudoHighlight();

    dijkstraRunning=false;

}

// ======================================================
// RELAX NEIGHBOURS
// ======================================================

async function relaxNeighbours(node){

    highlightLine(5);

    for(const edge of graph[node]){

        await waitIfPaused();

        const neighbour = edge.to;

        const weight = edge.weight;

        // ------------------------------------------
        // Highlight Current Edge
        // ------------------------------------------

        highlightEdge(node, neighbour);

        await sleep(animationSpeed / 2);

        // ------------------------------------------
        // Relaxation
        // ------------------------------------------

        if(
            !visited[neighbour] &&
            distance[node] + weight < distance[neighbour]
        ){

            highlightLine(6);

            distance[neighbour] =

                distance[node] + weight;

            pq.push({

                node: neighbour,

                dist: distance[neighbour]

            });

            updatePriorityQueue();

            updateDistance();

            setNodeColor(

                neighbour,

                NODE_COLOR.DISCOVERED

            );

            await sleep(animationSpeed);

        }

        // Restore edge

        setEdgeColor(

            node,

            neighbour,

            EDGE_COLOR.DEFAULT

        );

    }

}

// ======================================================
// PAUSE
// ======================================================

function pauseDijkstra(){

    togglePause();

}

// ======================================================
// RESTART
// ======================================================

function restartDijkstra(){

    dijkstraRunning = false;

    pq = [];

    visited = [];

    distance = [];

    isPaused = false;

    resetVisualizer();

    document.getElementById(
        "distanceContainer"
    ).innerHTML = "";

}

// ======================================================
// COLOR LEGEND
// ======================================================

/*

==========================================================

NODE COLORS

White (#FFFFFF)

-> Node has not been discovered.

----------------------------------------------------------

Orange (#F59E0B)

-> Node is inside the Priority Queue.

----------------------------------------------------------

Green (#22C55E)

-> Node currently has the minimum distance
   and is being processed.

----------------------------------------------------------

Blue (#3B82F6)

-> Shortest distance to this node
   has been finalized.

==========================================================

EDGE COLORS

Gray (#555555)

-> Normal Edge

----------------------------------------------------------

Red (#EF4444)

-> Edge currently being relaxed.

----------------------------------------------------------

Green (#10B981)

-> Selected into MST
   (Prim's Algorithm)

----------------------------------------------------------

Light Gray (#BDBDBD)

-> Rejected Edge
   (Kruskal's Algorithm)

==========================================================

DATA STRUCTURE

Priority Queue

Displays

(node, distance)

Example

(3,7)

means

Node = 3

Current Distance = 7

==========================================================

DISTANCE ARRAY

∞

means

Node has not been reached.

==========================================================

*/