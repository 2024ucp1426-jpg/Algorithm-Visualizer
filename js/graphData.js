// ======================================================
// GRAPH DATA
// ======================================================

// Node Positions
// These positions are used only for drawing on canvas.

const nodes = [

    {
        id:0,
        x:100,
        y:120,
        color:"white"
    },

    {
        id:1,
        x:300,
        y:120,
        color:"white"
    },

    {
        id:2,
        x:100,
        y:320,
        color:"white"
    },

    {
        id:3,
        x:300,
        y:320,
        color:"white"
    },

    {
        id:4,
        x:520,
        y:220,
        color:"white"
    },

    {
        id:5,
        x:720,
        y:220,
        color:"white"
    }

];


// ======================================================
// EDGE DATA
// ======================================================

const edges = [

    {
        from:0,
        to:1,
        weight:4,
        color:"#555"
    },

    {
        from:0,
        to:2,
        weight:2,
        color:"#555"
    },

    {
        from:1,
        to:3,
        weight:5,
        color:"#555"
    },

    {
        from:2,
        to:3,
        weight:6,
        color:"#555"
    },

    {
        from:2,
        to:4,
        weight:3,
        color:"#555"
    },

    {
        from:3,
        to:4,
        weight:1,
        color:"#555"
    },

    {
        from:4,
        to:5,
        weight:7,
        color:"#555"
    }

];


// ======================================================
// ADJACENCY LIST
// ======================================================

const graph = {

    0:[
        {to:1,weight:4},
        {to:2,weight:2}
    ],

    1:[
        {to:0,weight:4},
        {to:3,weight:5}
    ],

    2:[
        {to:0,weight:2},
        {to:3,weight:6},
        {to:4,weight:3}
    ],

    3:[
        {to:1,weight:5},
        {to:2,weight:6},
        {to:4,weight:1}
    ],

    4:[
        {to:2,weight:3},
        {to:3,weight:1},
        {to:5,weight:7}
    ],

    5:[
        {to:4,weight:7}
    ]

};


// ======================================================
// COLORS
// ======================================================

const NODE_COLOR = {

    DEFAULT:"#FFFFFF",

    DISCOVERED:"#F59E0B",

    CURRENT:"#22C55E",

    VISITED:"#3B82F6"

};


const EDGE_COLOR = {

    DEFAULT:"#555",

    CURRENT:"#EF4444",

    MST:"#10B981",

    REJECTED:"#BDBDBD"

};

// Node Positions
// These positions are used only for drawing on canvas.
// This file only stores data. There is no drawing and no algorithm here.

/**
 Why did I store colors here?

Because later, instead of writing

setNodeColor(3,"green");

you'll write

setNodeColor(3,NODE_COLOR.CURRENT);

Much easier to change late
 */