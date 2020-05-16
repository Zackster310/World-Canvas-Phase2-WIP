var prev = [];
var current = [];

var clear;

var database;

function setup(){
    var canvas = createCanvas(1500,700);

    canvas.mousePressed(startPath);

    database = firebase.database();

    clear = createButton('Clear Screen');
    clear.position(50,50);
    clear.mousePressed(clearDrawing);
}

function startPath(){
    current = [];
    prev.push(current);
}

function draw(){
    background(200);
    
    getScreen();

    if(mouseIsPressed){
        var point = {
            x : mouseX,
            y : mouseY
        }

        current.push(point);

        putScreen();
    }

}

function putScreen(){

    console.log("hi");

    database.ref('/').update({
        drawing : prev
    })
}

function getScreen(){

    var dDraw = [];

    var drawRef = database.ref('drawing');
    drawRef.on("value",(data) => {
        dDraw = data.val();
    })

    stroke(0);
    strokeWeight(5);
    noFill();

    for(var i = 0; i < dDraw.length ; i++){
        var path = dDraw[i];

        beginShape();
        for(var a = 0; a < path.length ; a++){
            vertex(path[a].x,path[a].y);
        }
        endShape();

    }

}

function clearDrawing(){
    current = [];
    prev = [];
}