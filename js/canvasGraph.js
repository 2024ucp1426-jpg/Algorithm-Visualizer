// ======================================================
// CANVAS
// ======================================================

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

// navigationGraph.js sets this.
// false -> BFS, DFS
// true  -> Dijkstra, Prim, Kruskal

if(typeof showWeights === "undefined"){
    var showWeights = false;
}

// ======================================================
// DRAW COMPLETE GRAPH
// ======================================================

function drawGraph(){

    clearCanvas();

    drawEdges();

    drawNodes();

}

// ======================================================
// CLEAR CANVAS
// ======================================================

function clearCanvas(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}

// ======================================================
// DRAW ALL EDGES
// ======================================================

function drawEdges(){

    for(const edge of edges){

        drawEdge(edge);

    }

}

// ======================================================
// DRAW ONE EDGE
// ======================================================

function drawEdge(edge){

    const from = nodes[edge.from];
    const to   = nodes[edge.to];

    ctx.beginPath();

    ctx.moveTo(from.x,from.y);

    ctx.lineTo(to.x,to.y);

    ctx.strokeStyle = edge.color;

    ctx.lineWidth = 3;

    ctx.stroke();

    if(showWeights){

        drawWeight(edge);

    }

}

// ======================================================
// DRAW EDGE WEIGHT
// ======================================================

function drawWeight(edge){

    const from = nodes[edge.from];
    const to   = nodes[edge.to];

    const midX = (from.x + to.x)/2;
    const midY = (from.y + to.y)/2;

    ctx.beginPath();

    ctx.fillStyle = "white";

    ctx.arc(
        midX,
        midY,
        14,
        0,
        Math.PI*2
    );

    ctx.fill();

    ctx.strokeStyle="#555";

    ctx.stroke();

    ctx.fillStyle="black";

    ctx.font="15px Arial";

    ctx.textAlign="center";

    ctx.textBaseline="middle";

    ctx.fillText(
        edge.weight,
        midX,
        midY
    );

}

// ======================================================
// DRAW ALL NODES
// ======================================================

function drawNodes(){

    for(const node of nodes){

        drawNode(node);

    }

}

// ======================================================
// DRAW ONE NODE
// ======================================================

function drawNode(node){

    ctx.beginPath();

    ctx.arc(
        node.x,
        node.y,
        25,
        0,
        Math.PI*2
    );

    ctx.fillStyle=node.color;

    ctx.fill();

    ctx.strokeStyle="#222";

    ctx.lineWidth=3;

    ctx.stroke();

    ctx.fillStyle="black";

    ctx.font="18px Arial";

    ctx.textAlign="center";

    ctx.textBaseline="middle";

    ctx.fillText(
        node.id,
        node.x,
        node.y
    );

}

// ======================================================
// NODE FUNCTIONS
// ======================================================

function setNodeColor(id,color){

    nodes[id].color=color;

    drawGraph();

}

function resetNodes(){

    for(const node of nodes){

        node.color = NODE_COLOR.DEFAULT;

    }

}

// ======================================================
// EDGE FUNCTIONS
// ======================================================

function setEdgeColor(from,to,color){

    for(const edge of edges){

        if(
            (edge.from===from && edge.to===to) ||
            (edge.from===to && edge.to===from)
        ){

            edge.color=color;

            break;

        }

    }

    drawGraph();

}

function resetEdges(){

    for(const edge of edges){

        edge.color = EDGE_COLOR.DEFAULT;

    }

}

// ======================================================
// RESET WHOLE GRAPH
// ======================================================

function resetGraph(){

    resetNodes();

    resetEdges();

    drawGraph();

}

// ======================================================
// HIGHLIGHT EDGE
// ======================================================

function highlightEdge(from,to){

    setEdgeColor(
        from,
        to,
        EDGE_COLOR.CURRENT
    );

}

// ======================================================
// MARK MST EDGE
// ======================================================

function selectEdge(from,to){

    setEdgeColor(
        from,
        to,
        EDGE_COLOR.MST
    );

}

// ======================================================
// REJECT EDGE
// ======================================================

function rejectEdge(from,to){

    setEdgeColor(
        from,
        to,
        EDGE_COLOR.REJECTED
    );

}

// ======================================================
// INITIAL DRAW
// ======================================================

drawGraph();