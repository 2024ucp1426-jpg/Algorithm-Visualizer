// ======================================================
// DFS
// ======================================================

let dfsVisited = [];

let dfsStack = [];

let dfsRunning = false;
document.getElementById("distanceContainer").style.display="none";
// ======================================================
// START DFS
// ======================================================

async function startDFS(){

    if(dfsRunning)
        return;

    dfsRunning = true;

    dfsVisited = new Array(nodes.length).fill(false);

    dfsStack = [];

    resetVisualizer();

    await dfs(0);

    clearPseudoHighlight();

    dfsRunning = false;

}

// ======================================================
// DFS RECURSION
// ======================================================

async function dfs(node){

    await waitIfPaused();

    // ------------------------------------------
    // Discover Node
    // ------------------------------------------

    highlightLine(2);

    dfsVisited[node] = true;

    dfsStack.push(node);

    updateStructure(dfsStack);

    updateVisited(dfsVisited);

    updateCurrentNode(node);

    setNodeColor(
        node,
        NODE_COLOR.DISCOVERED
    );

    await sleep(animationSpeed);

    // ------------------------------------------
    // Process Node
    // ------------------------------------------

    highlightLine(3);

    setNodeColor(
        node,
        NODE_COLOR.CURRENT
    );

    await sleep(animationSpeed);

    // ------------------------------------------
    // Explore Neighbours
    // ------------------------------------------

    for(const edge of graph[node]){

        await waitIfPaused();

        const neighbour = edge.to;

        highlightLine(4);

        highlightEdge(node, neighbour);

        await sleep(animationSpeed / 2);

        if(!dfsVisited[neighbour]){

            highlightLine(5);

            await sleep(animationSpeed / 2);

            await dfs(neighbour);

        }

        setEdgeColor(
            node,
            neighbour,
            EDGE_COLOR.DEFAULT
        );

    }

    // ------------------------------------------
    // Finish Node
    // ------------------------------------------

    dfsStack.pop();

    updateStructure(dfsStack);

    setNodeColor(
        node,
        NODE_COLOR.VISITED
    );

    await sleep(animationSpeed / 2);

}

// ======================================================
// PAUSE
// ======================================================

function pauseDFS(){

    togglePause();

}

// ======================================================
// RESTART
// ======================================================

function restartDFS(){

    dfsRunning = false;

    dfsVisited = [];

    dfsStack = [];

    isPaused = false;

    resetVisualizer();

}

/* ======================================================

COLOR LEGEND

----------------------------------------------------------

NODE COLORS

White (#FFFFFF)
-> Node has not been visited yet.

Orange (#F59E0B)
-> Node has been discovered and pushed into the
   recursion stack.

Green (#22C55E)
-> Node is currently being processed.
   DFS is exploring its neighbours.

Blue (#3B82F6)
-> DFS has completely finished processing this node.
   It will never be visited again.

----------------------------------------------------------

EDGE COLORS

Gray (#555555)
-> Normal edge.

Red (#EF4444)
-> Edge currently being explored.

Green (#10B981)
-> Edge selected into MST
   (used in Prim's and Kruskal's).

Light Gray (#BDBDBD)
-> Edge rejected because it forms a cycle
   (used in Kruskal's).

====================================================== */