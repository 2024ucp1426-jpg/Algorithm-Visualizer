// ======================================================
// BFS
// ======================================================

let bfsQueue = [];

let bfsVisited = [];

let bfsRunning = false;
document.getElementById("distanceContainer").style.display="none";
// ======================================================
// START BFS
// ======================================================

async function startBFS(){

    if(bfsRunning)
        return;

    bfsRunning = true;

    bfsQueue = [];

    bfsVisited = new Array(nodes.length).fill(false);

    resetVisualizer();

    bfsQueue.push(0);

    bfsVisited[0] = true;

    updateStructure(bfsQueue);

    updateVisited(bfsVisited);

    updateCurrentNode(0);

    setNodeColor(
        0,
        NODE_COLOR.DISCOVERED
    );

    highlightLine(1);

    await sleep(animationSpeed);

    while(bfsQueue.length){

        await waitIfPaused();

        // ======================================
        // Remove Front
        // ======================================

        highlightLine(4);

        let node = bfsQueue.shift();

        updateStructure(bfsQueue);

        updateCurrentNode(node);

        setNodeColor(
            node,
            NODE_COLOR.CURRENT
        );

        await sleep(animationSpeed);

        // ======================================
        // Explore Neighbours
        // ======================================

        highlightLine(6);

        for(const edge of graph[node]){

            await waitIfPaused();

            const neighbour = edge.to;

            highlightEdge(
                node,
                neighbour
            );

            await sleep(animationSpeed/2);

            if(!bfsVisited[neighbour]){

                highlightLine(7);

                bfsVisited[neighbour]=true;

                bfsQueue.push(neighbour);

                updateStructure(bfsQueue);

                updateVisited(bfsVisited);

                setNodeColor(

                    neighbour,

                    NODE_COLOR.DISCOVERED

                );

                await sleep(animationSpeed);

            }

            setEdgeColor(

                node,

                neighbour,

                EDGE_COLOR.DEFAULT

            );

        }

        // ======================================
        // Finish Node
        // ======================================

        setNodeColor(

            node,

            NODE_COLOR.VISITED

        );

        await sleep(animationSpeed/2);

    }

    clearPseudoHighlight();

    bfsRunning=false;

}

// ======================================================
// PAUSE
// ======================================================

function pauseBFS(){

    togglePause();

}

// ======================================================
// RESTART
// ======================================================

function restartBFS(){

    bfsRunning=false;

    bfsQueue=[];

    bfsVisited=[];

    isPaused=false;

    resetVisualizer();

}
/*
| Color     | Hex Code  | Meaning                                                                                  |
| --------- | --------- | ---------------------------------------------------------------------------------------- |
| ⚪ White   | `#FFFFFF` | Node has not been discovered yet.                                                        |
| 🟠 Orange | `#F59E0B` | Node has been discovered and added to the data structure (Queue, Stack, Priority Queue). |
| 🟢 Green  | `#22C55E` | Node is currently being processed.                                                       |
| 🔵 Blue   | `#3B82F6` | Node has been completely processed.                                                      |

edge color
| Color        | Hex Code  | Meaning                                    |
| ------------ | --------- | ------------------------------------------ |
| ⚫ Gray       | `#555555` | Normal edge.                               |
| 🔴 Red       | `#EF4444` | Edge currently being explored.             |
| 🟢 Green     | `#10B981` | Edge selected into the MST (Prim/Kruskal). |
| ⚪ Light Gray | `#BDBDBD` | Edge rejected (Kruskal - forms a cycle).   |

*/