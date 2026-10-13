// ======================================================
// READ URL
// ======================================================

const params = new URLSearchParams(window.location.search);

const algorithm = params.get("algo") || "bfs";

// ======================================================
// SHOW EDGE WEIGHTS ?
// ======================================================

const weightedAlgorithms = [

    "dijkstra",
    "bellmanFord",
    "kruskal"

];

showWeights = weightedAlgorithms.includes(algorithm);

// ======================================================
// HTML ELEMENTS
// ======================================================

const title = document.getElementById("algorithmTitle");

const structureTitle = document.getElementById("structureTitle");

const pseudoCode = document.getElementById("pseudoCode");

const startBtn = document.getElementById("startBtn");

const pauseBtn = document.getElementById("pauseBtn");

const restartBtn = document.getElementById("restartBtn");

// ======================================================
// ALGORITHM INFORMATION
// ======================================================

const algorithms = {

    bfs:{

        title:"Breadth First Search (BFS)",

        structure:"Queue",

        pseudo:[

            "Mark source visited",

            "Push source into queue",

            "while queue is not empty",

            "u = queue.front()",

            "queue.pop()",

            "for each neighbour",

            "if neighbour not visited",

            "mark neighbour visited",

            "push neighbour"

        ]

    },

    dfs:{

        title:"Depth First Search (DFS)",

        structure:"Recursion Stack",

        pseudo:[

            "DFS(source)",

            "mark source visited",

            "process source",

            "for each neighbour",

            "if neighbour not visited",

            "DFS(neighbour)"

        ]

    },

    dijkstra:{

        title:"Dijkstra's Algorithm",

        structure:"Priority Queue",

        pseudo:[

            "distance[source]=0",

            "push source",

            "while PQ not empty",

            "extract minimum",

            "relax every edge",

            "update distance",

            "push neighbour"

        ]

    },

    bellmanFord:{

        title:"Bellman Ford's Algorithm",

        structure:"Priority Queue",

        pseudo:[

            "Insert source",

            "while PQ not empty",

            "Extract minimum edge",

            "Skip if visited",

            "Add edge to MST",

            "Push adjacent edges"

        ]

    },

    kruskal:{

        title:"Kruskal's Algorithm",

        structure:"Disjoint Set",

        pseudo:[

            "Sort edges",

            "Initialize DSU",

            "for every edge",

            "Find(u)",

            "Find(v)",

            "if parents differ",

            "Union",

            "Add edge"

        ]

    }

};

// ======================================================
// CURRENT ALGORITHM
// ======================================================

const current = algorithms[algorithm];

// ======================================================
// CHANGE HEADING
// ======================================================

title.innerHTML = current.title;

structureTitle.innerHTML = current.structure;

// ======================================================
// DRAW PSEUDOCODE
// ======================================================

function loadPseudoCode(){

    pseudoCode.innerHTML="";

    current.pseudo.forEach((line,index)=>{

        const div=document.createElement("div");

        div.className="code-line";

        div.id="line"+(index+1);

        div.innerHTML=(index+1)+". "+line;

        pseudoCode.appendChild(div);

    });

}

loadPseudoCode();

// ======================================================
// REDRAW GRAPH
// ======================================================

drawGraph();

// ======================================================
// BUTTONS
// ======================================================

startBtn.onclick=function(){

    switch(algorithm){

        case "bfs":

            startBFS();

            break;

        case "dfs":

            startDFS();

            break;

        case "dijkstra":

            startDijkstra();

            break;

        case "bellmanFord":

            startBellmanFord();

            break;

        case "kruskal":

            startKruskal();

            break;

    }

};

pauseBtn.onclick=function(){

    switch(algorithm){

        case "bfs":

            pauseBFS();

            break;

        case "dfs":

            pauseDFS();

            break;

        case "dijkstra":

            pauseDijkstra();

            break;

        case "prim":

            pauseBellmanFord();

            break;

        case "kruskal":

            pauseKruskal();

            break;

    }

};

restartBtn.onclick=function(){

    switch(algorithm){

        case "bfs":

            restartBFS();

            break;

        case "dfs":

            restartDFS();

            break;

        case "dijkstra":

            restartDijkstra();

            break;

        case "bellmanFord":

            restartBellmanFord();

            break;

        case "kruskal":

            restartKruskal();

            break;

    }

};