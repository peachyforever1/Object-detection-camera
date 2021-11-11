dog_img = ""
objects = []
statusNew = ""


function preload() {

    dog_img = loadImage("dog_cat.jpg")
}

function setup() {
    canvas = createCanvas(500, 400)
    canvas.position(600, 150)
    //camera starts here
    video=createCapture(VIDEO)
    video.size(500,400)
    video.hide()
    //coco ssd model starts here
    objectDetecter = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Image Object Detection Started"
}

function modelLoaded() {
    statusNew = true;
    console.log("Model Loaded Successfully")
    
}

function getResults(error, results) {
    if (error) {
        console.log(error);

    } else {
        console.log(results);
        objects = results
    }
}

function draw() {
    image(video, 0, 0, 500, 400)
   
    
    if(statusNew !=""){
        objectDetecter.detect(video, getResults)
        for(i=0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Image Object Detection Done"
            document.getElementById("noo").innerHTML="Number Of Objects-"+objects.length
            fill("magenta")
            stroke("blue")
            textSize(20)
            objname=objects[i].label
            accuracy=objects[i].confidence
            posex=objects[i].x
            posey=objects[i].y
            width=objects[i].width
            height=objects[i].height
            text(objname+" "+accuracy, posex, posey)
            noFill()
            rect(posex-50, posey-50, width, height)
        }
    }
}