var drawing = [];
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
    drawing.push(current);
}

function draw(){
    background(200);

    if(mouseIsPressed){
        var point = {
            x : mouseX,
            y : mouseY
        }

        current.push(point);

        var databaseRef = database.ref('drawing');
        databaseRef.set({
            "drawing" : current
        })

        database.ref('drawing').on('value',(data) => {
            current = data.val().drawing;
        })
    }

    
    stroke(0);
    strokeWeight(5);
    noFill();

    for(var i = 0; i < drawing.length ; i++){
        var path = drawing[i];

        beginShape();
        for(var a = 0; a < path.length ; a++){
            vertex(path[a].x,path[a].y);
        }
        endShape();

    } 

}

function clearDrawing(){
    current = [];
    drawing = [];
}





